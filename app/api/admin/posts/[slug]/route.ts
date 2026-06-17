import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { NextResponse } from 'next/server'
import { getPostBySlug } from '@/lib/blog'
import { slugify } from '@/lib/utils'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

interface Params {
  params: { slug: string }
}

export async function GET(_request: Request, { params }: Params) {
  const post = getPostBySlug(params.slug)
  if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  return NextResponse.json({ post })
}

export async function PUT(request: Request, { params }: Params) {
  const currentSlug = params.slug
  const currentPath = path.join(BLOG_DIR, `${currentSlug}.mdx`)
  if (!fs.existsSync(currentPath)) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  const body = await request.json()
  const { title, description, date, author, category, coverImage, content, slug: providedSlug } = body

  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
  }

  const newSlug = slugify(providedSlug || currentSlug)
  if (!newSlug) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
  }

  const newPath = path.join(BLOG_DIR, `${newSlug}.mdx`)
  if (newSlug !== currentSlug && fs.existsSync(newPath)) {
    return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 })
  }

  const frontmatter: Record<string, string> = {
    title,
    description: description || '',
    date: date || new Date().toISOString().split('T')[0],
    author: author || 'TruEye Team',
    category: category || 'Video Analytics',
  }
  if (coverImage) frontmatter.coverImage = coverImage

  const fileContents = matter.stringify(content, frontmatter)

  fs.writeFileSync(newPath, fileContents, 'utf-8')
  if (newSlug !== currentSlug) {
    fs.unlinkSync(currentPath)
  }

  return NextResponse.json({ success: true, slug: newSlug })
}

export async function DELETE(_request: Request, { params }: Params) {
  const filePath = path.join(BLOG_DIR, `${params.slug}.mdx`)
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }
  fs.unlinkSync(filePath)
  return NextResponse.json({ success: true })
}
