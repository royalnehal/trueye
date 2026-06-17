import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { getAllPosts } from '@/lib/blog'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'TruEye Blog',
  description: 'Video analytics insights, deployment guides, industry research, and AI surveillance news from the TruEye team at VertexPlus Technologies.',
  alternates: {
    canonical: 'https://www.trueye.io/blog',
    languages: { en: 'https://www.trueye.io/blog', 'en-IN': 'https://www.trueye.io/blog' },
  },
  openGraph: {
    title: 'Video Analytics Insights, Guides & Industry News | TruEye Blog',
    description: 'AI video analytics guides, deployment tips, and industry news from TruEye.',
    url: 'https://www.trueye.io/blog',
    images: [{ url: '/og/blog.jpg', width: 1200, height: 630 }],
  },
}

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'TruEye Video Analytics Blog',
  description: 'Video analytics insights, guides, and industry news from TruEye.',
  url: 'https://www.trueye.io/blog',
  publisher: {
    '@type': 'Organization',
    name: 'TruEye',
    logo: { '@type': 'ImageObject', url: 'https://www.trueye.io/images/logo.webp' },
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.trueye.io' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.trueye.io/blog' },
  ],
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative pt-36 pb-12 bg-[#050A14] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(0,212,255,0.07) 0%, transparent 60%)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-poppins font-bold text-display-xl text-[#F0F4FF] mb-4">
            Video Analytics Insights, Guides & Industry News
          </h1>
          <p className="text-body-lg text-[#6B7FA3]">
            Expert perspectives on AI video analytics, surveillance technology, and intelligent operations.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#050A14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#6B7FA3]">Blog posts coming soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {posts.map((post) => (
                <article key={post.slug} className="glass-card-cyan rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  {/* Cover image placeholder */}
                  <div className="h-44 bg-gradient-to-br from-[#0D1F3C] to-[#050A14] relative overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(0,212,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.4) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl opacity-20">—</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="cyan">{post.category}</Badge>
                    </div>
                    <h2 className="font-poppins font-bold text-[#F0F4FF] text-base leading-snug mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-[#6B7FA3] text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-[#6B7FA3] mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {post.readTime}
                      </span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-[#00D4FF] text-sm font-medium hover:gap-2.5 transition-all"
                    >
                      Read More <ArrowRight size={13} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

