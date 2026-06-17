import { NextResponse } from 'next/server'
import { prisma, dbAvailable } from '@/lib/db'
import { INDUSTRIES } from '@/lib/data'

export async function GET() {
  if (!dbAvailable) {
    return NextResponse.json(INDUSTRIES.map((ind, i) => ({ id: i + 1, name: ind.name, icon: ind.icon, order: i })))
  }
  try {
    return NextResponse.json(await prisma.industry.findMany({ orderBy: { order: 'asc' } }))
  } catch {
    return NextResponse.json(INDUSTRIES.map((ind, i) => ({ id: i + 1, name: ind.name, icon: ind.icon, order: i })))
  }
}

export async function POST(request: Request) {
  if (!dbAvailable) return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  const body = await request.json()
  const item = await prisma.industry.create({ data: body })
  return NextResponse.json(item, { status: 201 })
}
