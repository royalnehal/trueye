import { NextResponse } from 'next/server'
import { prisma, dbAvailable } from '@/lib/db'
import { COMPARISON_TABLE } from '@/lib/data'

export async function GET() {
  if (!dbAvailable) {
    return NextResponse.json(COMPARISON_TABLE.map((r, i) => ({ id: i + 1, factor: r.factor, manual: r.manual, trueye: r.trueye, order: i })))
  }
  try {
    return NextResponse.json(await prisma.comparisonRow.findMany({ orderBy: { order: 'asc' } }))
  } catch {
    return NextResponse.json(COMPARISON_TABLE.map((r, i) => ({ id: i + 1, factor: r.factor, manual: r.manual, trueye: r.trueye, order: i })))
  }
}

export async function POST(request: Request) {
  if (!dbAvailable) return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  const body = await request.json()
  const item = await prisma.comparisonRow.create({ data: body })
  return NextResponse.json(item, { status: 201 })
}
