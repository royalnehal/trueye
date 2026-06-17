import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  return NextResponse.json(await prisma.footerLink.findMany({ orderBy: [{ column: 'asc' }, { order: 'asc' }] }))
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { links } = body as { links: Array<{ id?: number; column: string; label: string; href: string; external?: boolean; order: number }> }
  for (const link of links) {
    if (link.id) {
      await prisma.footerLink.update({ where: { id: link.id }, data: { column: link.column, label: link.label, href: link.href, external: link.external ?? false, order: link.order } })
    } else {
      await prisma.footerLink.create({ data: { column: link.column, label: link.label, href: link.href, external: link.external ?? false, order: link.order } })
    }
  }
  return NextResponse.json({ ok: true })
}

export async function POST(request: Request) {
  const body = await request.json()
  const item = await prisma.footerLink.create({ data: body })
  return NextResponse.json(item, { status: 201 })
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  await prisma.footerLink.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
