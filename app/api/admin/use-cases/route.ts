import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  return NextResponse.json(await prisma.useCase.findMany({ orderBy: { order: 'asc' } }))
}

export async function POST(request: Request) {
  const body = await request.json()
  const item = await prisma.useCase.create({ data: body })
  return NextResponse.json(item, { status: 201 })
}
