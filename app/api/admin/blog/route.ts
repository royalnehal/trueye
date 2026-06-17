import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const posts = await prisma.blogPost.findMany({ orderBy: { date: 'desc' } })
  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { slug, title, description, content, date, author, category, coverImage, published } = body
  if (!slug || !title) {
    return NextResponse.json({ error: 'slug and title are required' }, { status: 400 })
  }
  try {
    const post = await prisma.blogPost.create({
      data: { slug, title, description: description ?? '', content: content ?? '', date: date ?? new Date().toISOString().split('T')[0], author: author ?? 'TruEye Team', category: category ?? 'Video Analytics', coverImage: coverImage ?? null, published: published ?? true },
    })
    return NextResponse.json(post, { status: 201 })
  } catch (e: unknown) {
    if (e && typeof e === 'object' && 'code' in e && (e as { code: string }).code === 'P2002') {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
