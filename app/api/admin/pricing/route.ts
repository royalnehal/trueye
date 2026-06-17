import { NextResponse } from 'next/server'
import { prisma, dbAvailable } from '@/lib/db'
import { PRICING_TABS } from '@/lib/data'

export async function GET() {
  if (!dbAvailable) {
    return NextResponse.json(PRICING_TABS.map((p, i) => ({ id: i + 1, icon: p.icon, title: p.title, body: p.body, order: i })))
  }
  try {
    return NextResponse.json(await prisma.pricingTab.findMany({ orderBy: { order: 'asc' } }))
  } catch {
    return NextResponse.json(PRICING_TABS.map((p, i) => ({ id: i + 1, icon: p.icon, title: p.title, body: p.body, order: i })))
  }
}

export async function POST(request: Request) {
  if (!dbAvailable) return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  const body = await request.json()
  const item = await prisma.pricingTab.create({ data: body })
  return NextResponse.json(item, { status: 201 })
}
