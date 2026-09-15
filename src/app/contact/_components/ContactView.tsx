"use client"

import { useState, useTransition } from "react"

import { FlexCol } from "@/components/layout/FlexCol"
import { Button } from "@/components/tag/Button"
import { useNotify } from "@/components/status/notify/NotifyContext"
import { useLanguage } from "@/components/i18n/LanguageContext"

import { useEntranceReveal } from "@/lib/hooks/useEntranceReveal"
import { cn, revealClassName } from "@/lib/utils/style"

import { revealCascadeStepMs, revealDurationMs } from "@/constants/animation"
import { maxMessageLength, maxSubjectLength } from "@/constants/contact"
import { fieldLabelClassName } from "@/constants/style"

import { sendContactMessage } from "../_lib/sendContactMessage"
import {
  validateEmail,
  validateMessage,
  validateSubject
} from "../_lib/validation"
import { AttachmentPicker } from "./AttachmentPicker"

import type { FormEvent } from "react"

const fieldClassName =
  "border-2 border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted transition-colors hover:border-foreground focus:border-foreground focus:outline-none disabled:opacity-50 disabled:hover:border-border"
const requiredMarkClassName = "text-red-600"
const blockTransitionClassName = "transition-[opacity,translate] duration-400"

/**
 * Renders the contact form: sender email, subject, message and attachments, forwarded by email
 * on submit.
 *
 * The submit button fades in through its wrapper, not by itself: a transition on the button
 * would override its disabled `opacity-50` for the whole entrance, flashing it as enabled.
 *
 * @returns The contact view.
 */
export function ContactView() {
  const { t } = useLanguage()
  const { pushNotification } = useNotify()
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [isCheckingFiles, setIsCheckingFiles] = useState(false)
  const [isPending, startTransition] = useTransition()
  const contactEntrance = useEntranceReveal({
    delayMs: 0,
    durationMs: revealDurationMs
  })
  const messageEntrance = useEntranceReveal({
    delayMs: revealCascadeStepMs,
    durationMs: revealDurationMs
  })
  const attachmentsEntrance = useEntranceReveal({
    delayMs: revealCascadeStepMs * 2,
    durationMs: revealDurationMs
  })

  const isSendDisabled =
    isPending || isCheckingFiles || !email.trim() || !subject.trim()

  /**
   * Validates the fields locally, then sends the form and its attachments to the server action.
   *
   * Attachments are appended from state, the file input having no name, so removed files are
   * not sent. Sending waits for attachments still being checked, so none is added once the
   * message is gone. A thrown error means the request never reached the action, e.g. a body size
   * limit or a network failure.
   *
   * @param event - Form submit event.
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    if (isSendDisabled) return

    const clientError =
      validateEmail(email.trim()) ??
      validateSubject(subject.trim()) ??
      validateMessage(message.trim())
    if (clientError) {
      pushNotification("error", t(`contact.errors.${clientError}`))
      return
    }

    const formData = new FormData(event.currentTarget)
    for (const file of files) formData.append("files", file)

    startTransition(async () => {
      try {
        const response = await sendContactMessage(formData)
        if (response.status === "success") {
          pushNotification("success", t("contact.success"))
          setEmail("")
          setSubject("")
          setMessage("")
          setFiles([])
        } else {
          pushNotification(
            "error",
            `${t(`contact.errors.${response.code}`)}${response.fileName ? ` (${response.fileName})` : ""}`
          )
        }
      } catch (error) {
        console.error(error)
        pushNotification("error", t("contact.errors.serverError"))
      }
    })
  }

  return (
    <FlexCol
      title={t("contact.title")}
      subtitle={t("contact.subtitle")}>
      <form
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        className="relative flex flex-col gap-4 pb-6 md:pb-10">
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <div
          className={cn(
            blockTransitionClassName,
            "grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1.5fr]",
            revealClassName(contactEntrance.entered)
          )}
          style={{ transitionDelay: contactEntrance.transitionDelay }}>
          <label className="flex flex-col gap-2">
            <span className={fieldLabelClassName}>
              {t("contact.email")}{" "}
              <span
                className={requiredMarkClassName}
                aria-hidden="true">
                *
              </span>
            </span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t("contact.emailPlaceholder")}
              disabled={isPending}
              className={cn(fieldClassName, "h-10")}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className={fieldLabelClassName}>
              {t("contact.subject")}{" "}
              <span
                className={requiredMarkClassName}
                aria-hidden="true">
                *
              </span>
            </span>
            <input
              type="text"
              name="subject"
              required
              maxLength={maxSubjectLength}
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder={t("contact.subjectPlaceholder")}
              disabled={isPending}
              className={cn(fieldClassName, "h-10")}
            />
          </label>
        </div>
        <label
          className={cn(
            blockTransitionClassName,
            "flex flex-col gap-2 -mb-2 mt-2",
            revealClassName(messageEntrance.entered)
          )}
          style={{ transitionDelay: messageEntrance.transitionDelay }}>
          <span className={fieldLabelClassName}>{t("contact.message")}</span>
          <textarea
            name="message"
            rows={8}
            maxLength={maxMessageLength}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={t("contact.messagePlaceholder")}
            disabled={isPending}
            className={cn(fieldClassName, "min-h-32 resize-y")}
          />
          <span className="self-end text-2xs text-muted select-none">
            {`${message.length} / ${maxMessageLength}`}
          </span>
        </label>
        <div
          className={cn(
            blockTransitionClassName,
            revealClassName(attachmentsEntrance.entered)
          )}
          style={{ transitionDelay: attachmentsEntrance.transitionDelay }}>
          <AttachmentPicker
            files={files}
            onFilesChange={setFiles}
            onError={(error) =>
              pushNotification(
                "error",
                `${t(`contact.errors.${error.code}`)} (${error.fileName})`
              )
            }
            onCheckingChange={setIsCheckingFiles}
            disabled={isPending}
          />
        </div>
        <div
          className={cn(
            blockTransitionClassName,
            "self-end mt-4",
            revealClassName(attachmentsEntrance.entered)
          )}
          style={{ transitionDelay: attachmentsEntrance.transitionDelay }}>
          <Button
            type="submit"
            disabled={isSendDisabled}
            className={cn(
              "border-2 border-foreground bg-foreground px-5 text-background hover:bg-background hover:text-foreground focus-visible:bg-background focus-visible:text-foreground",
              isPending && "cursor-wait"
            )}>
            <span>{isPending ? t("contact.sending") : t("contact.send")}</span>
          </Button>
        </div>
      </form>
    </FlexCol>
  )
}
