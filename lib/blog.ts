import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { readingTime } from './utils'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  coverImage?: string
  readTime: string
  content: string
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))
  return files
    .map((file) => getPostBySlug(file.replace('.mdx', '')))
    .filter(Boolean)
    .sort((a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime()) as BlogPost[]
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ?? new Date().toISOString().split('T')[0],
    author: data.author ?? 'TruEye Team',
    category: data.category ?? 'Technology',
    coverImage: data.coverImage,
    readTime: readingTime(content),
    content,
  }
}
