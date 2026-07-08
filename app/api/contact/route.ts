import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const { fullName, email, phone, company, message } = await request.json()

  if (!fullName || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
  })

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111827;">
      <p>Dear Admin,</p>
      <br/>
      <p>Please find below the enquiry details:</p>
      <br/>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 6px 0; color: #6b7280; width: 100px; vertical-align: top;">Name</td>
          <td style="padding: 6px 0; font-weight: 600;">: &nbsp;${fullName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280; vertical-align: top;">Email</td>
          <td style="padding: 6px 0;">: &nbsp;<a href="mailto:${email}" style="color: #0066cc;">${email}</a></td>
        </tr>
        ${phone ? `
        <tr>
          <td style="padding: 6px 0; color: #6b7280; vertical-align: top;">Phone</td>
          <td style="padding: 6px 0;">: &nbsp;${phone}</td>
        </tr>` : ''}
        ${company ? `
        <tr>
          <td style="padding: 6px 0; color: #6b7280; vertical-align: top;">Company</td>
          <td style="padding: 6px 0;">: &nbsp;${company}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 6px 0; color: #6b7280; vertical-align: top;">Message</td>
          <td style="padding: 6px 0;">: &nbsp;${message.replace(/\n/g, '<br/>')}</td>
        </tr>
      </table>
      <br/>
      <p>Thanks,<br/><strong>${fullName}</strong></p>
    </div>
  `

  const textBody = `Dear Admin,

Please find below the enquiry details:

Name    : ${fullName}
Email   : ${email}${phone ? `\nPhone   : ${phone}` : ''}${company ? `\nCompany : ${company}` : ''}
Message : ${message}

Thanks,
${fullName}`

  await transporter.sendMail({
    from: '"TruEye Website" <contact@trueye.io>',
    replyTo: `"${fullName}" <${email}>`,
    to: 'contact@trueye.io',
    cc: 'info@vertexplus.com',
    subject: `Enquiry from ${fullName}${company ? ` — ${company}` : ''}`,
    text: textBody,
    html: htmlBody,
  })

  return NextResponse.json({ ok: true })
}
