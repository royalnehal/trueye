import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  return NextResponse.json(await prisma.comparisonRow.findMany({ orderBy: { order: 'asc' } }))
}

export async function POST(request: Request) {
  const body = await request.json()
  const item = await prisma.comparisonRow.create({ data: body })
  return NextResponse.json(item, { status: 201 })
}
