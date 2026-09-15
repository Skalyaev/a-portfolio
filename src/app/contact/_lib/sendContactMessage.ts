"use server"

import { headers } from "next/headers"
import { createTransport } from "nodemailer"

import { createRateLimiter } from "@/lib/rateLimit"

import { rateLimitMaxRequests, rateLimitWindowMs } from "@/constants/contact"

import {
  validateArchiveEntries,
  validateAttachments,
  validateEmail,
  validateMessage,
  validateSubject
} from "./validation"

import type { ContactResult } from "./validation"

interface MailConfig {
  host: string
  port: number
  user: string
  pass: string
  from: string
  to: string
}

interface Attachment {
  filename: string
  content: Buffer
  contentType: string
}

const rateLimiter = createRateLimiter(rateLimitMaxRequests, rateLimitWindowMs)

/**
 * Reads the SMTP settings and the recipient from the environment.
 *
 * @returns The mail configuration, or `null` when a required variable is missing.
 */
function getMailConfig(): MailConfig | null {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    CONTACT_EMAIL
  } = process.env

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL) return null

  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    user: SMTP_USER,
    pass: SMTP_PASS,
    from: SMTP_FROM || SMTP_USER,
    to: CONTACT_EMAIL
  }
}

/**
 * Identifies the client by IP address for rate limiting.
 *
 * The app is only reachable through the nginx proxy (`proxy/default.conf`), which overwrites
 * `x-forwarded-for` with the client address: the connection's own, or the one forwarded by the
 * Traefik instance in front of it in production. Were the app reached directly, Next.js would keep a header sent by the client
 * and only fill a missing one with the socket address, letting a client pick its own key.
 *
 * @returns The client IP, or `"unknown"` when the header is empty.
 */
async function getClientIp(): Promise<string> {
  const headerList = await headers()
  const forwardedIps: string[] = (headerList.get("x-forwarded-for") ?? "")
    .split(",")
    .map((ip) => ip.trim())
    .filter(Boolean)
  return forwardedIps.at(-1) ?? "unknown"
}

/**
 * Tells whether a `sendMail` failure is Gmail's own `552 5.7.0` content policy rejection,
 * as opposed to a connection, authentication or other transport error.
 *
 * @param error - Error thrown by `transporter.sendMail`.
 * @returns Whether the provider rejected the message content or an attachment.
 */
function isProviderContentRejection(error: unknown): boolean {
  return (
    error instanceof Error &&
    "responseCode" in error &&
    error.responseCode === 552
  )
}

/**
 * Validates a contact form submission and its attachments, then forwards it by email.
 *
 * Expected fields: `email`, `subject`, `message` (optional), `files` (repeated) and the
 * `website` honeypot, which humans never see: a filled one fakes a success so bots do not retry.
 *
 * @param formData - Submitted form data.
 * @returns A success, or an error code for the UI to translate.
 */
export async function sendContactMessage(
  formData: FormData
): Promise<ContactResult> {
  const honeypot = formData.get("website")
  if (typeof honeypot === "string" && honeypot.length > 0)
    return { status: "success" }

  if (!rateLimiter.consume(await getClientIp()))
    return { status: "error", code: "rateLimited" }

  const rawEmail = formData.get("email")
  const rawSubject = formData.get("subject")
  const rawMessage = formData.get("message")
  const email = typeof rawEmail === "string" ? rawEmail.trim() : ""
  const subject = typeof rawSubject === "string" ? rawSubject.trim() : ""
  const message = typeof rawMessage === "string" ? rawMessage.trim() : ""

  const emailError = validateEmail(email)
  if (emailError) return { status: "error", code: emailError }

  const subjectError = validateSubject(subject)
  if (subjectError) return { status: "error", code: subjectError }

  const messageError = validateMessage(message)
  if (messageError) return { status: "error", code: messageError }

  const files: File[] = formData
    .getAll("files")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0)

  const attachmentError = validateAttachments(files)
  if (attachmentError) return { status: "error", ...attachmentError }

  const config = getMailConfig()
  if (!config) {
    console.error(
      "Contact form: SMTP_HOST, SMTP_USER, SMTP_PASS and CONTACT_EMAIL must be set."
    )
    return { status: "error", code: "serverError" }
  }

  const attachments: Attachment[] = await Promise.all(
    files.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type || "application/octet-stream"
    }))
  )

  const archiveError = await validateArchiveEntries(
    attachments.map((attachment) => ({
      name: attachment.filename,
      content: attachment.content
    }))
  )
  if (archiveError) return { status: "error", ...archiveError }

  try {
    const transporter = createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: { user: config.user, pass: config.pass }
    })

    await transporter.sendMail({
      from: { name: "Portfolio", address: config.from },
      to: config.to,
      replyTo: email,
      subject: `[Portfolio] Message de ${email} — ${subject.replace(/[\r\n]+/g, " ")}`,
      text: `De : ${email}\n\n${message}`,
      attachments
    })
  } catch (error) {
    console.error("Contact email could not be sent:", error)

    if (isProviderContentRejection(error) && attachments.length > 0) {
      return {
        status: "error",
        code: "attachmentRejected",
        fileName: attachments
          .map((attachment) => attachment.filename)
          .join(", ")
      }
    }

    return { status: "error", code: "serverError" }
  }

  return { status: "success" }
}
