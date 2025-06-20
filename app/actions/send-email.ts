"use server"

import nodemailer from "nodemailer"
import { z } from "zod"
import { kv } from "@vercel/kv"

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(1, { message: "Emri është i detyrueshëm" }),
  lastName: z.string().min(1, { message: "Mbiemri është i detyrueshëm" }),
  email: z.string().email({ message: "Email-i nuk është i vlefshëm" }),
  phone: z.string().min(1, { message: "Numri i telefonit është i detyrueshëm" }),
  projectType: z.string().optional(),
  message: z.string().min(1, { message: "Mesazhi është i detyrueshëm" }),
})

// Simple in-memory rate limiting for preview environments
const rateLimitStore = new Map<string, { count: number; timestamp: number }>()

// Simple rate limiting function
async function checkRateLimit(identifier: string): Promise<boolean> {
  // Check if we're in a preview/development environment or KV is not configured
  const isKvConfigured =
    typeof process.env.KV_REST_API_URL === "string" &&
    typeof process.env.KV_REST_API_TOKEN === "string" &&
    process.env.KV_REST_API_URL.length > 0 &&
    process.env.KV_REST_API_TOKEN.length > 0

  // If KV is configured, use it for rate limiting
  if (isKvConfigured) {
    try {
      // Get the current count for this IP
      const key = `ratelimit:${identifier}`
      const count = (await kv.get(key)) || 0

      // If more than 5 submissions in the last hour, rate limit
      if (count >= 5) {
        return false
      }

      // Increment the count and set expiry to 1 hour
      await kv.set(key, count + 1, { ex: 3600 })
      return true
    } catch (error) {
      console.error("Rate limiting error:", error)
      // If there's an error with rate limiting, allow the request
      return true
    }
  }
  // Otherwise, use in-memory rate limiting for preview/development
  else {
    const now = Date.now()
    const oneHour = 3600 * 1000 // 1 hour in milliseconds

    // Clean up expired entries
    for (const [key, data] of rateLimitStore.entries()) {
      if (now - data.timestamp > oneHour) {
        rateLimitStore.delete(key)
      }
    }

    // Check if the identifier is rate limited
    const data = rateLimitStore.get(identifier)
    if (data) {
      // If the entry is older than 1 hour, reset it
      if (now - data.timestamp > oneHour) {
        rateLimitStore.set(identifier, { count: 1, timestamp: now })
        return true
      }

      // If more than 5 submissions in the last hour, rate limit
      if (data.count >= 5) {
        return false
      }

      // Increment the count
      rateLimitStore.set(identifier, { count: data.count + 1, timestamp: data.timestamp })
    } else {
      // First submission for this identifier
      rateLimitStore.set(identifier, { count: 1, timestamp: now })
    }

    return true
  }
}

export async function sendEmail(formData: FormData) {
  try {
    // Extract data from FormData
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      projectType: formData.get("projectType") as string,
      message: formData.get("message") as string,
    }

    // Validate form data
    const validatedData = formSchema.parse(data)

    // Get IP address or email for rate limiting
    const identifier = validatedData.email

    // Check rate limit (5 submissions per hour)
    const isAllowed = await checkRateLimit(identifier)
    if (!isAllowed) {
      return {
        success: false,
        message: "Ju keni dërguar shumë mesazhe. Ju lutemi provoni përsëri më vonë.",
      }
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.WEBSITE_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // This helps with some connection issues
      },
    })

    // Email content
    const mailOptions = {
      from: `Bini Metal Website <${process.env.WEBSITE_EMAIL || "noreply@binimetal.com"}>`,
      to: process.env.FORWARD_EMAIL || "umalmamaj@gmail.com",
      subject: `Kontakt nga ${validatedData.firstName} ${validatedData.lastName} - Bini Metal`,
      text: `
Dërguar nga: ${validatedData.firstName} ${validatedData.lastName}
Email: ${validatedData.email}
Telefoni: ${validatedData.phone}
Lloji i projektit: ${validatedData.projectType || "N/A"}

Mesazhi:
${validatedData.message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #2563eb;">Mesazh i ri nga faqja e internetit</h2>
  <p><strong>Emri:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
  <p><strong>Email:</strong> ${validatedData.email}</p>
  <p><strong>Telefon:</strong> ${validatedData.phone}</p>
  <p><strong>Lloji i Projektit:</strong> ${validatedData.projectType || "Nuk është specifikuar"}</p>
  <h3 style="margin-top: 20px; color: #374151;">Mesazhi:</h3>
  <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px;">
    ${validatedData.message.replace(/\n/g, "<br>")}
  </div>
</div>
      `,
      replyTo: validatedData.email,
    }

    // Send email
    // Note: This may not work in Vercel preview environments due to DNS lookup issues
    // It will work when deployed to your domain
    await transporter.sendMail(mailOptions)

    return { success: true, message: "Mesazhi u dërgua me sukses!" }
  } catch (error) {
    console.error("Error sending email:", error)

    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.reduce(
        (acc, curr) => {
          const field = curr.path[0] as string
          acc[field] = curr.message
          return acc
        },
        {} as Record<string, string>,
      )

      return {
        success: false,
        message: "Ju lutemi kontrolloni të dhënat e formularit",
        fieldErrors,
      }
    }

    return {
      success: false,
      message: "Ndodhi një gabim gjatë dërgimit të mesazhit. Ju lutemi provoni përsëri.",
    }
  }
}
