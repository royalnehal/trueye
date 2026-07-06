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
  })

  await transporter.sendMail({
    from: `"${fullName}" <${process.env.SMTP_USER}>`,
    replyTo: email,
    to: 'contact@trueye.io',
    subject: `New Inquiry from ${fullName}${company ? ` (${company})` : ''}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
        <div style="background:#0a1628;padding:24px 32px;">
          <h2 style="color:#00D4FF;margin:0;font-size:20px;">New Contact Inquiry</h2>
          <p style="color:#6B7FA3;margin:4px 0 0;font-size:13px;">from trueyeai.com contact form</p>
        </div>
        <div style="padding:32px;background:#ffffff;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;width:120px;">Name</td><td style="padding:8px 0;font-weight:600;color:#111827;">${fullName}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#00D4FF;">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Phone</td><td style="padding:8px 0;color:#111827;">${phone}</td></tr>` : ''}
            ${company ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Company</td><td style="padding:8px 0;color:#111827;">${company}</td></tr>` : ''}
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />
          <p style="color:#6b7280;font-size:13px;margin:0 0 8px;">Message</p>
          <p style="color:#111827;line-height:1.7;white-space:pre-wrap;margin:0;">${message}</p>
        </div>
        <div style="background:#f9fafb;padding:16px 32px;text-align:center;">
          <p style="color:#9ca3af;font-size:12px;margin:0;">Reply to this email to respond directly to ${fullName}</p>
        </div>
      </div>
    `,
  })

  return NextResponse.json({ ok: true })
}
