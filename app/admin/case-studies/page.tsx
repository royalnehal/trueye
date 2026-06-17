'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react'

type Tab = 'cases' | 'comparison'

interface CaseStudy { id: number; title: string; icon: string; challenge: string; solution: string; result: string; pdf: string; order: number }
interface CompRow { id: number; factor: string; manual: string; trueye: string; order: number }

function Toast({ msg }: { msg: string }) {
  if (!msg) return null
  return <div className="fixed top-4 right-4 z-50 px-4 py-3 bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] text-sm rounded-lg shadow-lg">{msg}</div>
}

const ic = () => 'w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[#F0F4FF] text-sm focus:outline-none focus:border-[#00D4FF]/50 transition-colors'

function CasesTab({ showToast }: { showToast: (m: string) => void }) {
  const [items, setItems] = useState<CaseStudy[]>([])
  const [editing, setEditing] = useState<CaseStudy | null>(null)
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState<Partial<CaseStudy>>({})

  async function load() { const r = await fetch('/api/admin/case-studies'); setItems(await r.json()) }
  useEffect(() => { load() }, [])

  async function save() {
    if (editing) {
      await fetch(`/api/admin/case-studies/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...editing, ...draft }) })
      showToast('Updated')
    } else {
      await fetch('/api/admin/case-studies', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(draft) })
      showToast('Added')
    }
    setEditing(null); setAdding(false); setDraft({}); load()
  }

  async function del(id: number) {
    if (!confirm('Delete?')) return
    await fetch(`/api/admin/case-studies/${id}`, { method: 'DELETE' })
    showToast('Deleted'); load()
  }

  function startEdit(item: CaseStudy) { setEditing(item); setDraft(item); setAdding(false) }
  function startAdd() { setAdding(true); setEditing(null); setDraft({ title: '', icon: 'Shield', challenge: '', solution: '', result: '', pdf: '', order: items.length + 1 }) }
  function cancel() { setEditing(null); setAdding(false); setDraft({}) }
  const isOpen = editing || adding

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#F0F4FF] font-semibold">Case Studies</h2>
        <button onClick={startAdd} className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00D4FF] text-black text-xs font-semibold rounded-full hover:scale-105 transition-all">
          <Plus size={13} /> Add Case Study
        </button>
      </div>

      {isOpen && (
        <div className="bg-[#0A1628] border border-[#00D4FF]/20 rounded-xl p-4 mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2"><label className="text-xs text-[#6B7FA3] mb-1 block">Title</label>
              <input value={draft.title ?? ''} onChange={(e) => setDraft({ ...draft, title: e.target.value })} className={ic()} /></div>
            <div><label className="text-xs text-[#6B7FA3] mb-1 block">Icon (lucide)</label>
              <input value={draft.icon ?? ''} onChange={(e) => setDraft({ ...draft, icon: e.target.value })} className={ic()} /></div>
            <div><label className="text-xs text-[#6B7FA3] mb-1 block">Order</label>
              <input type="number" value={draft.order ?? ''} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} className={ic()} /></div>
            <div className="col-span-2"><label className="text-xs text-[#6B7FA3] mb-1 block">Challenge</label>
              <textarea value={draft.challenge ?? ''} onChange={(e) => setDraft({ ...draft, challenge: e.target.value })} rows={2} className={ic()} /></div>
            <div className="col-span-2"><label className="text-xs text-[#6B7FA3] mb-1 block">Solution</label>
              <textarea value={draft.solution ?? ''} onChange={(e) => setDraft({ ...draft, solution: e.target.value })} rows={2} className={ic()} /></div>
            <div className="col-span-2"><label className="text-xs text-[#6B7FA3] mb-1 block">Result</label>
              <textarea value={draft.result ?? ''} onChange={(e) => setDraft({ ...draft, result: e.target.value })} rows={2} className={ic()} /></div>
            <div className="col-span-2"><label className="text-xs text-[#6B7FA3] mb-1 block">PDF Path</label>
              <input value={draft.pdf ?? ''} onChange={(e) => setDraft({ ...draft, pdf: e.target.value })} className={ic()} /></div>
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="inline-flex items-center gap-1 px-4 py-2 bg-[#00D4FF] text-black text-xs font-semibold rounded-full"><Check size={13} /> Save</button>
            <button onClick={cancel} className="inline-flex items-center gap-1 px-4 py-2 border border-white/10 text-[#6B7FA3] text-xs rounded-full"><X size={13} /> Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-[#0D1F3C] border border-white/5 rounded-xl p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[#F0F4FF] font-semibold">{item.title}</p>
                <p className="text-[#6B7FA3] text-xs mt-0.5">icon: {item.icon}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(item)} className="text-[#6B7FA3] hover:text-[#00D4FF] transition-colors"><Pencil size={14} /></button>
                <button onClick={() => del(item.id)} className="text-[#6B7FA3] hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div><span className="text-[#00D4FF]/60 block mb-1">Challenge</span><p className="text-[#6B7FA3] line-clamp-2">{item.challenge}</p></div>
              <div><span className="text-[#00D4FF]/60 block mb-1">Solution</span><p className="text-[#6B7FA3] line-clamp-2">{item.solution}</p></div>
              <div><span className="text-[#00D4FF]/60 block mb-1">Result</span><p className="text-[#6B7FA3] line-clamp-2">{item.result}</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ComparisonTab({ showToast }: { showToast: (m: string) => void }) {
  const [rows, setRows] = useState<CompRow[]>([])
  const [editing, setEditing] = useState<CompRow | null>(null)
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState<Partial<CompRow>>({})

  async function load() { const r = await fetch('/api/admin/comparison'); setRows(await r.json()) }
  useEffect(() => { load() }, [])

  async function save() {
    if (editing) {
      await fetch(`/api/admin/comparison/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...editing, ...draft }) })
      showToast('Updated')
    } else {
      await fetch('/api/admin/comparison', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(draft) })
      showToast('Added')
    }
    setEditing(null); setAdding(false); setDraft({}); load()
  }

  async function del(id: number) {
    if (!confirm('Delete?')) return
    await fetch(`/api/admin/comparison/${id}`, { method: 'DELETE' })
    showToast('Deleted'); load()
  }

  function startEdit(row: CompRow) { setEditing(row); setDraft(row); setAdding(false) }
  function startAdd() { setAdding(true); setEditing(null); setDraft({ factor: '', manual: '', trueye: '', order: rows.length + 1 }) }
  function cancel() { setEditing(null); setAdding(false); setDraft({}) }
  const isOpen = editing || adding

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#F0F4FF] font-semibold">Comparison Table</h2>
        <button onClick={startAdd} className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00D4FF] text-black text-xs font-semibold rounded-full hover:scale-105 transition-all">
          <Plus size={13} /> Add Row
        </button>
      </div>

      {isOpen && (
        <div className="bg-[#0A1628] border border-[#00D4FF]/20 rounded-xl p-4 mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2"><label className="text-xs text-[#6B7FA3] mb-1 block">Factor</label>
              <input value={draft.factor ?? ''} onChange={(e) => setDraft({ ...draft, factor: e.target.value })} className={ic()} /></div>
            <div><label className="text-xs text-[#6B7FA3] mb-1 block">Manual Monitoring</label>
              <input value={draft.manual ?? ''} onChange={(e) => setDraft({ ...draft, manual: e.target.value })} className={ic()} /></div>
            <div><label className="text-xs text-[#6B7FA3] mb-1 block">TruEye</label>
              <input value={draft.trueye ?? ''} onChange={(e) => setDraft({ ...draft, trueye: e.target.value })} className={ic()} /></div>
            <div><label className="text-xs text-[#6B7FA3] mb-1 block">Order</label>
              <input type="number" value={draft.order ?? ''} onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })} className={ic()} /></div>
          </div>
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
              <th className="px-4 py-3">Factor</th>
              <th className="px-4 py-3">Manual</th>
              <th className="px-4 py-3">TruEye</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3 text-[#F0F4FF] font-medium text-xs">{row.factor}</td>
                <td className="px-4 py-3 text-[#6B7FA3] text-xs">{row.manual}</td>
                <td className="px-4 py-3 text-[#00D4FF] text-xs">{row.trueye}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => startEdit(row)} className="text-[#6B7FA3] hover:text-[#00D4FF] transition-colors"><Pencil size={13} /></button>
                    <button onClick={() => del(row.id)} className="text-[#6B7FA3] hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
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

export default function AdminCaseStudiesPage() {
  const [tab, setTab] = useState<Tab>('cases')
  const [toast, setToast] = useState('')

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  return (
    <div className="p-8">
      <Toast msg={toast} />
      <h1 className="font-bold text-2xl text-[#F0F4FF] mb-6">Case Studies</h1>
      <div className="flex gap-2 mb-6 border-b border-white/10 pb-4">
        {(['cases', 'comparison'] as Tab[]).map((key) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === key ? 'bg-[#00D4FF] text-black' : 'text-[#6B7FA3] hover:text-[#F0F4FF]'}`}>
            {key === 'cases' ? 'Case Studies' : 'Comparison Table'}
          </button>
        ))}
      </div>
      {tab === 'cases' && <CasesTab showToast={showToast} />}
      {tab === 'comparison' && <ComparisonTab showToast={showToast} />}
    </div>
  )
}
