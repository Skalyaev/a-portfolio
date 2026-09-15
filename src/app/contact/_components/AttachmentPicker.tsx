import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/tag/Button"
import { Paperclip } from "@/components/svg/Paperclip"
import { X } from "@/components/svg/X"
import { useLanguage } from "@/components/i18n/LanguageContext"

import { formatBytes } from "@/lib/utils/file"
import { cn } from "@/lib/utils/style"

import {
  maxFileCount,
  maxFileSizeBytes,
  maxTotalSizeBytes
} from "@/constants/contact"
import { fieldLabelClassName } from "@/constants/style"

import { validateArchiveFile, validateAttachments } from "../_lib/validation"

import type { ChangeEvent, DragEvent } from "react"
import type { AttachmentError } from "../_lib/validation"

const activeContentTypes: string[] = [
  "application/xhtml+xml",
  "application/xml",
  "text/xml",
  "multipart/related",
  "message/rfc822"
]

export interface AttachmentPickerProps {
  files: File[]
  onFilesChange: (files: File[]) => void
  onError: (error: AttachmentError) => void
  onCheckingChange: (checking: boolean) => void
  disabled: boolean
}

/**
 * Tells whether two files are most likely the same file picked twice.
 *
 * @param a - First file.
 * @param b - Second file.
 * @returns `true` when name, size and modification date match.
 */
function isSameFile(a: File, b: File): boolean {
  return (
    a.name === b.name && a.size === b.size && a.lastModified === b.lastModified
  )
}

/**
 * Opens a file in a new browser tab through a temporary object URL.
 *
 * An object URL shares the site's origin, so types able to run scripts, and untyped files the
 * browser could sniff as such, are opened as plain text.
 *
 * @param file - File to open.
 */
function openFile(file: File): void {
  const type =
    !file.type || activeContentTypes.includes(file.type)
      ? "text/plain"
      : file.type
  const url = URL.createObjectURL(new Blob([file], { type }))
  window.open(url, "_blank", "noopener,noreferrer")
  setTimeout(() => URL.revokeObjectURL(url), 60000)
}

/**
 * Lets the user add attachments by browsing or drag and drop, lists them and removes them one by one.
 *
 * Files breaking a limit are skipped individually, the others are still added; every rejection is
 * reported to the caller through `onError` instead of being shown locally. `onCheckingChange`
 * tells the caller while files are still being checked, so it can hold back the message until
 * they are added.
 *
 * @param props - Current files, change, error and checking handlers, and disabled state.
 * @returns The attachment picker.
 */
export function AttachmentPicker({
  files,
  onFilesChange,
  onError,
  onCheckingChange,
  disabled
}: AttachmentPickerProps) {
  const { t, locale } = useLanguage()
  const inputRef = useRef<HTMLInputElement>(null)
  const filesRef = useRef<File[]>(files)
  const pendingCheckCountRef = useRef(0)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    filesRef.current = files
  }, [files])

  const totalSize = files.reduce((sum, file) => sum + file.size, 0)
  const limits = [
    `${maxFileCount} ${t("contact.limits.files")}`,
    `${formatBytes(maxFileSizeBytes, locale)} ${t("contact.limits.perFile")}`,
    `${formatBytes(maxTotalSizeBytes, locale)} ${t("contact.limits.total")}`
  ].join(" · ")

  /**
   * Reports a new file list and keeps it as the latest one, so additions still being checked
   * build on it instead of on the list of an older render.
   *
   * @param nextFiles - New file list.
   */
  function commitFiles(nextFiles: File[]): void {
    filesRef.current = nextFiles
    onFilesChange(nextFiles)
  }

  /**
   * Appends the valid new files to the list, skipping duplicates and files breaking a limit.
   *
   * Each file is first checked alone, archives included, so a ZIP hiding a blocked file type is
   * rejected here rather than only once the message is sent. The list limits are checked last,
   * against the latest list, since files may have been added or removed during the checks.
   * Overlapping additions are counted so the caller hears `false` only once all of them are done.
   *
   * @param added - Files picked or dropped by the user.
   */
  async function addFiles(added: File[]): Promise<void> {
    pendingCheckCountRef.current += 1
    if (pendingCheckCountRef.current === 1) onCheckingChange(true)

    try {
      const checkedFiles: File[] = []

      for (const file of added) {
        if (filesRef.current.some((existing) => isSameFile(existing, file)))
          continue

        const fileError =
          validateAttachments([file]) ?? (await validateArchiveFile(file))
        if (fileError) {
          onError(fileError)
          continue
        }

        checkedFiles.push(file)
      }

      const accepted: File[] = [...filesRef.current]

      for (const file of checkedFiles) {
        if (accepted.some((existing) => isSameFile(existing, file))) continue

        const listError = validateAttachments([...accepted, file])
        if (listError) {
          onError(listError)
          continue
        }

        accepted.push(file)
      }

      if (accepted.length !== filesRef.current.length) commitFiles(accepted)
    } finally {
      pendingCheckCountRef.current -= 1
      if (pendingCheckCountRef.current === 0) onCheckingChange(false)
    }
  }

  /**
   * Removes the file at an index.
   *
   * @param index - Position of the file in the list.
   */
  function removeFile(index: number): void {
    commitFiles(files.filter((_, fileIndex) => fileIndex !== index))
  }

  /**
   * Adds the files chosen in the browse dialog, then resets the input so the same file can be picked again.
   *
   * @param event - Input change event.
   */
  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    void addFiles(Array.from(event.target.files ?? []))
    event.target.value = ""
  }

  /**
   * Allows dropping and highlights the drop zone.
   *
   * @param event - Drag over event.
   */
  function handleDragOver(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault()
    if (!disabled) setIsDragging(true)
  }

  /**
   * Removes the highlight once the pointer really leaves the drop zone, not one of its children.
   *
   * @param event - Drag leave event.
   */
  function handleDragLeave(event: DragEvent<HTMLDivElement>): void {
    if (
      event.relatedTarget instanceof Node &&
      event.currentTarget.contains(event.relatedTarget)
    )
      return
    setIsDragging(false)
  }

  /**
   * Adds the dropped files.
   *
   * @param event - Drop event.
   */
  function handleDrop(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault()
    setIsDragging(false)
    if (!disabled) void addFiles(Array.from(event.dataTransfer.files))
  }

  return (
    <div className="flex flex-col gap-2">
      <span className={fieldLabelClassName}>{t("contact.attachments")}</span>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border px-4 py-6 text-center transition-colors",
          isDragging && "border-foreground"
        )}>
        <Button
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          className="border-2 border-border py-1.5 shadow-xs hover:border-foreground hover:bg-background focus-visible:border-foreground focus-visible:bg-background">
          <Paperclip
            width={16}
            height={16}
          />
          <span className="text-xs">{t("contact.addFiles")}</span>
        </Button>
        <span className={fieldLabelClassName}>{t("contact.dropHint")}</span>
        <span className="text-2xs text-muted select-none">{limits}</span>
        <input
          ref={inputRef}
          type="file"
          multiple
          tabIndex={-1}
          onChange={handleInputChange}
          className="hidden"
        />
      </div>
      {files.length > 0 && (
        <>
          <ul className="flex flex-col gap-1.5">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${file.size}-${file.lastModified}`}
                className="animate-fade-in-slide-left flex items-center gap-3 bg-accent pr-1">
                <button
                  type="button"
                  onClick={() => openFile(file)}
                  disabled={disabled}
                  title={file.name}
                  className={cn(
                    "group flex min-w-0 grow items-center gap-3 self-stretch cursor-pointer bg-transparent py-1.5 pl-3 text-left focus-visible:outline-none",
                    disabled && "cursor-not-allowed"
                  )}>
                  <span className="block min-w-0 grow truncate text-xs group-hover:underline group-focus-visible:underline">
                    {file.name}
                  </span>
                  <span className="shrink-0 text-2xs text-muted">
                    {formatBytes(file.size, locale)}
                  </span>
                </button>
                <Button
                  onClick={() => removeFile(index)}
                  disabled={disabled}
                  ariaLabel={`${t("contact.removeFile")} ${file.name}`}
                  title={t("contact.removeFile")}
                  className="shrink-0 bg-transparent p-1 hover:bg-background focus-visible:bg-background">
                  <X
                    width={14}
                    height={14}
                  />
                </Button>
              </li>
            ))}
          </ul>
          <span className="self-end text-2xs text-muted select-none">
            {`${formatBytes(totalSize, locale)} / ${formatBytes(maxTotalSizeBytes, locale)}`}
          </span>
        </>
      )}
    </div>
  )
}
