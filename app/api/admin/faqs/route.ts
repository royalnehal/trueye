import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') ?? undefined
  return NextResponse.json(
    await prisma.faq.findMany({
      where: page ? { page } : undefined,
      orderBy: { order: 'asc' },
    })
  )
}

export async function POST(request: Request) {
  const body = await request.json()
  const item = await prisma.faq.create({ data: body })
  return NextResponse.json(item, { status: 201 })
}
