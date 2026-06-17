import { NextResponse } from 'next/server'
import { prisma, dbAvailable } from '@/lib/db'
import { FOOTER_LINKS } from '@/lib/data'

export async function GET() {
  if (!dbAvailable) {
    let id = 1
    const flat = [
      ...FOOTER_LINKS.solution.map((l, i) => ({ id: id++, column: 'solution', label: l.label, href: l.href, external: false, order: i })),
      ...FOOTER_LINKS.resources.map((l, i) => ({ id: id++, column: 'resources', label: l.label, href: l.href, external: false, order: i })),
      ...FOOTER_LINKS.company.map((l, i) => ({ id: id++, column: 'company', label: l.label, href: l.href, external: (l as { external?: boolean }).external ?? false, order: i })),
    ]
    return NextResponse.json(flat)
  }
  try {
    return NextResponse.json(await prisma.footerLink.findMany({ orderBy: [{ column: 'asc' }, { order: 'asc' }] }))
  } catch {
    let id = 1
    const flat = [
      ...FOOTER_LINKS.solution.map((l, i) => ({ id: id++, column: 'solution', label: l.label, href: l.href, external: false, order: i })),
      ...FOOTER_LINKS.resources.map((l, i) => ({ id: id++, column: 'resources', label: l.label, href: l.href, external: false, order: i })),
      ...FOOTER_LINKS.company.map((l, i) => ({ id: id++, column: 'company', label: l.label, href: l.href, external: (l as { external?: boolean }).external ?? false, order: i })),
    ]
    return NextResponse.json(flat)
  }
}

export async function PUT(request: Request) {
  if (!dbAvailable) return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
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
  if (!dbAvailable) return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  const body = await request.json()
  const item = await prisma.footerLink.create({ data: body })
  return NextResponse.json(item, { status: 201 })
}

export async function DELETE(request: Request) {
  if (!dbAvailable) return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  const { id } = await request.json()
  await prisma.footerLink.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
