import { NextResponse } from 'next/server'
import { prisma, dbAvailable } from '@/lib/db'
import { BRAND } from '@/lib/data'

const STATIC_SETTINGS: Record<string, string> = {
  brand_name: BRAND.name,
  brand_parent: BRAND.parent,
  brand_tagline: BRAND.tagline,
  brand_subtagline: BRAND.subTagline,
  email_sales: BRAND.email.sales,
  email_general: BRAND.email.general,
  phone_primary: BRAND.phone.primary,
  phone_sales: BRAND.phone.sales,
  phone_general: BRAND.phone.general,
  social_linkedin: BRAND.social.linkedin,
  social_instagram: BRAND.social.instagram,
  social_facebook: BRAND.social.facebook,
  social_twitter: BRAND.social.twitter,
  social_youtube: BRAND.social.youtube,
}

export async function GET() {
  if (!dbAvailable) return NextResponse.json(STATIC_SETTINGS)
  try {
    const settings = await prisma.siteSetting.findMany()
    const map: Record<string, string> = {}
    for (const s of settings) map[s.key] = s.value
    return NextResponse.json(map)
  } catch {
    return NextResponse.json(STATIC_SETTINGS)
  }
}

export async function PUT(request: Request) {
  if (!dbAvailable) return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  const body = await request.json() as Record<string, string>
  for (const [key, value] of Object.entries(body)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) },
    })
  }
  return NextResponse.json({ ok: true })
}
