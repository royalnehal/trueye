import { NextResponse } from 'next/server'
import { prisma, dbAvailable } from '@/lib/db'
import { getAllPosts } from '@/lib/blog'

export async function GET() {
  if (!dbAvailable) {
    const posts = getAllPosts().map((p, i) => ({
      id: i + 1,
      slug: p.slug,
      title: p.title,
      description: p.description,
      content: p.content,
      date: p.date,
      author: p.author,
      category: p.category,
      coverImage: p.coverImage ?? null,
      published: true,
    }))
    return NextResponse.json(posts)
  }
  try {
    const posts = await prisma.blogPost.findMany({ orderBy: { date: 'desc' } })
    return NextResponse.json(posts)
  } catch {
    const posts = getAllPosts().map((p, i) => ({
      id: i + 1,
      slug: p.slug,
      title: p.title,
      description: p.description,
      content: p.content,
      date: p.date,
      author: p.author,
      category: p.category,
      coverImage: p.coverImage ?? null,
      published: true,
    }))
    return NextResponse.json(posts)
  }
}

export async function POST(request: Request) {
  const body = await request.json()
  const { slug, title, description, content, date, author, category, coverImage, published } = body
  if (!slug || !title) {
    return NextResponse.json({ error: 'slug and title are required' }, { status: 400 })
  }
  if (!dbAvailable) {
    return NextResponse.json({ error: 'Database not configured. Please set DATABASE_URL.' }, { status: 503 })
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
