import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import BlogProgressBar from './BlogProgressBar'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://www.trueye.io/blog/${params.slug}`,
      languages: { en: `https://www.trueye.io/blog/${params.slug}` },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.trueye.io/blog/${params.slug}`,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: '/og/blog.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      title: post.title,
      description: post.description,
      images: ['/og/blog.jpg'],
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const allPosts = getAllPosts()
  const related = allPosts.filter((p) => p.slug !== params.slug).slice(0, 3)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: { '@type': 'Organization', name: 'TruEye' },
    publisher: {
      '@type': 'Organization',
      name: 'TruEye',
      logo: { '@type': 'ImageObject', url: 'https://www.trueye.io/images/logo.webp' },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: `https://www.trueye.io/blog/${params.slug}`,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.trueye.io' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.trueye.io/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.trueye.io/blog/${params.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogProgressBar />

      <article className="pt-32 pb-20 bg-[#050A14]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#6B7FA3] hover:text-[#00D4FF] transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>

          {/* Header */}
          <div className="mb-8">
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="font-poppins font-bold text-display-md md:text-display-lg text-[#F0F4FF] leading-tight mb-5">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B7FA3]">
              <span className="flex items-center gap-1.5">
                <User size={12} />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Cover */}
          <div className="h-56 rounded-2xl bg-gradient-to-br from-[#0D1F3C] to-[#050A14] border border-white/10 mb-10 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'linear-gradient(rgba(0,212,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.4) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl opacity-10 text-[#00D4FF]">◉</span>
            </div>
          </div>

          {/* MDX Content */}
          <div className="mdx-content">
            <MDXRemote source={post.content} />
          </div>

          {/* Mid-article CTA */}
          <div className="my-12 p-6 glass-card-cyan rounded-2xl flex items-center justify-between gap-6 flex-wrap">
            <div>
              <p className="font-poppins font-bold text-[#F0F4FF] text-base mb-1">
                See TruEye in action
              </p>
              <p className="text-[#6B7FA3] text-sm">
                Schedule a personalized demo with our video analytics experts.
              </p>
            </div>
            <Link
              href="/#requestdemo"
              className="px-6 py-3 bg-[#00D4FF] text-black font-semibold text-sm rounded-full hover:scale-105 transition-all flex-shrink-0"
            >
              Request Demo
            </Link>
          </div>

          {/* Author block */}
          <div className="flex items-center gap-4 py-6 border-t border-white/10">
            <div className="w-12 h-12 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-[#00D4FF] font-poppins font-bold text-sm">TE</span>
            </div>
            <div>
              <p className="font-medium text-[#F0F4FF] text-sm">TruEye Team</p>
              <p className="text-[#6B7FA3] text-xs">VertexPlus Technologies Limited</p>
            </div>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16 bg-[#0A1628]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-poppins font-bold text-xl text-[#F0F4FF] mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="glass-card rounded-xl p-5 hover:-translate-y-1 transition-all block">
                  <Badge className="mb-3">{rp.category}</Badge>
                  <h3 className="font-poppins font-semibold text-[#F0F4FF] text-sm leading-snug mb-2 line-clamp-2">{rp.title}</h3>
                  <p className="text-[#6B7FA3] text-xs">{formatDate(rp.date)} · {rp.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
