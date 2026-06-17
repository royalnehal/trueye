import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/blog'
import { slugify } from '@/lib/utils'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export async function GET() {
  const posts = getAllPosts()
  return NextResponse.json({ posts })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { title, description, date, author, category, coverImage, content, slug: providedSlug } = body

  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
  }

  const slug = slugify(providedSlug || title)
  if (!slug) {
    return NextResponse.json({ error: 'Could not generate a slug from the title' }, { status: 400 })
  }

  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (fs.existsSync(filePath)) {
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

  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true })
  fs.writeFileSync(filePath, fileContents, 'utf-8')

  return NextResponse.json({ success: true, slug })
}
