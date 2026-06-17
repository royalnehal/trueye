import { NextResponse } from 'next/server'
import { prisma, dbAvailable } from '@/lib/db'
import { USE_CASES } from '@/lib/data'

export async function GET() {
  if (!dbAvailable) {
    return NextResponse.json(USE_CASES.map((u, i) => ({ id: i + 1, title: u.title, description: u.description, icon: u.icon, order: i })))
  }
  try {
    return NextResponse.json(await prisma.useCase.findMany({ orderBy: { order: 'asc' } }))
  } catch {
    return NextResponse.json(USE_CASES.map((u, i) => ({ id: i + 1, title: u.title, description: u.description, icon: u.icon, order: i })))
  }
}

export async function POST(request: Request) {
  if (!dbAvailable) return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  const body = await request.json()
  const item = await prisma.useCase.create({ data: body })
  return NextResponse.json(item, { status: 201 })
}
