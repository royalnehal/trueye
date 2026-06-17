import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/blog'
import PostForm from '@/components/admin/PostForm'

interface Props {
  params: { slug: string }
}

export default function EditPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <section className="min-h-screen bg-[#050A14] pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-poppins font-bold text-2xl text-[#F0F4FF] mb-8">Edit Post</h1>
        <PostForm post={post} />
      </div>
    </section>
  )
}
