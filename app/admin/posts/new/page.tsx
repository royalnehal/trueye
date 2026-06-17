import PostForm from '@/components/admin/PostForm'

export default function NewPostPage() {
  return (
    <section className="min-h-screen bg-[#050A14] pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-poppins font-bold text-2xl text-[#F0F4FF] mb-8">New Post</h1>
        <PostForm />
      </div>
    </section>
  )
}
