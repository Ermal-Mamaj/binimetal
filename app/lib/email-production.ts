// This file contains the production email sending implementation
// It should be used when deploying to production, not in the preview environment

import nodemailer from "nodemailer"

export async function sendEmailProduction(to: string, subject: string, text: string, html: string) {
  // Create transporter
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

  // Email content
  const mailOptions = {
    from: process.env.WEBSITE_EMAIL,
    to,
    subject,
    text,
    html,
  }

  // Send email
  return await transporter.sendMail(mailOptions)
}

// Example usage in production:
/*
import { sendEmailProduction } from '@/app/lib/email-production';

// In your server action:
await sendEmailProduction(
  process.env.FORWARD_EMAIL as string,
  `Mesazh i ri nga ${validatedData.firstName} ${validatedData.lastName}`,
  `
    Emri: ${validatedData.firstName} ${validatedData.lastName}
    Email: ${validatedData.email}
    Telefon: ${validatedData.phone}
    Lloji i Projektit: ${validatedData.projectType || 'Nuk është specifikuar'}
    
    Mesazhi:
    ${validatedData.message}
  `,
  `
    <h2>Mesazh i ri nga faqja e internetit</h2>
    <p><strong>Emri:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
    <p><strong>Email:</strong> ${validatedData.email}</p>
    <p><strong>Telefon:</strong> ${validatedData.phone}</p>
    <p><strong>Lloji i Projektit:</strong> ${validatedData.projectType || 'Nuk është specifikuar'}</p>
    <h3>Mesazhi:</h3>
    <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
  `
);
*/
