'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

interface DeleteButtonProps {
  slug: string
  title: string
}

export default function DeleteButton({ slug, title }: DeleteButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return

    setLoading(true)
    const res = await fetch(`/api/admin/posts/${slug}`, { method: 'DELETE' })
    setLoading(false)

    if (res.ok) {
      router.refresh()
    } else {
      alert('Failed to delete post.')
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-[#6B7FA3] hover:text-red-400 transition-colors disabled:opacity-50"
      title="Delete"
    >
      <Trash2 size={16} />
    </button>
  )
}
