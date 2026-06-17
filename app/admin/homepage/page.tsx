'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react'

type Tab = 'stats' | 'usecases' | 'faqs'

interface Stat { id: number; value: number; prefix: string; suffix: string; label: string; mono: boolean; order: number }
interface UseCase { id: number; title: string; description: string; icon: string; order: number }
interface Faq { id: number; question: string; answer: string; page: string; order: number }

function Toast({ msg }: { msg: string }) {
  if (!msg) return null
  return (
    <div className="fixed top-4 right-4 z-50 px-4 py-3 bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] text-sm rounded-lg shadow-lg">
      {msg}
    </div>
  )
}

function inputCls() { return 'w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[#F0F4FF] text-sm focus:outline-none focus:border-[#00D4FF]/50 transition-colors' }

// ─── Stats Tab ──────────────────────────────────────────────────────────────
function StatsTab({ showToast }: { showToast: (m: string) => void }) {
  const [stats, setStats] = useState<Stat[]>([])
  const [editing, setEditing] = useState<Stat | null>(null)
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState<Partial<Stat>>({})

  async function load() {
    const r = await fetch('/api/admin/stats')
    setStats(await r.json())
  }
  useEffect(() => { load() }, [])

  async function save() {
    if (editing) {
      await fetch(`/api/admin/stats/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...editing, ...draft }) })
      showToast('Stat updated')
    } else {
      await fetch('/api/admin/stats', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(draft) })
      showToast('Stat added')
    }
    setEditing(null); setAdding(false); setDraft({})
    load()
  }

  async function del(id: number) {
    if (!confirm('Delete this stat?')) return
    await fetch(`/api/admin/stats/${id}`, { method: 'DELETE' })
    showToast('Deleted'); load()
  }

  function startEdit(s: Stat) { setEditing(s); setDraft(s); setAdding(false) }
  function startAdd() { setAdding(true); setEditing(null); setDraft({ value: 0, prefix: '', suffix: '+', label: '', mono: true, order: stats.length + 1 }) }
  function cancel() { setEditing(null); setAdding(false); setDraft({}) }

  const isOpen = editing || adding

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#F0F4FF] font-semibold">Stats Bar</h2>
        <button onClick={startAdd} className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00D4FF] text-black text-xs font-semibold rounded-full hover:scale-105 transition-all">
          <Plus size={13} /> Add Stat
        </button>
      </div>

      {isOpen && (
        <div className="bg-[#0A1628] border border-[#00D4FF]/20 rounded-xl p-4 mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs text-[#6B7FA3] mb-1 block">Value</label>
              <input type="number" value={draft.value ?? ''} onChange={(e) => setDraft({ ...draft, value: Number(e.target.value) })} className={inputCls()} /></div>
            <div><label className="text-xs text-[#6B7FA3] mb-1 block">Prefix</label>
              <input value={draft.prefix ?? ''} onChange={(e) => setDraft({ ...draft, prefix: e.target.value })} className={inputCls()} placeholder="<" /></div>
            <div><label className="text-xs text-[#6B7FA3] mb-1 block">Suffix</label>
              <input value={draft.suffix ?? ''} onChange={(e) => setDraft({ ...draft, suffix: e.target.value })} className={inputCls()} placeholder="+" /></div>
            <div><label className="text-xs text-[#6B7FA3] mb-1 block">Order</label>
              <input type="number" value={draft.order ?? ''} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} className={inputCls()} /></div>
          </div>
          <div><label className="text-xs text-[#6B7FA3] mb-1 block">Label</label>
            <input value={draft.label ?? ''} onChange={(e) => setDraft({ ...draft, label: e.target.value })} className={inputCls()} /></div>
          <div className="flex gap-2">
            <button onClick={save} className="inline-flex items-center gap-1 px-4 py-2 bg-[#00D4FF] text-black text-xs font-semibold rounded-full"><Check size={13} /> Save</button>
            <button onClick={cancel} className="inline-flex items-center gap-1 px-4 py-2 border border-white/10 text-[#6B7FA3] text-xs rounded-full"><X size={13} /> Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {stats.map((s) => (
          <div key={s.id} className="flex items-center justify-between bg-[#0D1F3C] border border-white/5 rounded-xl px-4 py-3">
            <div>
              <span className="text-[#00D4FF] font-bold text-lg">{s.prefix}{s.value}{s.suffix}</span>
              <span className="text-[#6B7FA3] text-sm ml-3">{s.label}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(s)} className="text-[#6B7FA3] hover:text-[#00D4FF] transition-colors"><Pencil size={14} /></button>
              <button onClick={() => del(s.id)} className="text-[#6B7FA3] hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Use Cases Tab ───────────────────────────────────────────────────────────
function UseCasesTab({ showToast }: { showToast: (m: string) => void }) {
  const [items, setItems] = useState<UseCase[]>([])
  const [editing, setEditing] = useState<UseCase | null>(null)
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState<Partial<UseCase>>({})

  async function load() { const r = await fetch('/api/admin/use-cases'); setItems(await r.json()) }
  useEffect(() => { load() }, [])

  async function save() {
    if (editing) {
      await fetch(`/api/admin/use-cases/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...editing, ...draft }) })
      showToast('Updated')
    } else {
      await fetch('/api/admin/use-cases', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(draft) })
      showToast('Added')
    }
    setEditing(null); setAdding(false); setDraft({}); load()
  }

  async function del(id: number) {
    if (!confirm('Delete?')) return
    await fetch(`/api/admin/use-cases/${id}`, { method: 'DELETE' })
    showToast('Deleted'); load()
  }

  function startEdit(item: UseCase) { setEditing(item); setDraft(item); setAdding(false) }
  function startAdd() { setAdding(true); setEditing(null); setDraft({ title: '', description: '', icon: 'Shield', order: items.length + 1 }) }
  function cancel() { setEditing(null); setAdding(false); setDraft({}) }
  const isOpen = editing || adding

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#F0F4FF] font-semibold">Use Cases</h2>
        <button onClick={startAdd} className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00D4FF] text-black text-xs font-semibold rounded-full hover:scale-105 transition-all">
          <Plus size={13} /> Add Use Case
        </button>
      </div>

      {isOpen && (
        <div className="bg-[#0A1628] border border-[#00D4FF]/20 rounded-xl p-4 mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2"><label className="text-xs text-[#6B7FA3] mb-1 block">Title</label>
              <input value={draft.title ?? ''} onChange={(e) => setDraft({ ...draft, title: e.target.value })} className={inputCls()} /></div>
            <div><label className="text-xs text-[#6B7FA3] mb-1 block">Icon (lucide name)</label>
              <input value={draft.icon ?? ''} onChange={(e) => setDraft({ ...draft, icon: e.target.value })} className={inputCls()} placeholder="Shield" /></div>
            <div><label className="text-xs text-[#6B7FA3] mb-1 block">Order</label>
              <input type="number" value={draft.order ?? ''} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} className={inputCls()} /></div>
            <div className="col-span-2"><label className="text-xs text-[#6B7FA3] mb-1 block">Description</label>
              <textarea value={draft.description ?? ''} onChange={(e) => setDraft({ ...draft, description: e.target.value })} rows={3} className={inputCls()} /></div>
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
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <p className="text-[#F0F4FF] font-semibold text-sm">{item.title}</p>
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

// ─── FAQs Tab ─────────────────────────────────────────────────────────────────
function FaqsTab({ showToast }: { showToast: (m: string) => void }) {
  const [faqs, setFaqs] = useState<Faq[]>([])
  const [editing, setEditing] = useState<Faq | null>(null)
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState<Partial<Faq>>({})

  async function load() { const r = await fetch('/api/admin/faqs'); setFaqs(await r.json()) }
  useEffect(() => { load() }, [])

  async function save() {
    if (editing) {
      await fetch(`/api/admin/faqs/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...editing, ...draft }) })
      showToast('Updated')
    } else {
      await fetch('/api/admin/faqs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...draft, page: draft.page ?? 'homepage' }) })
      showToast('Added')
    }
    setEditing(null); setAdding(false); setDraft({}); load()
  }

  async function del(id: number) {
    if (!confirm('Delete?')) return
    await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' })
    showToast('Deleted'); load()
  }

  function startEdit(item: Faq) { setEditing(item); setDraft(item); setAdding(false) }
  function startAdd() { setAdding(true); setEditing(null); setDraft({ question: '', answer: '', page: 'homepage', order: faqs.length + 1 }) }
  function cancel() { setEditing(null); setAdding(false); setDraft({}) }
  const isOpen = editing || adding

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#F0F4FF] font-semibold">FAQs</h2>
        <button onClick={startAdd} className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00D4FF] text-black text-xs font-semibold rounded-full hover:scale-105 transition-all">
          <Plus size={13} /> Add FAQ
        </button>
      </div>

      {isOpen && (
        <div className="bg-[#0A1628] border border-[#00D4FF]/20 rounded-xl p-4 mb-4 space-y-3">
          <div><label className="text-xs text-[#6B7FA3] mb-1 block">Question</label>
            <input value={draft.question ?? ''} onChange={(e) => setDraft({ ...draft, question: e.target.value })} className={inputCls()} /></div>
          <div><label className="text-xs text-[#6B7FA3] mb-1 block">Answer</label>
            <textarea value={draft.answer ?? ''} onChange={(e) => setDraft({ ...draft, answer: e.target.value })} rows={3} className={inputCls()} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs text-[#6B7FA3] mb-1 block">Page</label>
              <input value={draft.page ?? 'homepage'} onChange={(e) => setDraft({ ...draft, page: e.target.value })} className={inputCls()} /></div>
            <div><label className="text-xs text-[#6B7FA3] mb-1 block">Order</label>
              <input type="number" value={draft.order ?? ''} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} className={inputCls()} /></div>
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="inline-flex items-center gap-1 px-4 py-2 bg-[#00D4FF] text-black text-xs font-semibold rounded-full"><Check size={13} /> Save</button>
            <button onClick={cancel} className="inline-flex items-center gap-1 px-4 py-2 border border-white/10 text-[#6B7FA3] text-xs rounded-full"><X size={13} /> Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-[#0D1F3C] border border-white/5 rounded-xl p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className="text-[#F0F4FF] text-sm font-medium">{faq.question}</p>
                <p className="text-[#6B7FA3] text-xs mt-1 line-clamp-2">{faq.answer}</p>
                <span className="text-xs text-[#00D4FF]/60 mt-1 block">page: {faq.page}</span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(faq)} className="text-[#6B7FA3] hover:text-[#00D4FF] transition-colors"><Pencil size={14} /></button>
                <button onClick={() => del(faq.id)} className="text-[#6B7FA3] hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function AdminHomepagePage() {
  const [tab, setTab] = useState<Tab>('stats')
  const [toast, setToast] = useState('')

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const TABS: { key: Tab; label: string }[] = [
    { key: 'stats', label: 'Stats' },
    { key: 'usecases', label: 'Use Cases' },
    { key: 'faqs', label: 'FAQs' },
  ]

  return (
    <div className="p-8">
      <Toast msg={toast} />
      <h1 className="font-bold text-2xl text-[#F0F4FF] mb-6">Homepage Content</h1>

      <div className="flex gap-2 mb-6 border-b border-white/10 pb-4">
        {TABS.map(({ key, label }) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === key ? 'bg-[#00D4FF] text-black' : 'text-[#6B7FA3] hover:text-[#F0F4FF]'}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'stats' && <StatsTab showToast={showToast} />}
      {tab === 'usecases' && <UseCasesTab showToast={showToast} />}
      {tab === 'faqs' && <FaqsTab showToast={showToast} />}
    </div>
  )
}
