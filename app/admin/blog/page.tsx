'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, ExternalLink, Trash2 } from 'lucide-react'

interface Post {
  id: number
  slug: string
  title: string
  category: string
  date: string
  published: boolean
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState('')

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/blog')
    const data = await res.json()
    setPosts(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id: number, title: string) {
    if (!confirm(`Delete "${title}"?`)) return
    await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' })
    showToast('Post deleted')
    load()
  }

  return (
    <div className="p-8">
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] text-sm rounded-lg">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-bold text-2xl text-[#F0F4FF]">Blog Posts</h1>
          <p className="text-[#6B7FA3] text-sm mt-1">{posts.length} post{posts.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00D4FF] text-black font-semibold text-sm rounded-full hover:scale-105 transition-all"
        >
          <Plus size={16} /> New Post
        </Link>
      </div>

      <div className="bg-[#0D1F3C] rounded-2xl overflow-hidden border border-white/5">
        {loading ? (
          <div className="text-center py-16 text-[#6B7FA3]">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 text-[#6B7FA3]">No posts yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-[#6B7FA3] text-xs uppercase tracking-wide">
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium hidden md:table-cell">Category</th>
                <th className="px-6 py-4 font-medium hidden md:table-cell">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-[#F0F4FF] font-medium line-clamp-1">{post.title}</p>
                    <p className="text-[#6B7FA3] text-xs mt-1 font-mono">/{post.slug}</p>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="px-2 py-1 rounded-full text-xs bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell text-[#6B7FA3] whitespace-nowrap text-xs">
                    {post.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="text-[#6B7FA3] hover:text-[#00D4FF] transition-colors"
                        title="View"
                      >
                        <ExternalLink size={15} />
                      </Link>
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="text-[#6B7FA3] hover:text-[#00D4FF] transition-colors"
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        className="text-[#6B7FA3] hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
