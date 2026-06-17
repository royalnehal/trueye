import { NextResponse } from 'next/server'
import { prisma, dbAvailable } from '@/lib/db'
import { STATS } from '@/lib/data'

export async function GET() {
  if (!dbAvailable) {
    return NextResponse.json(STATS.map((s, i) => ({ id: i + 1, value: s.value, suffix: s.suffix, prefix: s.prefix ?? '', label: s.label, mono: s.mono ?? true, order: i })))
  }
  try {
    return NextResponse.json(await prisma.stat.findMany({ orderBy: { order: 'asc' } }))
  } catch {
    return NextResponse.json(STATS.map((s, i) => ({ id: i + 1, value: s.value, suffix: s.suffix, prefix: s.prefix ?? '', label: s.label, mono: s.mono ?? true, order: i })))
  }
}

export async function POST(request: Request) {
  if (!dbAvailable) return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  const body = await request.json()
  const stat = await prisma.stat.create({ data: body })
  return NextResponse.json(stat, { status: 201 })
}
