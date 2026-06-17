'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react'

type Tab = 'modules' | 'benefits' | 'industries'

interface AiModule { id: number; name: string; description: string; order: number }
interface Benefit { id: number; icon: string; stat: string; label: string; description: string; order: number }
interface Industry { id: number; name: string; icon: string; order: number }

function Toast({ msg }: { msg: string }) {
  if (!msg) return null
  return <div className="fixed top-4 right-4 z-50 px-4 py-3 bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] text-sm rounded-lg shadow-lg">{msg}</div>
}

const ic = () => 'w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[#F0F4FF] text-sm focus:outline-none focus:border-[#00D4FF]/50 transition-colors'

// ─── Modules ─────────────────────────────────────────────────────────────────
function ModulesTab({ showToast }: { showToast: (m: string) => void }) {
  const [items, setItems] = useState<AiModule[]>([])
  const [editing, setEditing] = useState<AiModule | null>(null)
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState<Partial<AiModule>>({})

  async function load() { const r = await fetch('/api/admin/modules'); setItems(await r.json()) }
  useEffect(() => { load() }, [])

  async function save() {
    if (editing) {
      await fetch(`/api/admin/modules/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...editing, ...draft }) })
      showToast('Updated')
    } else {
      await fetch('/api/admin/modules', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(draft) })
      showToast('Added')
    }
    setEditing(null); setAdding(false); setDraft({}); load()
  }

  async function del(id: number) {
    if (!confirm('Delete?')) return
    await fetch(`/api/admin/modules/${id}`, { method: 'DELETE' })
    showToast('Deleted'); load()
  }

  function startEdit(item: AiModule) { setEditing(item); setDraft(item); setAdding(false) }
  function startAdd() { setAdding(true); setEditing(null); setDraft({ name: '', description: '', order: items.length + 1 }) }
  function cancel() { setEditing(null); setAdding(false); setDraft({}) }
  const isOpen = editing || adding

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#F0F4FF] font-semibold">AI Modules ({items.length})</h2>
        <button onClick={startAdd} className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00D4FF] text-black text-xs font-semibold rounded-full hover:scale-105 transition-all">
          <Plus size={13} /> Add Module
        </button>
      </div>

      {isOpen && (
        <div className="bg-[#0A1628] border border-[#00D4FF]/20 rounded-xl p-4 mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2"><label className="text-xs text-[#6B7FA3] mb-1 block">Name</label>
              <input value={draft.name ?? ''} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className={ic()} /></div>
            <div><label className="text-xs text-[#6B7FA3] mb-1 block">Order</label>
              <input type="number" value={draft.order ?? ''} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} className={ic()} /></div>
          </div>
          <div><label className="text-xs text-[#6B7FA3] mb-1 block">Description</label>
            <textarea value={draft.description ?? ''} onChange={(e) => setDraft({ ...draft, description: e.target.value })} rows={3} className={ic()} /></div>
          <div className="flex gap-2">
            <button onClick={save} className="inline-flex items-center gap-1 px-4 py-2 bg-[#00D4FF] text-black text-xs font-semibold rounded-full"><Check size={13} /> Save</button>
            <button onClick={cancel} className="inline-flex items-center gap-1 px-4 py-2 border border-white/10 text-[#6B7FA3] text-xs rounded-full"><X size={13} /> Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-[#0D1F3C] rounded-xl border border-white/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-[#6B7FA3] text-xs uppercase tracking-wide">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3 hidden md:table-cell">Description</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-white/5 last:border-0 hover:bg-white/2">
                <td className="px-4 py-3 text-[#6B7FA3] text-xs">{item.order}</td>
                <td className="px-4 py-3 text-[#F0F4FF] font-medium">{item.name}</td>
                <td className="px-4 py-3 text-[#6B7FA3] text-xs hidden md:table-cell line-clamp-1 max-w-xs">{item.description}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => startEdit(item)} className="text-[#6B7FA3] hover:text-[#00D4FF] transition-colors"><Pencil size={14} /></button>
                    <button onClick={() => del(item.id)} className="text-[#6B7FA3] hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Benefits ─────────────────────────────────────────────────────────────────
function BenefitsTab({ showToast }: { showToast: (m: string) => void }) {
  const [items, setItems] = useState<Benefit[]>([])
  const [editing, setEditing] = useState<Benefit | null>(null)
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState<Partial<Benefit>>({})

  async function load() { const r = await fetch('/api/admin/benefits'); setItems(await r.json()) }
  useEffect(() => { load() }, [])

  async function save() {
    if (editing) {
      await fetch(`/api/admin/benefits/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...editing, ...draft }) })
      showToast('Updated')
    } else {
      await fetch('/api/admin/benefits', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(draft) })
      showToast('Added')
    }
    setEditing(null); setAdding(false); setDraft({}); load()
  }

  async function del(id: number) {
    if (!confirm('Delete?')) return
    await fetch(`/api/admin/benefits/${id}`, { method: 'DELETE' })
    showToast('Deleted'); load()
  }

  function startEdit(item: Benefit) { setEditing(item); setDraft(item); setAdding(false) }
  function startAdd() { setAdding(true); setEditing(null); setDraft({ icon: 'Star', stat: '', label: '', description: '', order: items.length + 1 }) }
  function cancel() { setEditing(null); setAdding(false); setDraft({}) }
  const isOpen = editing || adding

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#F0F4FF] font-semibold">Benefits</h2>
        <button onClick={startAdd} className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00D4FF] text-black text-xs font-semibold rounded-full hover:scale-105 transition-all">
          <Plus size={13} /> Add Benefit
        </button>
      </div>

      {isOpen && (
        <div className="bg-[#0A1628] border border-[#00D4FF]/20 rounded-xl p-4 mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs text-[#6B7FA3] mb-1 block">Icon (lucide)</label>
              <input value={draft.icon ?? ''} onChange={(e) => setDraft({ ...draft, icon: e.target.value })} className={ic()} /></div>
            <div><label className="text-xs text-[#6B7FA3] mb-1 block">Stat</label>
              <input value={draft.stat ?? ''} onChange={(e) => setDraft({ ...draft, stat: e.target.value })} className={ic()} placeholder="Cost Saving" /></div>
            <div className="col-span-2"><label className="text-xs text-[#6B7FA3] mb-1 block">Label</label>
              <input value={draft.label ?? ''} onChange={(e) => setDraft({ ...draft, label: e.target.value })} className={ic()} /></div>
            <div className="col-span-2"><label className="text-xs text-[#6B7FA3] mb-1 block">Description</label>
              <textarea value={draft.description ?? ''} onChange={(e) => setDraft({ ...draft, description: e.target.value })} rows={2} className={ic()} /></div>
            <div><label className="text-xs text-[#6B7FA3] mb-1 block">Order</label>
              <input type="number" value={draft.order ?? ''} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} className={ic()} /></div>
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="inline-flex items-center gap-1 px-4 py-2 bg-[#00D4FF] text-black text-xs font-semibold rounded-full"><Check size={13} /> Save</button>
            <button onClick={cancel} className="inline-flex items-center gap-1 px-4 py-2 border border-white/10 text-[#6B7FA3] text-xs rounded-full"><X size={13} /> Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item.id} className="bg-[#0D1F3C] border border-white/5 rounded-xl p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="text-xs text-[#00D4FF] font-semibold">{item.stat}</span>
                <p className="text-[#F0F4FF] text-sm font-medium mt-0.5">{item.label}</p>
                <p className="text-[#6B7FA3] text-xs mt-1">icon: {item.icon}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(item)} className="text-[#6B7FA3] hover:text-[#00D4FF] transition-colors"><Pencil size={14} /></button>
                <button onClick={() => del(item.id)} className="text-[#6B7FA3] hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
            <p className="text-[#6B7FA3] text-xs line-clamp-2">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Industries ───────────────────────────────────────────────────────────────
function IndustriesTab({ showToast }: { showToast: (m: string) => void }) {
  const [items, setItems] = useState<Industry[]>([])
  const [editing, setEditing] = useState<Industry | null>(null)
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState<Partial<Industry>>({})

  async function load() { const r = await fetch('/api/admin/industries'); setItems(await r.json()) }
  useEffect(() => { load() }, [])

  async function save() {
    if (editing) {
      await fetch(`/api/admin/industries/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...editing, ...draft }) })
      showToast('Updated')
    } else {
      await fetch('/api/admin/industries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(draft) })
      showToast('Added')
    }
    setEditing(null); setAdding(false); setDraft({}); load()
  }

  async function del(id: number) {
    if (!confirm('Delete?')) return
    await fetch(`/api/admin/industries/${id}`, { method: 'DELETE' })
    showToast('Deleted'); load()
  }

  function startEdit(item: Industry) { setEditing(item); setDraft(item); setAdding(false) }
  function startAdd() { setAdding(true); setEditing(null); setDraft({ name: '', icon: 'Building', order: items.length + 1 }) }
  function cancel() { setEditing(null); setAdding(false); setDraft({}) }
  const isOpen = editing || adding

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#F0F4FF] font-semibold">Industries</h2>
        <button onClick={startAdd} className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00D4FF] text-black text-xs font-semibold rounded-full hover:scale-105 transition-all">
          <Plus size={13} /> Add Industry
        </button>
      </div>

      {isOpen && (
        <div className="bg-[#0A1628] border border-[#00D4FF]/20 rounded-xl p-4 mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs text-[#6B7FA3] mb-1 block">Name</label>
              <input value={draft.name ?? ''} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className={ic()} /></div>
            <div><label className="text-xs text-[#6B7FA3] mb-1 block">Icon (lucide)</label>
              <input value={draft.icon ?? ''} onChange={(e) => setDraft({ ...draft, icon: e.target.value })} className={ic()} /></div>
            <div><label className="text-xs text-[#6B7FA3] mb-1 block">Order</label>
              <input type="number" value={draft.order ?? ''} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} className={ic()} /></div>
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="inline-flex items-center gap-1 px-4 py-2 bg-[#00D4FF] text-black text-xs font-semibold rounded-full"><Check size={13} /> Save</button>
            <button onClick={cancel} className="inline-flex items-center gap-1 px-4 py-2 border border-white/10 text-[#6B7FA3] text-xs rounded-full"><X size={13} /> Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {items.map((item) => (
          <div key={item.id} className="bg-[#0D1F3C] border border-white/5 rounded-xl p-3 flex items-center justify-between">
            <div>
              <p className="text-[#F0F4FF] text-sm font-medium">{item.name}</p>
              <p className="text-[#6B7FA3] text-xs">{item.icon}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(item)} className="text-[#6B7FA3] hover:text-[#00D4FF] transition-colors"><Pencil size={13} /></button>
              <button onClick={() => del(item.id)} className="text-[#6B7FA3] hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AdminProductPage() {
  const [tab, setTab] = useState<Tab>('modules')
  const [toast, setToast] = useState('')

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const TABS: { key: Tab; label: string }[] = [
    { key: 'modules', label: 'AI Modules' },
    { key: 'benefits', label: 'Benefits' },
    { key: 'industries', label: 'Industries' },
  ]

  return (
    <div className="p-8">
      <Toast msg={toast} />
      <h1 className="font-bold text-2xl text-[#F0F4FF] mb-6">Product Page Content</h1>
      <div className="flex gap-2 mb-6 border-b border-white/10 pb-4">
        {TABS.map(({ key, label }) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === key ? 'bg-[#00D4FF] text-black' : 'text-[#6B7FA3] hover:text-[#F0F4FF]'}`}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'modules' && <ModulesTab showToast={showToast} />}
      {tab === 'benefits' && <BenefitsTab showToast={showToast} />}
      {tab === 'industries' && <IndustriesTab showToast={showToast} />}
    </div>
  )
}
