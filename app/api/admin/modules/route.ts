import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  return NextResponse.json(await prisma.aiModule.findMany({ orderBy: { order: 'asc' } }))
}

export async function POST(request: Request) {
  const body = await request.json()
  const module = await prisma.aiModule.create({ data: body })
  return NextResponse.json(module, { status: 201 })
}
