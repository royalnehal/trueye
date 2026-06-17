import Link from 'next/link'
import { Plus, Pencil, ExternalLink } from 'lucide-react'
import { getAllPosts } from '@/lib/blog'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import DeleteButton from '@/components/admin/DeleteButton'
import LogoutButton from '@/components/admin/LogoutButton'

export default function AdminDashboardPage() {
  const posts = getAllPosts()

  return (
    <section className="min-h-screen bg-[#050A14] pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-poppins font-bold text-2xl text-[#F0F4FF]">Blog Admin</h1>
            <p className="text-[#6B7FA3] text-sm mt-1">{posts.length} post{posts.length === 1 ? '' : 's'}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00D4FF] text-black font-semibold text-sm rounded-full hover:scale-105 transition-all"
            >
              <Plus size={16} /> New Post
            </Link>
            <LogoutButton />
          </div>
        </div>

        <div className="glass-card-cyan rounded-2xl overflow-hidden">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#6B7FA3]">No posts yet. Create your first one.</p>
            </div>
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
                  <tr key={post.slug} className="border-b border-white/5 last:border-0">
                    <td className="px-6 py-4">
                      <p className="text-[#F0F4FF] font-medium line-clamp-1">{post.title}</p>
                      <p className="text-[#6B7FA3] text-xs mt-1">/{post.slug}</p>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <Badge variant="cyan">{post.category}</Badge>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell text-[#6B7FA3] whitespace-nowrap">
                      {formatDate(post.date)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="text-[#6B7FA3] hover:text-[#00D4FF] transition-colors"
                          title="View"
                        >
                          <ExternalLink size={16} />
                        </Link>
                        <Link
                          href={`/admin/posts/${post.slug}`}
                          className="text-[#6B7FA3] hover:text-[#00D4FF] transition-colors"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </Link>
                        <DeleteButton slug={post.slug} title={post.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  )
}
