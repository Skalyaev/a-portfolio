import { getFileExtension } from "@/lib/utils/file"
import { listZipEntryNames } from "@/lib/zip"

import {
  blockedFileExtensions,
  maxEmailLength,
  maxFileCount,
  maxFileSizeBytes,
  maxMessageLength,
  maxSubjectLength,
  maxTotalSizeBytes
} from "@/constants/contact"

import type { ByteRangeReader } from "@/lib/zip"

type ContactErrorCode =
  | "invalidEmail"
  | "subjectRequired"
  | "subjectTooLong"
  | "messageTooLong"
  | "tooManyFiles"
  | "fileTooLarge"
  | "totalTooLarge"
  | "blockedFileType"
  | "unreadableArchive"
  | "attachmentRejected"
  | "rateLimited"
  | "serverError"

export type ContactResult =
  | { status: "success" }
  | { status: "error"; code: ContactErrorCode; fileName?: string }

interface AttachmentInfo {
  name: string
  size: number
}

export interface AttachmentError {
  code: ContactErrorCode
  fileName: string
}

interface AttachmentContent {
  name: string
  content: Uint8Array
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Tells whether a file name has a blocked extension.
 *
 * @param fileName - File name to check.
 * @returns Whether the extension is in the blocked list.
 */
function isBlockedFileName(fileName: string): boolean {
  return blockedFileExtensions.includes(getFileExtension(fileName))
}

/**
 * Checks that an email address is well-formed and not too long.
 *
 * @param email - Trimmed email address.
 * @returns The error code, or `null` when valid.
 */
export function validateEmail(email: string): ContactErrorCode | null {
  return email.length <= maxEmailLength && emailPattern.test(email)
    ? null
    : "invalidEmail"
}

/**
 * Checks that the subject is provided and not too long.
 *
 * @param subject - Trimmed subject.
 * @returns The error code, or `null` when valid.
 */
export function validateSubject(subject: string): ContactErrorCode | null {
  if (subject.length === 0) return "subjectRequired"
  return subject.length > maxSubjectLength ? "subjectTooLong" : null
}

/**
 * Checks that an optional message is not too long.
 *
 * @param message - Trimmed message, empty when not provided.
 * @returns The error code, or `null` when valid.
 */
export function validateMessage(message: string): ContactErrorCode | null {
  return message.length > maxMessageLength ? "messageTooLong" : null
}

/**
 * Checks a list of attachments against the count, per-file size, total size and type limits.
 *
 * @param attachments - Name and size of every attachment.
 * @returns The first error found with the file at fault, or `null` when the list is valid.
 */
export function validateAttachments(
  attachments: AttachmentInfo[]
): AttachmentError | null {
  let totalSize = 0

  for (const [index, attachment] of attachments.entries()) {
    if (index >= maxFileCount)
      return { code: "tooManyFiles", fileName: attachment.name }
    if (isBlockedFileName(attachment.name))
      return { code: "blockedFileType", fileName: attachment.name }
    if (attachment.size > maxFileSizeBytes)
      return { code: "fileTooLarge", fileName: attachment.name }

    totalSize += attachment.size
    if (totalSize > maxTotalSizeBytes)
      return { code: "totalTooLarge", fileName: attachment.name }
  }

  return null
}

/**
 * Checks that a ZIP archive is readable and holds no entry of a blocked type.
 *
 * Only the archive's own entries are checked: archives nested inside are left to the mail
 * provider, whose rejection is reported as `attachmentRejected`.
 *
 * @param fileName - Name of the attachment.
 * @param size - Size of the attachment, in bytes.
 * @param read - Reads a byte range of the attachment.
 * @returns The error found, or `null` when the attachment is not a ZIP or is a clean one.
 */
async function validateArchive(
  fileName: string,
  size: number,
  read: ByteRangeReader
): Promise<AttachmentError | null> {
  if (getFileExtension(fileName) !== "zip") return null

  const entryNames = await listZipEntryNames(size, read)
  if (!entryNames) return { code: "unreadableArchive", fileName }

  return entryNames.some(isBlockedFileName)
    ? { code: "blockedFileType", fileName }
    : null
}

/**
 * Checks every ZIP attachment received by the server, mirroring the way Gmail inspects archive
 * contents before accepting a message.
 *
 * An archive whose entries cannot be listed (corrupted, truncated) is rejected, since its
 * content cannot be checked.
 *
 * @param attachments - Name and content of every attachment.
 * @returns The first archive found unreadable or with a blocked entry, or `null` when none is.
 */
export async function validateArchiveEntries(
  attachments: AttachmentContent[]
): Promise<AttachmentError | null> {
  for (const attachment of attachments) {
    const error = await validateArchive(
      attachment.name,
      attachment.content.byteLength,
      async (start, end) => attachment.content.subarray(start, end)
    )
    if (error) return error
  }

  return null
}

/**
 * Checks a single ZIP `File` picked in the browser, so the archive is rejected as soon as it is
 * added instead of only once the message is sent. Only the end of the file is read.
 *
 * @param file - File picked or dropped by the user.
 * @returns The error found, or `null` when the file is not a problematic archive.
 */
export function validateArchiveFile(
  file: File
): Promise<AttachmentError | null> {
  return validateArchive(file.name, file.size, async (start, end) => {
    const buffer = await file.slice(start, end).arrayBuffer()
    return new Uint8Array(buffer)
  })
}
