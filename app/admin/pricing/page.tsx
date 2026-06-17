'use client'

import { useEffect, useState } from 'react'
import { Check, Plus, Trash2 } from 'lucide-react'

interface PricingTab { id: number; icon: string; title: string; body: string; order: number }

function Toast({ msg }: { msg: string }) {
  if (!msg) return null
  return <div className="fixed top-4 right-4 z-50 px-4 py-3 bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] text-sm rounded-lg shadow-lg">{msg}</div>
}

const ic = () => 'w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[#F0F4FF] text-sm focus:outline-none focus:border-[#00D4FF]/50 transition-colors'

export default function AdminPricingPage() {
  const [tabs, setTabs] = useState<PricingTab[]>([])
  const [drafts, setDrafts] = useState<Record<number, PricingTab>>({})
  const [saving, setSaving] = useState<number | null>(null)
  const [toast, setToast] = useState('')
  const [adding, setAdding] = useState(false)
  const [newDraft, setNewDraft] = useState<Partial<PricingTab>>({ icon: 'Info', title: '', body: '', order: 5 })

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  async function load() {
    const r = await fetch('/api/admin/pricing')
    const data = await r.json()
    setTabs(data)
    const d: Record<number, PricingTab> = {}
    for (const t of data) d[t.id] = { ...t }
    setDrafts(d)
  }
  useEffect(() => { load() }, [])

  async function saveTab(id: number) {
    setSaving(id)
    await fetch(`/api/admin/pricing/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(drafts[id]) })
    setSaving(null)
    showToast('Saved')
    load()
  }

  async function addTab() {
    await fetch('/api/admin/pricing', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newDraft) })
    showToast('Added')
    setAdding(false)
    setNewDraft({ icon: 'Info', title: '', body: '', order: tabs.length + 1 })
    load()
  }

  async function del(id: number) {
    if (!confirm('Delete this pricing tab?')) return
    await fetch(`/api/admin/pricing/${id}`, { method: 'DELETE' })
    showToast('Deleted')
    load()
  }

  function update(id: number, field: keyof PricingTab, value: string | number) {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }))
  }

  return (
    <div className="p-8 max-w-3xl">
      <Toast msg={toast} />
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-bold text-2xl text-[#F0F4FF]">Pricing Tabs</h1>
          <p className="text-[#6B7FA3] text-sm mt-1">Edit the four pricing consideration sections.</p>
        </div>
        <button onClick={() => setAdding(true)} className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00D4FF] text-black text-xs font-semibold rounded-full hover:scale-105 transition-all">
          <Plus size={13} /> Add Tab
        </button>
      </div>

      {adding && (
        <div className="bg-[#0A1628] border border-[#00D4FF]/20 rounded-xl p-5 mb-6 space-y-4">
          <h3 className="text-[#F0F4FF] font-semibold text-sm">New Pricing Tab</h3>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs text-[#6B7FA3] mb-1 block">Icon (lucide)</label>
              <input value={newDraft.icon ?? ''} onChange={(e) => setNewDraft({ ...newDraft, icon: e.target.value })} className={ic()} /></div>
            <div><label className="text-xs text-[#6B7FA3] mb-1 block">Order</label>
              <input type="number" value={newDraft.order ?? ''} onChange={(e) => setNewDraft({ ...newDraft, order: Number(e.target.value) })} className={ic()} /></div>
          </div>
          <div><label className="text-xs text-[#6B7FA3] mb-1 block">Title</label>
            <input value={newDraft.title ?? ''} onChange={(e) => setNewDraft({ ...newDraft, title: e.target.value })} className={ic()} /></div>
          <div><label className="text-xs text-[#6B7FA3] mb-1 block">Body</label>
            <textarea value={newDraft.body ?? ''} onChange={(e) => setNewDraft({ ...newDraft, body: e.target.value })} rows={4} className={ic()} /></div>
          <div className="flex gap-2">
            <button onClick={addTab} className="inline-flex items-center gap-1 px-4 py-2 bg-[#00D4FF] text-black text-xs font-semibold rounded-full"><Check size={13} /> Save</button>
            <button onClick={() => setAdding(false)} className="px-4 py-2 border border-white/10 text-[#6B7FA3] text-xs rounded-full">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {tabs.map((tab) => {
          const d = drafts[tab.id] ?? tab
          return (
            <div key={tab.id} className="bg-[#0D1F3C] border border-white/5 rounded-xl p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs text-[#6B7FA3] mb-1 block">Icon (lucide name)</label>
                  <input value={d.icon} onChange={(e) => update(tab.id, 'icon', e.target.value)} className={ic()} /></div>
                <div><label className="text-xs text-[#6B7FA3] mb-1 block">Order</label>
                  <input type="number" value={d.order} onChange={(e) => update(tab.id, 'order', Number(e.target.value))} className={ic()} /></div>
              </div>
              <div><label className="text-xs text-[#6B7FA3] mb-1 block">Title</label>
                <input value={d.title} onChange={(e) => update(tab.id, 'title', e.target.value)} className={ic()} /></div>
              <div><label className="text-xs text-[#6B7FA3] mb-1 block">Body</label>
                <textarea value={d.body} onChange={(e) => update(tab.id, 'body', e.target.value)} rows={4} className={ic()} /></div>
              <div className="flex gap-2">
                <button onClick={() => saveTab(tab.id)} disabled={saving === tab.id}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00D4FF] text-black text-xs font-semibold rounded-full hover:scale-105 transition-all disabled:opacity-60">
                  <Check size={13} /> {saving === tab.id ? 'Saving...' : 'Save'}
                </button>
                <button onClick={() => del(tab.id)} className="inline-flex items-center gap-1.5 px-4 py-2 border border-red-500/30 text-red-400 text-xs rounded-full hover:bg-red-500/10 transition-colors">
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
