'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-[#6B7FA3] hover:text-[#F0F4FF] font-medium text-sm rounded-full transition-colors"
    >
      <LogOut size={16} /> Logout
    </button>
  )
}
