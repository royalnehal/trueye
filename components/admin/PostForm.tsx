'use client'

import { useMemo, useRef, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, Pencil, Upload, X } from 'lucide-react'
import { markdownToHtml } from '@/lib/markdown'
import { slugify } from '@/lib/utils'
import type { BlogPost } from '@/lib/blog'
import RichTextEditor from './RichTextEditor'

interface PostFormProps {
  post?: BlogPost
}

const CATEGORIES = [
  'Video Analytics',
  'Artificial Intelligence',
  'Crowd Detection',
  'Privacy & Ethics',
  'Fire & Smoke Detection',
  'ANPR & Traffic',
  'Security',
  'Intrusion Detection',
]

export default function PostForm({ post }: PostFormProps) {
  const router = useRouter()
  const isEditing = Boolean(post)

  const [title, setTitle] = useState(post?.title ?? '')
  const [slug, setSlug] = useState(post?.slug ?? '')
  const [description, setDescription] = useState(post?.description ?? '')
  const [date, setDate] = useState(post?.date ?? new Date().toISOString().split('T')[0])
  const [author, setAuthor] = useState(post?.author ?? 'TruEye Team')
  const [category, setCategory] = useState(post?.category ?? CATEGORIES[0])
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? '')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [content, setContent] = useState(post?.content ?? '')
  const [slugTouched, setSlugTouched] = useState(isEditing)
  const [tab, setTab] = useState<'edit' | 'preview'>('edit')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const previewHtml = useMemo(() => markdownToHtml(content), [content])

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!slugTouched) {
      setSlug(slugify(value))
    }
  }

  async function handleImageUpload(file: File) {
    setUploadError('')
    setUploading(true)
    const form = new FormData()
    form.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: form })
    const data = await res.json()
    setUploading(false)
    if (!res.ok) {
      setUploadError(data.error || 'Upload failed.')
      return
    }
    setCoverImage(data.url)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)

    const payload = { title, slug, description, date, author, category, coverImage, content }
    const url = isEditing ? `/api/admin/posts/${post!.slug}` : '/api/admin/posts'
    const method = isEditing ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await res.json()
    setSaving(false)

    if (!res.ok) {
      setError(data.error || 'Something went wrong.')
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-[#6B7FA3] mb-2">Title</label>
          <input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-[#F0F4FF] text-sm focus:outline-none focus:border-[#00D4FF]/50 transition-colors"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-[#6B7FA3] mb-2">Slug</label>
          <input
            value={slug}
            onChange={(e) => {
              setSlugTouched(true)
              setSlug(e.target.value)
            }}
            required
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-[#F0F4FF] text-sm font-mono focus:outline-none focus:border-[#00D4FF]/50 transition-colors"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-[#6B7FA3] mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            required
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-[#F0F4FF] text-sm focus:outline-none focus:border-[#00D4FF]/50 transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#6B7FA3] mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-[#F0F4FF] text-sm focus:outline-none focus:border-[#00D4FF]/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#6B7FA3] mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-[#F0F4FF] text-sm focus:outline-none focus:border-[#00D4FF]/50 transition-colors"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-[#0D1F3C]">
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-[#6B7FA3] mb-2">Author</label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-[#F0F4FF] text-sm focus:outline-none focus:border-[#00D4FF]/50 transition-colors"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-[#6B7FA3] mb-2">Featured Image</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleImageUpload(file)
            }}
          />
          {coverImage ? (
            <div className="relative rounded-xl overflow-hidden border border-white/10 h-48 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coverImage} alt="Featured image" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#00D4FF] text-black text-xs font-semibold rounded-full hover:scale-105 transition-all"
                >
                  <Upload size={13} /> Replace
                </button>
                <button
                  type="button"
                  onClick={() => { setCoverImage(''); if (fileInputRef.current) fileInputRef.current.value = '' }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/80 text-white text-xs font-semibold rounded-full hover:scale-105 transition-all"
                >
                  <X size={13} /> Remove
                </button>
              </div>
              {uploading && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <span className="text-[#00D4FF] text-sm">Uploading...</span>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full h-36 rounded-xl border-2 border-dashed border-white/20 hover:border-[#00D4FF]/50 transition-colors flex flex-col items-center justify-center gap-2 text-[#6B7FA3] hover:text-[#00D4FF] disabled:opacity-60"
            >
              <Upload size={24} />
              <span className="text-sm font-medium">{uploading ? 'Uploading...' : 'Click to upload image'}</span>
              <span className="text-xs opacity-60">JPEG, PNG, WebP, GIF — max 5MB</span>
            </button>
          )}
          {uploadError && (
            <p className="mt-2 text-xs text-red-400">{uploadError}</p>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-medium text-[#6B7FA3]">Content</label>
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10">
            <button
              type="button"
              onClick={() => setTab('edit')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                tab === 'edit' ? 'bg-[#00D4FF] text-black' : 'text-[#6B7FA3]'
              }`}
            >
              <Pencil size={12} /> Edit
            </button>
            <button
              type="button"
              onClick={() => setTab('preview')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                tab === 'preview' ? 'bg-[#00D4FF] text-black' : 'text-[#6B7FA3]'
              }`}
            >
              <Eye size={12} /> Preview
            </button>
          </div>
        </div>

        {tab === 'edit' ? (
          <RichTextEditor content={content} onChange={setContent} />
        ) : (
          <div
            className="mdx-content px-4 py-3 rounded-lg bg-white/5 border border-white/10 min-h-[400px] max-h-[600px] overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-[#00D4FF] text-black font-semibold text-sm rounded-full hover:scale-105 transition-all disabled:opacity-60 disabled:hover:scale-100"
        >
          {saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Publish Post'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="px-6 py-3 border border-white/10 text-[#6B7FA3] hover:text-[#F0F4FF] font-medium text-sm rounded-full transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
