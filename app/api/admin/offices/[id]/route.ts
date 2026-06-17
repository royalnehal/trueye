import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const body = await request.json()
  const office = await prisma.office.update({ where: { id }, data: body })
  return NextResponse.json(office)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  await prisma.office.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
