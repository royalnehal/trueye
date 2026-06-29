import { NextResponse } from 'next/server'
import { prisma, dbAvailable } from '@/lib/db'
import { AI_MODULES } from '@/lib/data'

export async function GET() {
  if (!dbAvailable) {
    return NextResponse.json(AI_MODULES.map((m, i) => ({ id: i + 1, name: m.name, description: m.description, order: i })))
  }
  try {
    return NextResponse.json(await prisma.aiModule.findMany({ orderBy: { order: 'asc' } }))
  } catch {
    return NextResponse.json(AI_MODULES.map((m, i) => ({ id: i + 1, name: m.name, description: m.description, order: i })))
  }
}

export async function POST(request: Request) {
  if (!dbAvailable) return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  const body = await request.json()
  const aiModule = await prisma.aiModule.create({ data: body })
  return NextResponse.json(aiModule, { status: 201 })
}
