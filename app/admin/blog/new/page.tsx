import DbPostForm from '@/components/admin/DbPostForm'

export default function NewBlogPostPage() {
  return (
    <div className="p-8 max-w-3xl">
      <h1 className="font-bold text-2xl text-[#F0F4FF] mb-8">New Post</h1>
      <DbPostForm />
    </div>
  )
}
