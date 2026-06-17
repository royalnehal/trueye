'use client'

import { useEffect, useState } from 'react'
import { Check, Plus, Pencil, Trash2, X } from 'lucide-react'

type Section = 'brand' | 'offices'

interface Office { id: number; city: string; country: string; address: string; phone: string; email: string; order: number }

function Toast({ msg }: { msg: string }) {
  if (!msg) return null
  return <div className="fixed top-4 right-4 z-50 px-4 py-3 bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] text-sm rounded-lg shadow-lg">{msg}</div>
}

const ic = 'w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[#F0F4FF] text-sm focus:outline-none focus:border-[#00D4FF]/50 transition-colors'
const labelCls = 'block text-xs font-medium text-[#6B7FA3] mb-1'

function BrandSection({ showToast }: { showToast: (m: string) => void }) {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  async function load() { const r = await fetch('/api/admin/settings'); setSettings(await r.json()) }
  useEffect(() => { load() }, [])

  function update(key: string, value: string) { setSettings((prev) => ({ ...prev, [key]: value })) }

  async function save() {
    setSaving(true)
    await fetch('/api/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) })
    setSaving(false)
    showToast('Settings saved')
  }

  const FIELDS = [
    { key: 'brand_name', label: 'Brand Name' },
    { key: 'brand_parent', label: 'Parent Company' },
    { key: 'brand_tagline', label: 'Tagline' },
    { key: 'brand_subtagline', label: 'Sub-tagline' },
    { key: 'email_sales', label: 'Sales Email' },
    { key: 'email_general', label: 'General Email' },
    { key: 'phone_primary', label: 'Primary Phone' },
    { key: 'phone_sales', label: 'Sales Phone' },
    { key: 'phone_general', label: 'General Phone' },
    { key: 'social_linkedin', label: 'LinkedIn URL' },
    { key: 'social_instagram', label: 'Instagram URL' },
    { key: 'social_facebook', label: 'Facebook URL' },
    { key: 'social_twitter', label: 'Twitter/X URL' },
    { key: 'social_youtube', label: 'YouTube URL' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#F0F4FF] font-semibold">Brand & Contact</h2>
        <button onClick={save} disabled={saving}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#00D4FF] text-black text-sm font-semibold rounded-full hover:scale-105 transition-all disabled:opacity-60">
          <Check size={14} /> {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="bg-[#0D1F3C] border border-white/5 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {FIELDS.map(({ key, label }) => (
          <div key={key}>
            <label className={labelCls}>{label}</label>
            <input value={settings[key] ?? ''} onChange={(e) => update(key, e.target.value)} className={ic} />
          </div>
        ))}
        <div className="md:col-span-2">
          <label className={labelCls}>Geo Entity Paragraph (for SEO)</label>
          <textarea value={settings.geo_entity_paragraph ?? ''} onChange={(e) => update('geo_entity_paragraph', e.target.value)} rows={4} className={ic} />
        </div>
      </div>
    </div>
  )
}

function OfficesSection({ showToast }: { showToast: (m: string) => void }) {
  const [offices, setOffices] = useState<Office[]>([])
  const [editing, setEditing] = useState<Office | null>(null)
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState<Partial<Office>>({})

  async function load() { const r = await fetch('/api/admin/offices'); setOffices(await r.json()) }
  useEffect(() => { load() }, [])

  async function save() {
    if (editing) {
      await fetch(`/api/admin/offices/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...editing, ...draft }) })
      showToast('Office updated')
    } else {
      await fetch('/api/admin/offices', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...draft, order: offices.length + 1 }) })
      showToast('Office added')
    }
    setEditing(null); setAdding(false); setDraft({}); load()
  }

  async function del(id: number) {
    if (!confirm('Delete this office?')) return
    await fetch(`/api/admin/offices/${id}`, { method: 'DELETE' })
    showToast('Deleted'); load()
  }

  function startEdit(o: Office) { setEditing(o); setDraft(o); setAdding(false) }
  function startAdd() { setAdding(true); setEditing(null); setDraft({ city: '', country: '', address: '', phone: '', email: '' }) }
  function cancel() { setEditing(null); setAdding(false); setDraft({}) }
  const isOpen = editing || adding

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#F0F4FF] font-semibold">Global Offices</h2>
        <button onClick={startAdd} className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00D4FF] text-black text-xs font-semibold rounded-full hover:scale-105 transition-all">
          <Plus size={13} /> Add Office
        </button>
      </div>

      {isOpen && (
        <div className="bg-[#0A1628] border border-[#00D4FF]/20 rounded-xl p-4 mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><label className={labelCls}>City</label><input value={draft.city ?? ''} onChange={(e) => setDraft({ ...draft, city: e.target.value })} className={ic} /></div>
            <div><label className={labelCls}>Country</label><input value={draft.country ?? ''} onChange={(e) => setDraft({ ...draft, country: e.target.value })} className={ic} /></div>
            <div className="col-span-2"><label className={labelCls}>Address</label><input value={draft.address ?? ''} onChange={(e) => setDraft({ ...draft, address: e.target.value })} className={ic} /></div>
            <div><label className={labelCls}>Phone</label><input value={draft.phone ?? ''} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} className={ic} /></div>
            <div><label className={labelCls}>Email</label><input value={draft.email ?? ''} onChange={(e) => setDraft({ ...draft, email: e.target.value })} className={ic} /></div>
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
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3 hidden md:table-cell">Email</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offices.map((office) => (
              <tr key={office.id} className="border-b border-white/5 last:border-0 hover:bg-white/2">
                <td className="px-4 py-3 text-[#F0F4FF] font-medium">{office.city}</td>
                <td className="px-4 py-3 text-[#6B7FA3]">{office.country}</td>
                <td className="px-4 py-3 text-[#6B7FA3] hidden md:table-cell text-xs">{office.email}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => startEdit(office)} className="text-[#6B7FA3] hover:text-[#00D4FF] transition-colors"><Pencil size={14} /></button>
                    <button onClick={() => del(office.id)} className="text-[#6B7FA3] hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
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

export default function AdminSettingsPage() {
  const [section, setSection] = useState<Section>('brand')
  const [toast, setToast] = useState('')

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  return (
    <div className="p-8">
      <Toast msg={toast} />
      <h1 className="font-bold text-2xl text-[#F0F4FF] mb-6">Site Settings</h1>
      <div className="flex gap-2 mb-6 border-b border-white/10 pb-4">
        {(['brand', 'offices'] as Section[]).map((key) => (
          <button key={key} onClick={() => setSection(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${section === key ? 'bg-[#00D4FF] text-black' : 'text-[#6B7FA3] hover:text-[#F0F4FF]'}`}>
            {key === 'brand' ? 'Brand & Contact' : 'Global Offices'}
          </button>
        ))}
      </div>
      {section === 'brand' && <BrandSection showToast={showToast} />}
      {section === 'offices' && <OfficesSection showToast={showToast} />}
    </div>
  )
}
