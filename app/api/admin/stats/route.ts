import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  return NextResponse.json(await prisma.stat.findMany({ orderBy: { order: 'asc' } }))
}

export async function POST(request: Request) {
  const body = await request.json()
  const stat = await prisma.stat.create({ data: body })
  return NextResponse.json(stat, { status: 201 })
}
