import { NextResponse } from 'next/server'
import { prisma, dbAvailable } from '@/lib/db'
import { NAV_LINKS } from '@/lib/data'

export async function GET() {
  if (!dbAvailable) {
    return NextResponse.json(
      NAV_LINKS.map((l, i) => ({
        id: i + 1, label: l.label, href: l.href, order: i,
        dropdown: (l.dropdown ?? []).map((d, j) => ({ id: j + 1, label: d.label, href: d.href, order: j, navLinkId: i + 1 })),
      }))
    )
  }
  try {
    const links = await prisma.navLink.findMany({
      orderBy: { order: 'asc' },
      include: { dropdown: { orderBy: { order: 'asc' } } },
    })
    return NextResponse.json(links)
  } catch {
    return NextResponse.json(
      NAV_LINKS.map((l, i) => ({
        id: i + 1, label: l.label, href: l.href, order: i,
        dropdown: (l.dropdown ?? []).map((d, j) => ({ id: j + 1, label: d.label, href: d.href, order: j, navLinkId: i + 1 })),
      }))
    )
  }
}

export async function PUT(request: Request) {
  if (!dbAvailable) return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  const body = await request.json()
  const { links } = body as {
    links: Array<{ id?: number; label: string; href: string; order: number; dropdown?: Array<{ id?: number; label: string; href: string; order: number }> }>
  }
  for (const link of links) {
    if (link.id) {
      await prisma.navLink.update({ where: { id: link.id }, data: { label: link.label, href: link.href, order: link.order } })
      await prisma.navDropdown.deleteMany({ where: { navLinkId: link.id } })
      if (link.dropdown?.length) {
        await prisma.navDropdown.createMany({
          data: link.dropdown.map((d, i) => ({ label: d.label, href: d.href, order: d.order ?? i, navLinkId: link.id! })),
        })
      }
    } else {
      const created = await prisma.navLink.create({ data: { label: link.label, href: link.href, order: link.order } })
      if (link.dropdown?.length) {
        await prisma.navDropdown.createMany({
          data: link.dropdown.map((d, i) => ({ label: d.label, href: d.href, order: d.order ?? i, navLinkId: created.id })),
        })
      }
    }
  }
  return NextResponse.json({ ok: true })
}

export async function POST(request: Request) {
  if (!dbAvailable) return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  const body = await request.json()
  const { label, href, order } = body
  const link = await prisma.navLink.create({ data: { label, href, order: order ?? 0 } })
  return NextResponse.json(link, { status: 201 })
}

export async function DELETE(request: Request) {
  if (!dbAvailable) return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  const { id } = await request.json()
  await prisma.navLink.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
