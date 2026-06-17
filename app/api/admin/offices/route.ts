import { NextResponse } from 'next/server'
import { prisma, dbAvailable } from '@/lib/db'
import { BRAND } from '@/lib/data'

export async function GET() {
  if (!dbAvailable) {
    return NextResponse.json(BRAND.offices.map((o, i) => ({ id: i + 1, ...o, order: i })))
  }
  try {
    return NextResponse.json(await prisma.office.findMany({ orderBy: { order: 'asc' } }))
  } catch {
    return NextResponse.json(BRAND.offices.map((o, i) => ({ id: i + 1, ...o, order: i })))
  }
}

export async function POST(request: Request) {
  if (!dbAvailable) return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  const body = await request.json()
  const office = await prisma.office.create({ data: body })
  return NextResponse.json(office, { status: 201 })
}
