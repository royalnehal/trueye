import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const body = await request.json()
  const stat = await prisma.stat.update({ where: { id }, data: body })
  return NextResponse.json(stat)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  await prisma.stat.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
