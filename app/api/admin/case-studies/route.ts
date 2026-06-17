import { NextResponse } from 'next/server'
import { prisma, dbAvailable } from '@/lib/db'
import { CASE_STUDIES } from '@/lib/data'

export async function GET() {
  if (!dbAvailable) {
    return NextResponse.json(CASE_STUDIES.map((c, i) => ({ id: i + 1, title: c.title, icon: c.icon, challenge: c.challenge, solution: c.solution, result: c.result, pdf: c.pdf, order: i })))
  }
  try {
    return NextResponse.json(await prisma.caseStudy.findMany({ orderBy: { order: 'asc' } }))
  } catch {
    return NextResponse.json(CASE_STUDIES.map((c, i) => ({ id: i + 1, title: c.title, icon: c.icon, challenge: c.challenge, solution: c.solution, result: c.result, pdf: c.pdf, order: i })))
  }
}

export async function POST(request: Request) {
  if (!dbAvailable) return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  const body = await request.json()
  const item = await prisma.caseStudy.create({ data: body })
  return NextResponse.json(item, { status: 201 })
}
