import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  return NextResponse.json(await prisma.office.findMany({ orderBy: { order: 'asc' } }))
}

export async function POST(request: Request) {
  const body = await request.json()
  const office = await prisma.office.create({ data: body })
  return NextResponse.json(office, { status: 201 })
}
