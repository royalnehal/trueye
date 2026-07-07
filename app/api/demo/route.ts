import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const { firstName, lastName, email, phone, company, country, industry, businessType } = await request.json()

  if (!firstName || !lastName || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const fullName = `${firstName} ${lastName}`

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
      <p>A new demo request has been submitted. Please find the details below:</p>
      <br/>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 6px 0; color: #6b7280; width: 130px; vertical-align: top;">Name</td>
          <td style="padding: 6px 0; font-weight: 600;">: &nbsp;${fullName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280; vertical-align: top;">Email</td>
          <td style="padding: 6px 0;">: &nbsp;<a href="mailto:${email}" style="color: #0066cc;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280; vertical-align: top;">Phone</td>
          <td style="padding: 6px 0;">: &nbsp;${phone}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280; vertical-align: top;">Company</td>
          <td style="padding: 6px 0;">: &nbsp;${company}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280; vertical-align: top;">Country</td>
          <td style="padding: 6px 0;">: &nbsp;${country}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280; vertical-align: top;">Industry</td>
          <td style="padding: 6px 0;">: &nbsp;${industry}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280; vertical-align: top;">Business Type</td>
          <td style="padding: 6px 0;">: &nbsp;${businessType}</td>
        </tr>
      </table>
      <br/>
      <p>Thanks,<br/><strong>${fullName}</strong></p>
    </div>
  `

  const textBody = `Dear Admin,

A new demo request has been submitted. Please find the details below:

Name          : ${fullName}
Email         : ${email}
Phone         : ${phone}
Company       : ${company}
Country       : ${country}
Industry      : ${industry}
Business Type : ${businessType}

Thanks,
${fullName}`

  await transporter.sendMail({
    from: `"${fullName}" <${email}>`,
    to: 'contact@trueye.io',
    cc: 'nehal.khan@vertexplus.com, anurag.jain@vertexplus.com',
    subject: `Demo Request from ${fullName} — ${company}`,
    text: textBody,
    html: htmlBody,
  })

  return NextResponse.json({ ok: true })
}
