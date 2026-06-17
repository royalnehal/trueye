'use client'

import { useEffect, useState } from 'react'
import { Plus, Trash2, Check, ChevronDown, ChevronUp } from 'lucide-react'

type Section = 'nav' | 'footer'

interface NavDropdown { id?: number; label: string; href: string; order: number }
interface NavLink { id?: number; label: string; href: string; order: number; dropdown: NavDropdown[] }
interface FooterLink { id?: number; column: string; label: string; href: string; external: boolean; order: number }

function Toast({ msg }: { msg: string }) {
  if (!msg) return null
  return <div className="fixed top-4 right-4 z-50 px-4 py-3 bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] text-sm rounded-lg shadow-lg">{msg}</div>
}

const ic = 'w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[#F0F4FF] text-sm focus:outline-none focus:border-[#00D4FF]/50 transition-colors'

function NavSection({ showToast }: { showToast: (m: string) => void }) {
  const [links, setLinks] = useState<NavLink[]>([])
  const [expanded, setExpanded] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)

  async function load() { const r = await fetch('/api/admin/navigation'); setLinks(await r.json()) }
  useEffect(() => { load() }, [])

  function updateLink(idx: number, field: keyof NavLink, value: string | number | NavDropdown[]) {
    setLinks((prev) => prev.map((l, i) => i === idx ? { ...l, [field]: value } : l))
  }

  function addDropdown(linkIdx: number) {
    const link = links[linkIdx]
    const newDropdown = [...link.dropdown, { label: '', href: '', order: link.dropdown.length + 1 }]
    updateLink(linkIdx, 'dropdown', newDropdown)
  }

  function updateDropdown(linkIdx: number, dIdx: number, field: keyof NavDropdown, value: string | number) {
    const link = links[linkIdx]
    const newDropdown = link.dropdown.map((d, i) => i === dIdx ? { ...d, [field]: value } : d)
    updateLink(linkIdx, 'dropdown', newDropdown)
  }

  function removeDropdown(linkIdx: number, dIdx: number) {
    const link = links[linkIdx]
    updateLink(linkIdx, 'dropdown', link.dropdown.filter((_, i) => i !== dIdx))
  }

  function addLink() {
    setLinks((prev) => [...prev, { label: '', href: '', order: prev.length + 1, dropdown: [] }])
  }

  function removeLink(idx: number) {
    setLinks((prev) => prev.filter((_, i) => i !== idx))
  }

  async function saveAll() {
    setSaving(true)
    // Delete all existing nav links first, then recreate
    const existing = links.filter((l) => l.id)
    const newLinks = links.filter((l) => !l.id)

    for (const l of existing) {
      await fetch('/api/admin/navigation', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ links: [l] }) })
    }
    for (const l of newLinks) {
      await fetch('/api/admin/navigation', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(l) })
    }
    setSaving(false)
    showToast('Navigation saved')
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#F0F4FF] font-semibold">Main Navigation</h2>
        <div className="flex gap-2">
          <button onClick={addLink} className="inline-flex items-center gap-1.5 px-3 py-2 border border-white/10 text-[#6B7FA3] text-xs rounded-full hover:text-[#F0F4FF]">
            <Plus size={13} /> Add Link
          </button>
          <button onClick={saveAll} disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00D4FF] text-black text-xs font-semibold rounded-full hover:scale-105 transition-all disabled:opacity-60">
            <Check size={13} /> {saving ? 'Saving...' : 'Save All'}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {links.map((link, idx) => (
          <div key={idx} className="bg-[#0D1F3C] border border-white/5 rounded-xl overflow-hidden">
            <div className="flex items-center gap-3 p-3">
              <input value={link.label} onChange={(e) => updateLink(idx, 'label', e.target.value)}
                placeholder="Label" className={`${ic} flex-1`} />
              <input value={link.href} onChange={(e) => updateLink(idx, 'href', e.target.value)}
                placeholder="/path" className={`${ic} flex-1`} />
              <input type="number" value={link.order} onChange={(e) => updateLink(idx, 'order', Number(e.target.value))}
                className={`${ic} w-16`} />
              <button onClick={() => setExpanded(expanded === idx ? null : idx)} className="text-[#6B7FA3] hover:text-[#00D4FF] transition-colors shrink-0">
                {expanded === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              <button onClick={() => removeLink(idx)} className="text-[#6B7FA3] hover:text-red-400 transition-colors shrink-0">
                <Trash2 size={14} />
              </button>
            </div>

            {expanded === idx && (
              <div className="border-t border-white/5 p-3 bg-white/2 space-y-2">
                <p className="text-xs text-[#6B7FA3] mb-2">Dropdown items:</p>
                {link.dropdown.map((d, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2">
                    <input value={d.label} onChange={(e) => updateDropdown(idx, dIdx, 'label', e.target.value)}
                      placeholder="Label" className={`${ic} flex-1`} />
                    <input value={d.href} onChange={(e) => updateDropdown(idx, dIdx, 'href', e.target.value)}
                      placeholder="/path" className={`${ic} flex-1`} />
                    <button onClick={() => removeDropdown(idx, dIdx)} className="text-[#6B7FA3] hover:text-red-400 transition-colors shrink-0">
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
                <button onClick={() => addDropdown(idx)} className="inline-flex items-center gap-1 text-xs text-[#00D4FF]/70 hover:text-[#00D4FF] transition-colors mt-2">
                  <Plus size={12} /> Add dropdown item
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function FooterSection({ showToast }: { showToast: (m: string) => void }) {
  const [links, setLinks] = useState<FooterLink[]>([])
  const [saving, setSaving] = useState(false)

  async function load() { const r = await fetch('/api/admin/footer'); setLinks(await r.json()) }
  useEffect(() => { load() }, [])

  function update(idx: number, field: keyof FooterLink, value: string | boolean | number) {
    setLinks((prev) => prev.map((l, i) => i === idx ? { ...l, [field]: value } : l))
  }

  function addLink(column: string) {
    setLinks((prev) => [...prev, { column, label: '', href: '', external: false, order: prev.filter((l) => l.column === column).length + 1 }])
  }

  function remove(idx: number) { setLinks((prev) => prev.filter((_, i) => i !== idx)) }

  async function saveAll() {
    setSaving(true)
    await fetch('/api/admin/footer', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ links }) })
    setSaving(false)
    showToast('Footer saved')
    load()
  }

  const columns = ['solution', 'resources', 'company']
  const colLabels: Record<string, string> = { solution: 'Solution', resources: 'Resources', company: 'Company' }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#F0F4FF] font-semibold">Footer Links</h2>
        <button onClick={saveAll} disabled={saving}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00D4FF] text-black text-xs font-semibold rounded-full hover:scale-105 transition-all disabled:opacity-60">
          <Check size={13} /> {saving ? 'Saving...' : 'Save All'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => (
          <div key={col} className="bg-[#0D1F3C] border border-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[#F0F4FF] text-sm font-semibold">{colLabels[col]}</h3>
              <button onClick={() => addLink(col)} className="text-[#6B7FA3] hover:text-[#00D4FF] transition-colors"><Plus size={14} /></button>
            </div>
            <div className="space-y-2">
              {links.filter((l) => l.column === col).map((link, idx) => {
                const globalIdx = links.indexOf(link)
                return (
                  <div key={idx} className="space-y-1.5 pb-2 border-b border-white/5 last:border-0">
                    <input value={link.label} onChange={(e) => update(globalIdx, 'label', e.target.value)}
                      placeholder="Label" className={ic} />
                    <input value={link.href} onChange={(e) => update(globalIdx, 'href', e.target.value)}
                      placeholder="/path or https://" className={ic} />
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-1.5 text-xs text-[#6B7FA3] cursor-pointer">
                        <input type="checkbox" checked={link.external} onChange={(e) => update(globalIdx, 'external', e.target.checked)} className="accent-[#00D4FF]" />
                        External link
                      </label>
                      <button onClick={() => remove(globalIdx)} className="text-[#6B7FA3] hover:text-red-400 transition-colors"><Trash2 size={12} /></button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AdminNavigationPage() {
  const [section, setSection] = useState<Section>('nav')
  const [toast, setToast] = useState('')

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  return (
    <div className="p-8">
      <Toast msg={toast} />
      <h1 className="font-bold text-2xl text-[#F0F4FF] mb-6">Navigation</h1>
      <div className="flex gap-2 mb-6 border-b border-white/10 pb-4">
        {(['nav', 'footer'] as Section[]).map((key) => (
          <button key={key} onClick={() => setSection(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${section === key ? 'bg-[#00D4FF] text-black' : 'text-[#6B7FA3] hover:text-[#F0F4FF]'}`}>
            {key === 'nav' ? 'Main Navigation' : 'Footer Links'}
          </button>
        ))}
      </div>
      {section === 'nav' && <NavSection showToast={showToast} />}
      {section === 'footer' && <FooterSection showToast={showToast} />}
    </div>
  )
}
