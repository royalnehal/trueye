import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const links = await prisma.navLink.findMany({
    orderBy: { order: 'asc' },
    include: { dropdown: { orderBy: { order: 'asc' } } },
  })
  return NextResponse.json(links)
}

export async function PUT(request: Request) {
  const body = await request.json()
  // body: { links: Array<{ id?, label, href, order, dropdown: Array<{ id?, label, href, order }> }> }
  const { links } = body as {
    links: Array<{ id?: number; label: string; href: string; order: number; dropdown?: Array<{ id?: number; label: string; href: string; order: number }> }>
  }

  for (const link of links) {
    if (link.id) {
      await prisma.navLink.update({ where: { id: link.id }, data: { label: link.label, href: link.href, order: link.order } })
      // Remove old dropdowns and recreate
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
  const body = await request.json()
  const { label, href, order } = body
  const link = await prisma.navLink.create({ data: { label, href, order: order ?? 0 } })
  return NextResponse.json(link, { status: 201 })
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  await prisma.navLink.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
