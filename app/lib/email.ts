// This file contains email sending functionality for production environments
// It's not used in the preview environment to avoid DNS lookup errors

import nodemailer from "nodemailer"

export async function sendEmailProduction(to: string, subject: string, text: string, html: string) {
  // This function is for reference only and should be used in production
  // It's not called in the preview environment

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.WEBSITE_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  const mailOptions = {
    from: process.env.WEBSITE_EMAIL,
    to,
    subject,
    text,
    html,
  }

  return await transporter.sendMail(mailOptions)
}
