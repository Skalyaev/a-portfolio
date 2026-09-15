const endOfCentralDirectorySignature = 0x06054b50
const zip64EndOfCentralDirectorySignature = 0x06064b50
const zip64LocatorSignature = 0x07064b50
const centralDirectorySignature = 0x02014b50
const maxCommentLength = 65535
const endOfCentralDirectoryLength = 22
const zip64EndOfCentralDirectoryLength = 56
const zip64LocatorLength = 20
const centralDirectoryHeaderLength = 46

const textDecoder = new TextDecoder()

export type ByteRangeReader = (
  start: number,
  end: number
) => Promise<Uint8Array>

interface CentralDirectory {
  entryCount: number
  start: number
  end: number
}

/**
 * Creates a reader over a byte array.
 *
 * @param bytes - Byte array to read.
 * @returns The reader.
 */
function toDataView(bytes: Uint8Array): DataView {
  return new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
}

/**
 * Locates the "end of central directory" record by scanning backwards from the end of the file.
 *
 * @param view - Reader over the end of the ZIP file content.
 * @returns The offset of the record within `view`, or `-1` when none is found.
 */
function findEndOfCentralDirectory(view: DataView): number {
  const searchStart = Math.max(
    0,
    view.byteLength - endOfCentralDirectoryLength - maxCommentLength
  )

  for (
    let offset = view.byteLength - endOfCentralDirectoryLength;
    offset >= searchStart;
    offset--
  ) {
    if (view.getUint32(offset, true) === endOfCentralDirectorySignature)
      return offset
  }

  return -1
}

/**
 * Reads the entry count and bounds of the central directory, from the ZIP64 record when present.
 *
 * ZIP64 archives may truncate the classic record's values (e.g. 65535 entries), so the ZIP64
 * record, found through the locator right before the classic one, takes precedence.
 *
 * @param tail - End of the ZIP file content, holding the end records.
 * @param tailStart - Offset of `tail` within the file.
 * @param endOffset - Offset of the classic "end of central directory" record within `tail`.
 * @param read - Reads a byte range of the file.
 * @returns The central directory entry count, start and end offsets, or `null` when the ZIP64 record is invalid.
 */
async function readCentralDirectory(
  tail: Uint8Array,
  tailStart: number,
  endOffset: number,
  read: ByteRangeReader
): Promise<CentralDirectory | null> {
  const view = toDataView(tail)
  const locatorOffset = endOffset - zip64LocatorLength
  if (
    locatorOffset < 0 ||
    view.getUint32(locatorOffset, true) !== zip64LocatorSignature
  )
    return {
      entryCount: view.getUint16(endOffset + 10, true),
      start: view.getUint32(endOffset + 16, true),
      end: tailStart + endOffset
    }

  const recordOffset = Number(view.getBigUint64(locatorOffset + 8, true))
  const recordEnd = recordOffset + zip64EndOfCentralDirectoryLength
  if (recordEnd > tailStart + locatorOffset) return null

  const record = toDataView(await read(recordOffset, recordEnd))
  if (
    record.byteLength !== zip64EndOfCentralDirectoryLength ||
    record.getUint32(0, true) !== zip64EndOfCentralDirectorySignature
  )
    return null

  return {
    entryCount: Number(record.getBigUint64(32, true)),
    start: Number(record.getBigUint64(48, true)),
    end: recordOffset
  }
}

/**
 * Lists the file names stored in a ZIP archive's central directory, without decompressing
 * any entry. Only the end records and the central directory are read, so a large archive is
 * never loaded whole.
 *
 * The central directory must end exactly where the end records start, so an archive listing
 * fewer entries than it holds is reported as unreadable instead of being partially listed.
 *
 * @param size - Size of the ZIP file, in bytes.
 * @param read - Reads a byte range of the file, e.g. a `Blob` slice or a `Uint8Array` subarray.
 * @returns The entry names, directories excluded, or `null` when the file is not a readable ZIP.
 */
export async function listZipEntryNames(
  size: number,
  read: ByteRangeReader
): Promise<string[] | null> {
  const tailStart = Math.max(
    0,
    size - endOfCentralDirectoryLength - maxCommentLength - zip64LocatorLength
  )
  const tail = await read(tailStart, size)
  const endOffset = findEndOfCentralDirectory(toDataView(tail))
  if (endOffset === -1) return null

  const centralDirectory = await readCentralDirectory(
    tail,
    tailStart,
    endOffset,
    read
  )
  if (!centralDirectory || centralDirectory.start > centralDirectory.end)
    return null

  const directoryLength = centralDirectory.end - centralDirectory.start
  const directory = await read(centralDirectory.start, centralDirectory.end)
  if (directory.byteLength !== directoryLength) return null

  const view = toDataView(directory)
  let offset = 0
  const names: string[] = []

  for (let index = 0; index < centralDirectory.entryCount; index++) {
    if (
      offset + centralDirectoryHeaderLength > directoryLength ||
      view.getUint32(offset, true) !== centralDirectorySignature
    )
      return null

    const nameLength = view.getUint16(offset + 28, true)
    const extraLength = view.getUint16(offset + 30, true)
    const commentLength = view.getUint16(offset + 32, true)
    const nameStart = offset + centralDirectoryHeaderLength
    if (nameStart + nameLength > directoryLength) return null

    const name = textDecoder.decode(
      directory.subarray(nameStart, nameStart + nameLength)
    )

    if (!name.endsWith("/")) names.push(name)

    offset = nameStart + nameLength + extraLength + commentLength
  }

  return offset === directoryLength ? names : null
}
