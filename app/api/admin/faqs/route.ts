import { NextResponse } from 'next/server'
import { prisma, dbAvailable } from '@/lib/db'
import { FAQS } from '@/lib/data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') ?? undefined
  if (!dbAvailable) {
    return NextResponse.json(FAQS.map((f, i) => ({ id: i + 1, question: f.question, answer: f.answer, page: 'homepage', order: i })))
  }
  try {
    return NextResponse.json(
      await prisma.faq.findMany({
        where: page ? { page } : undefined,
        orderBy: { order: 'asc' },
      })
    )
  } catch {
    return NextResponse.json(FAQS.map((f, i) => ({ id: i + 1, question: f.question, answer: f.answer, page: 'homepage', order: i })))
  }
}

export async function POST(request: Request) {
  if (!dbAvailable) return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  const body = await request.json()
  const item = await prisma.faq.create({ data: body })
  return NextResponse.json(item, { status: 201 })
}
