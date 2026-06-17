'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import DbPostForm from '@/components/admin/DbPostForm'

interface Post {
  id: number
  slug: string
  title: string
  description: string
  content: string
  date: string
  author: string
  category: string
  coverImage?: string
  published: boolean
}

export default function EditBlogPostPage() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch(`/api/admin/blog/${id}`)
      .then((r) => {
        if (!r.ok) { setNotFound(true); return null }
        return r.json()
      })
      .then((data) => { if (data) setPost(data) })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="p-8 text-[#6B7FA3]">Loading...</div>
  if (notFound || !post) return <div className="p-8 text-red-400">Post not found.</div>

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="font-bold text-2xl text-[#F0F4FF] mb-8">Edit Post</h1>
      <DbPostForm post={post} />
    </div>
  )
}
