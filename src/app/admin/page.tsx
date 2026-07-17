'use client'

import { useCallback, useState } from 'react'
import { compressImageFile } from '@/src/lib/image-compress'

type Tab =
  | 'dashboard'
  | 'projects'
  | 'services'
  | 'packages'
  | 'testimonials'
  | 'messages'

type Stats = {
  messagesTotal: number
  messagesWeek: number
  servicesPublished: number
  servicesTotal: number
  projectsPublished: number
  projectsFeatured: number
  projectsTotal: number
  testimonialsPublished: number
  packagesPublished: number
  recentMessages: {
    id: number
    name: string
    email: string
    subject: string
    created_at: string
  }[]
}

type Submission = {
  id: number
  name: string
  email: string
  phone: string | null
  subject: string
  budget: string | null
  message: string
  created_at: string
}

type Service = {
  id: number
  title: string
  description: string
  benefits: string[]
  deliverables: string[]
  pricing: string | null
  best_for: string | null
  flagship: boolean
  published: boolean
  sort_order: number
}

type Project = {
  id: number
  title: string
  client: string | null
  industry: string | null
  timeframe: string | null
  category: string | null
  image: string | null
  problem: string | null
  strategy: string | null
  execution: string | null
  metric1: string | null
  label1: string | null
  metric2: string | null
  label2: string | null
  metric3: string | null
  label3: string | null
  testimonial: string | null
  testimonial_author: string | null
  featured: boolean
  published: boolean
  sort_order: number
}

type Testimonial = {
  id: number
  name: string
  role: string | null
  company: string | null
  quote: string
  link: string | null
  rating: number
  published: boolean
  sort_order: number
}

type Package = {
  id: number
  title: string
  description: string
  includes: string[]
  best_for: string | null
  not_for: string | null
  pricing: string | null
  published: boolean
  sort_order: number
}

const emptyService = {
  title: '',
  description: '',
  benefits: '',
  deliverables: '',
  pricing: 'Custom Quote',
  best_for: '',
  flagship: false,
  published: true,
  sort_order: 0,
}

const emptyProject = {
  title: '',
  client: '',
  industry: '',
  timeframe: '',
  category: '',
  image: '',
  problem: '',
  strategy: '',
  execution: '',
  metric1: '',
  label1: '',
  metric2: '',
  label2: '',
  metric3: '',
  label3: '',
  testimonial: '',
  testimonial_author: '',
  featured: true,
  published: true,
  sort_order: 0,
}

const emptyTestimonial = {
  name: '',
  role: '',
  company: '',
  quote: '',
  link: '',
  rating: 5,
  published: true,
  sort_order: 0,
}

const emptyPackage = {
  title: '',
  description: '',
  includes: '',
  best_for: '',
  not_for: '',
  pricing: 'Custom Quote',
  published: true,
  sort_order: 0,
}

const inputClass = 'form-input text-sm'
const labelClass = 'block text-xs font-semibold text-muted-foreground mb-1'

export default function AdminPage() {
  const [secret, setSecret] = useState('')
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState<Tab>('dashboard')
  const [loading, setLoading] = useState(false)
  const [compressing, setCompressing] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const [stats, setStats] = useState<Stats | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [packages, setPackages] = useState<Package[]>([])

  const [serviceForm, setServiceForm] = useState(emptyService)
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null)
  const [projectForm, setProjectForm] = useState(emptyProject)
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null)
  const [testimonialForm, setTestimonialForm] = useState(emptyTestimonial)
  const [editingTestimonialId, setEditingTestimonialId] = useState<number | null>(null)
  const [packageForm, setPackageForm] = useState(emptyPackage)
  const [editingPackageId, setEditingPackageId] = useState<number | null>(null)

  const api = useCallback(
    async (path: string, options: RequestInit = {}) => {
      const res = await fetch(path, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${secret}`,
          ...(options.headers || {}),
        },
        credentials: 'include',
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Request failed')
      return data
    },
    [secret]
  )

  const refreshAll = async () => {
    setLoading(true)
    setError('')
    try {
      const [st, msg, svc, proj, tes, pkg] = await Promise.all([
        api('/api/admin/stats'),
        api('/api/admin/submissions'),
        api('/api/admin/services'),
        api('/api/admin/projects'),
        api('/api/admin/testimonials'),
        api('/api/admin/packages'),
      ])
      setStats(st.stats || null)
      setSubmissions(msg.submissions || [])
      setServices(svc.services || [])
      setProjects(proj.projects || [])
      setTestimonials(tes.testimonials || [])
      setPackages(pkg.packages || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  const login = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret }),
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      setAuthed(true)
      setNotice('Welcome back.')
      await refreshAll()
    } catch (err) {
      setAuthed(false)
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE', credentials: 'include' })
    setAuthed(false)
    setStats(null)
  }

  const moveProject = async (index: number, dir: -1 | 1) => {
    const next = index + dir
    if (next < 0 || next >= projects.length) return
    const ordered = [...projects]
    const tmp = ordered[index]
    ordered[index] = ordered[next]
    ordered[next] = tmp
    setProjects(ordered)
    try {
      await api('/api/admin/projects/reorder', {
        method: 'POST',
        body: JSON.stringify({ ids: ordered.map((p) => p.id) }),
      })
      setNotice('Project order saved.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reorder failed')
      await refreshAll()
    }
  }

  const moveService = async (index: number, dir: -1 | 1) => {
    const next = index + dir
    if (next < 0 || next >= services.length) return
    const ordered = [...services]
    const tmp = ordered[index]
    ordered[index] = ordered[next]
    ordered[next] = tmp
    setServices(ordered)
    try {
      await api('/api/admin/services/reorder', {
        method: 'POST',
        body: JSON.stringify({ ids: ordered.map((s) => s.id) }),
      })
      setNotice('Service order saved.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reorder failed')
      await refreshAll()
    }
  }

  const onImageFile = async (file: File | null) => {
    if (!file) return
    setCompressing(true)
    setError('')
    try {
      const dataUrl = await compressImageFile(file)
      setProjectForm((f) => ({ ...f, image: dataUrl }))
      const kb = Math.round((dataUrl.length * 0.75) / 1024)
      setNotice(`Image compressed (~${kb} KB). Click Save project.`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image error')
    } finally {
      setCompressing(false)
    }
  }

  const saveProject = async () => {
    setLoading(true)
    setError('')
    try {
      const payload = { ...projectForm, sort_order: Number(projectForm.sort_order) || 0 }
      if (editingProjectId) {
        await api(`/api/admin/projects/${editingProjectId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        })
        setNotice('Project updated. Live site will refresh on next visit.')
      } else {
        await api('/api/admin/projects', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
        setNotice('Project created.')
      }
      setProjectForm(emptyProject)
      setEditingProjectId(null)
      await refreshAll()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setLoading(false)
    }
  }

  const saveService = async () => {
    setLoading(true)
    setError('')
    try {
      const payload = {
        ...serviceForm,
        sort_order: Number(serviceForm.sort_order) || 0,
      }
      if (editingServiceId) {
        await api(`/api/admin/services/${editingServiceId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        })
      } else {
        await api('/api/admin/services', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
      }
      setServiceForm(emptyService)
      setEditingServiceId(null)
      setNotice('Service saved.')
      await refreshAll()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setLoading(false)
    }
  }

  const saveTestimonial = async () => {
    setLoading(true)
    setError('')
    try {
      if (editingTestimonialId) {
        await api(`/api/admin/testimonials/${editingTestimonialId}`, {
          method: 'PUT',
          body: JSON.stringify(testimonialForm),
        })
      } else {
        await api('/api/admin/testimonials', {
          method: 'POST',
          body: JSON.stringify(testimonialForm),
        })
      }
      setTestimonialForm(emptyTestimonial)
      setEditingTestimonialId(null)
      setNotice('Testimonial saved.')
      await refreshAll()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setLoading(false)
    }
  }

  const savePackage = async () => {
    setLoading(true)
    setError('')
    try {
      if (editingPackageId) {
        await api(`/api/admin/packages/${editingPackageId}`, {
          method: 'PUT',
          body: JSON.stringify(packageForm),
        })
      } else {
        await api('/api/admin/packages', {
          method: 'POST',
          body: JSON.stringify(packageForm),
        })
      }
      setPackageForm(emptyPackage)
      setEditingPackageId(null)
      setNotice('Package saved.')
      await refreshAll()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setLoading(false)
    }
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'packages', label: 'Packages' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'messages', label: 'Messages' },
  ]

  if (!authed) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container max-w-md">
          <div className="accent-line mb-6" />
          <h1 className="section-heading mb-2">Admin dashboard</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Enter <code className="text-accent">ADMIN_SECRET</code> to manage
            your site content.
          </p>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Admin secret"
            className={`${inputClass} mb-4`}
            onKeyDown={(e) => e.key === 'Enter' && login()}
          />
          <button
            type="button"
            onClick={login}
            disabled={loading || !secret}
            className="cta-button w-full disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
          {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="accent-line mb-3" />
            <h1 className="text-3xl font-display font-bold">Admin</h1>
            <p className="text-sm text-muted-foreground">
              Content CMS · mosesfolio.online
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-button !py-2 !px-4 text-sm"
            >
              View live site
            </a>
            <button type="button" onClick={refreshAll} className="secondary-button !py-2 !px-4 text-sm" disabled={loading}>
              Refresh
            </button>
            <button type="button" onClick={logout} className="secondary-button !py-2 !px-4 text-sm">
              Log out
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                tab === t.id
                  ? 'bg-accent text-accent-foreground border-accent'
                  : 'border-border text-muted-foreground hover:border-accent'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-4 p-3 bg-card border border-border rounded-lg">
            {error}
          </p>
        )}
        {notice && (
          <p className="text-accent text-sm mb-4 p-3 bg-card border border-border rounded-lg">
            {notice}
          </p>
        )}
        {compressing && (
          <p className="text-muted-foreground text-sm mb-4">Compressing image…</p>
        )}

        {/* DASHBOARD */}
        {tab === 'dashboard' && stats && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Messages (7 days)', value: stats.messagesWeek },
                { label: 'Messages total', value: stats.messagesTotal },
                { label: 'Projects live', value: stats.projectsPublished },
                { label: 'Featured projects', value: stats.projectsFeatured },
                { label: 'Services live', value: stats.servicesPublished },
                { label: 'Packages live', value: stats.packagesPublished },
                { label: 'Testimonials live', value: stats.testimonialsPublished },
                {
                  label: 'Draft projects',
                  value: Math.max(0, stats.projectsTotal - stats.projectsPublished),
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className="p-5 bg-card border border-border rounded-xl"
                >
                  <p className="text-3xl font-display font-bold text-accent">
                    {card.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{card.label}</p>
                </div>
              ))}
            </div>

            <section className="p-6 bg-card border border-border rounded-xl">
              <h2 className="font-semibold mb-4">Recent messages</h2>
              {stats.recentMessages?.length ? (
                <ul className="space-y-3">
                  {stats.recentMessages.map((m) => (
                    <li
                      key={m.id}
                      className="flex flex-col sm:flex-row sm:justify-between gap-1 text-sm border-b border-border pb-3"
                    >
                      <span>
                        <strong>{m.name}</strong> · {m.subject}
                        <span className="text-muted-foreground"> · {m.email}</span>
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(m.created_at).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No messages yet.</p>
              )}
              <button
                type="button"
                className="text-accent text-sm font-semibold mt-4"
                onClick={() => setTab('messages')}
              >
                View all messages →
              </button>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button type="button" onClick={() => setTab('projects')} className="p-5 bg-card border border-border rounded-xl text-left hover:border-accent">
                <p className="font-semibold">+ Add project</p>
                <p className="text-xs text-muted-foreground mt-1">Case study with image</p>
              </button>
              <button type="button" onClick={() => setTab('services')} className="p-5 bg-card border border-border rounded-xl text-left hover:border-accent">
                <p className="font-semibold">+ Add service</p>
                <p className="text-xs text-muted-foreground mt-1">Shown on /services</p>
              </button>
              <button type="button" onClick={() => setTab('testimonials')} className="p-5 bg-card border border-border rounded-xl text-left hover:border-accent">
                <p className="font-semibold">+ Add testimonial</p>
                <p className="text-xs text-muted-foreground mt-1">Social proof quotes</p>
              </button>
            </section>
          </div>
        )}

        {/* PROJECTS */}
        {tab === 'projects' && (
          <div className="space-y-8">
            <section className="p-6 bg-card border border-border rounded-xl">
              <h2 className="text-xl font-semibold mb-4">
                {editingProjectId ? 'Edit project' : 'Add project'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Title *</label>
                  <input className={inputClass} value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Category</label>
                  <input className={inputClass} value={projectForm.category} onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Client</label>
                  <input className={inputClass} value={projectForm.client} onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Industry</label>
                  <input className={inputClass} value={projectForm.industry} onChange={(e) => setProjectForm({ ...projectForm, industry: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Timeframe</label>
                  <input className={inputClass} value={projectForm.timeframe} onChange={(e) => setProjectForm({ ...projectForm, timeframe: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Image URL (optional if uploading)</label>
                  <input className={inputClass} value={projectForm.image.startsWith('data:') ? '' : projectForm.image} onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })} placeholder="https://..." />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Upload image (auto-compressed)</label>
                  <input type="file" accept="image/*" className="text-sm" onChange={(e) => onImageFile(e.target.files?.[0] || null)} />
                  {projectForm.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={projectForm.image} alt="" className="mt-2 h-36 object-cover rounded-lg border border-border" />
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Challenge</label>
                  <textarea className={`${inputClass} min-h-[70px]`} value={projectForm.problem} onChange={(e) => setProjectForm({ ...projectForm, problem: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Strategy</label>
                  <textarea className={`${inputClass} min-h-[70px]`} value={projectForm.strategy} onChange={(e) => setProjectForm({ ...projectForm, strategy: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Execution</label>
                  <textarea className={`${inputClass} min-h-[70px]`} value={projectForm.execution} onChange={(e) => setProjectForm({ ...projectForm, execution: e.target.value })} />
                </div>
                {(['1', '2', '3'] as const).map((n) => (
                  <div key={n} className="contents">
                    <div>
                      <label className={labelClass}>Metric {n}</label>
                      <input className={inputClass} value={(projectForm as any)[`metric${n}`]} onChange={(e) => setProjectForm({ ...projectForm, [`metric${n}`]: e.target.value } as any)} />
                    </div>
                    <div>
                      <label className={labelClass}>Label {n}</label>
                      <input className={inputClass} value={(projectForm as any)[`label${n}`]} onChange={(e) => setProjectForm({ ...projectForm, [`label${n}`]: e.target.value } as any)} />
                    </div>
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className={labelClass}>Testimonial</label>
                  <textarea className={`${inputClass} min-h-[60px]`} value={projectForm.testimonial} onChange={(e) => setProjectForm({ ...projectForm, testimonial: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Testimonial author</label>
                  <input className={inputClass} value={projectForm.testimonial_author} onChange={(e) => setProjectForm({ ...projectForm, testimonial_author: e.target.value })} />
                </div>
                <div className="flex gap-4 md:col-span-2 text-sm">
                  <label className="flex gap-2 items-center">
                    <input type="checkbox" checked={projectForm.featured} onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })} />
                    Featured (homepage)
                  </label>
                  <label className="flex gap-2 items-center">
                    <input type="checkbox" checked={projectForm.published} onChange={(e) => setProjectForm({ ...projectForm, published: e.target.checked })} />
                    Published
                  </label>
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button type="button" onClick={saveProject} disabled={loading || !projectForm.title} className="cta-button !py-2 !px-4 text-sm disabled:opacity-50">
                  {editingProjectId ? 'Update' : 'Save'} project
                </button>
                {editingProjectId && (
                  <button type="button" className="secondary-button !py-2 !px-4 text-sm" onClick={() => { setEditingProjectId(null); setProjectForm(emptyProject) }}>
                    Cancel
                  </button>
                )}
              </div>
            </section>

            <section>
              <h2 className="font-semibold mb-3">Order (↑ ↓) · {projects.length} projects</h2>
              <div className="space-y-2">
                {projects.map((p, i) => (
                  <div key={p.id} className="p-3 bg-card border border-border rounded-xl flex flex-wrap items-center gap-3">
                    <div className="flex flex-col gap-1">
                      <button type="button" className="text-xs px-2 py-1 border border-border rounded hover:border-accent" onClick={() => moveProject(i, -1)} disabled={i === 0}>↑</button>
                      <button type="button" className="text-xs px-2 py-1 border border-border rounded hover:border-accent" onClick={() => moveProject(i, 1)} disabled={i === projects.length - 1}>↓</button>
                    </div>
                    {p.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt="" className="w-16 h-12 object-cover rounded" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{p.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {p.published ? 'Live' : 'Draft'}
                        {p.featured ? ' · Featured' : ''}
                      </p>
                    </div>
                    <button type="button" className="text-accent text-sm font-semibold" onClick={() => {
                      setEditingProjectId(p.id)
                      setProjectForm({
                        title: p.title,
                        client: p.client || '',
                        industry: p.industry || '',
                        timeframe: p.timeframe || '',
                        category: p.category || '',
                        image: p.image || '',
                        problem: p.problem || '',
                        strategy: p.strategy || '',
                        execution: p.execution || '',
                        metric1: p.metric1 || '',
                        label1: p.label1 || '',
                        metric2: p.metric2 || '',
                        label2: p.label2 || '',
                        metric3: p.metric3 || '',
                        label3: p.label3 || '',
                        testimonial: p.testimonial || '',
                        testimonial_author: p.testimonial_author || '',
                        featured: p.featured,
                        published: p.published,
                        sort_order: p.sort_order,
                      })
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}>Edit</button>
                    <button type="button" className="text-red-400 text-sm font-semibold" onClick={async () => {
                      if (!confirm('Delete project?')) return
                      await api(`/api/admin/projects/${p.id}`, { method: 'DELETE' })
                      await refreshAll()
                    }}>Delete</button>
                  </div>
                ))}
                {!projects.length && <p className="text-sm text-muted-foreground">No DB projects yet — site uses defaults until you add some.</p>}
              </div>
            </section>
          </div>
        )}

        {/* SERVICES */}
        {tab === 'services' && (
          <div className="space-y-8">
            <section className="p-6 bg-card border border-border rounded-xl">
              <h2 className="text-xl font-semibold mb-4">{editingServiceId ? 'Edit service' : 'Add service'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <label className={labelClass}>Title *</label>
                  <input className={inputClass} value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Description</label>
                  <textarea className={`${inputClass} min-h-[70px]`} value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Benefits (one per line)</label>
                  <textarea className={`${inputClass} min-h-[90px]`} value={serviceForm.benefits} onChange={(e) => setServiceForm({ ...serviceForm, benefits: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Deliverables (one per line)</label>
                  <textarea className={`${inputClass} min-h-[90px]`} value={serviceForm.deliverables} onChange={(e) => setServiceForm({ ...serviceForm, deliverables: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Pricing</label>
                  <input className={inputClass} value={serviceForm.pricing} onChange={(e) => setServiceForm({ ...serviceForm, pricing: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Best for</label>
                  <input className={inputClass} value={serviceForm.best_for} onChange={(e) => setServiceForm({ ...serviceForm, best_for: e.target.value })} />
                </div>
                <div className="flex gap-4 text-sm md:col-span-2">
                  <label className="flex gap-2 items-center"><input type="checkbox" checked={serviceForm.flagship} onChange={(e) => setServiceForm({ ...serviceForm, flagship: e.target.checked })} />Flagship</label>
                  <label className="flex gap-2 items-center"><input type="checkbox" checked={serviceForm.published} onChange={(e) => setServiceForm({ ...serviceForm, published: e.target.checked })} />Published</label>
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button type="button" onClick={saveService} disabled={!serviceForm.title || loading} className="cta-button !py-2 !px-4 text-sm">Save service</button>
                {editingServiceId && <button type="button" className="secondary-button !py-2 !px-4 text-sm" onClick={() => { setEditingServiceId(null); setServiceForm(emptyService) }}>Cancel</button>}
              </div>
            </section>
            <section className="space-y-2">
              <h2 className="font-semibold">Order · {services.length}</h2>
              {services.map((s, i) => (
                <div key={s.id} className="p-3 bg-card border border-border rounded-xl flex items-center gap-3">
                  <div className="flex flex-col gap-1">
                    <button type="button" className="text-xs px-2 py-1 border border-border rounded" onClick={() => moveService(i, -1)} disabled={i === 0}>↑</button>
                    <button type="button" className="text-xs px-2 py-1 border border-border rounded" onClick={() => moveService(i, 1)} disabled={i === services.length - 1}>↓</button>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.published ? 'Live' : 'Draft'}{s.flagship ? ' · Flagship' : ''}</p>
                  </div>
                  <button type="button" className="text-accent text-sm font-semibold" onClick={() => {
                    setEditingServiceId(s.id)
                    setServiceForm({
                      title: s.title,
                      description: s.description,
                      benefits: (s.benefits || []).join('\n'),
                      deliverables: (s.deliverables || []).join('\n'),
                      pricing: s.pricing || '',
                      best_for: s.best_for || '',
                      flagship: s.flagship,
                      published: s.published,
                      sort_order: s.sort_order,
                    })
                  }}>Edit</button>
                  <button type="button" className="text-red-400 text-sm font-semibold" onClick={async () => {
                    if (!confirm('Delete?')) return
                    await api(`/api/admin/services/${s.id}`, { method: 'DELETE' })
                    await refreshAll()
                  }}>Delete</button>
                </div>
              ))}
            </section>
          </div>
        )}

        {/* PACKAGES */}
        {tab === 'packages' && (
          <div className="space-y-8">
            <section className="p-6 bg-card border border-border rounded-xl">
              <h2 className="text-xl font-semibold mb-4">{editingPackageId ? 'Edit package' : 'Add package'}</h2>
              <p className="text-xs text-muted-foreground mb-4">These appear in the packages section on /services.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <label className={labelClass}>Title *</label>
                  <input className={inputClass} value={packageForm.title} onChange={(e) => setPackageForm({ ...packageForm, title: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Description</label>
                  <textarea className={`${inputClass} min-h-[70px]`} value={packageForm.description} onChange={(e) => setPackageForm({ ...packageForm, description: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Includes (one per line)</label>
                  <textarea className={`${inputClass} min-h-[80px]`} value={packageForm.includes} onChange={(e) => setPackageForm({ ...packageForm, includes: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Best for</label>
                  <input className={inputClass} value={packageForm.best_for} onChange={(e) => setPackageForm({ ...packageForm, best_for: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Not for</label>
                  <input className={inputClass} value={packageForm.not_for} onChange={(e) => setPackageForm({ ...packageForm, not_for: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Pricing</label>
                  <input className={inputClass} value={packageForm.pricing} onChange={(e) => setPackageForm({ ...packageForm, pricing: e.target.value })} />
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <label className="flex gap-2 items-center"><input type="checkbox" checked={packageForm.published} onChange={(e) => setPackageForm({ ...packageForm, published: e.target.checked })} />Published</label>
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button type="button" onClick={savePackage} disabled={!packageForm.title || loading} className="cta-button !py-2 !px-4 text-sm">Save package</button>
                {editingPackageId && <button type="button" className="secondary-button !py-2 !px-4 text-sm" onClick={() => { setEditingPackageId(null); setPackageForm(emptyPackage) }}>Cancel</button>}
              </div>
            </section>
            <section className="space-y-2">
              {packages.map((p) => (
                <div key={p.id} className="p-4 bg-card border border-border rounded-xl flex justify-between gap-3">
                  <div>
                    <p className="font-semibold">{p.title}</p>
                    <p className="text-xs text-muted-foreground">{p.pricing} · {p.published ? 'Live' : 'Draft'}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" className="text-accent text-sm font-semibold" onClick={() => {
                      setEditingPackageId(p.id)
                      setPackageForm({
                        title: p.title,
                        description: p.description,
                        includes: (p.includes || []).join('\n'),
                        best_for: p.best_for || '',
                        not_for: p.not_for || '',
                        pricing: p.pricing || '',
                        published: p.published,
                        sort_order: p.sort_order,
                      })
                    }}>Edit</button>
                    <button type="button" className="text-red-400 text-sm font-semibold" onClick={async () => {
                      if (!confirm('Delete package?')) return
                      await api(`/api/admin/packages/${p.id}`, { method: 'DELETE' })
                      await refreshAll()
                    }}>Delete</button>
                  </div>
                </div>
              ))}
              {!packages.length && <p className="text-sm text-muted-foreground">No packages in DB — site shows default packages.</p>}
            </section>
          </div>
        )}

        {/* TESTIMONIALS */}
        {tab === 'testimonials' && (
          <div className="space-y-8">
            <section className="p-6 bg-card border border-border rounded-xl">
              <h2 className="text-xl font-semibold mb-4">{editingTestimonialId ? 'Edit testimonial' : 'Add testimonial'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Name *</label>
                  <input className={inputClass} value={testimonialForm.name} onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Role</label>
                  <input className={inputClass} value={testimonialForm.role} onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Company</label>
                  <input className={inputClass} value={testimonialForm.company} onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Link</label>
                  <input className={inputClass} value={testimonialForm.link} onChange={(e) => setTestimonialForm({ ...testimonialForm, link: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Quote *</label>
                  <textarea className={`${inputClass} min-h-[90px]`} value={testimonialForm.quote} onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Rating (1–5)</label>
                  <input type="number" min={1} max={5} className={inputClass} value={testimonialForm.rating} onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) || 5 })} />
                </div>
                <div className="flex items-center text-sm">
                  <label className="flex gap-2 items-center"><input type="checkbox" checked={testimonialForm.published} onChange={(e) => setTestimonialForm({ ...testimonialForm, published: e.target.checked })} />Published</label>
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button type="button" onClick={saveTestimonial} disabled={!testimonialForm.name || !testimonialForm.quote || loading} className="cta-button !py-2 !px-4 text-sm">Save testimonial</button>
                {editingTestimonialId && <button type="button" className="secondary-button !py-2 !px-4 text-sm" onClick={() => { setEditingTestimonialId(null); setTestimonialForm(emptyTestimonial) }}>Cancel</button>}
              </div>
            </section>
            <section className="space-y-2">
              {testimonials.map((t) => (
                <div key={t.id} className="p-4 bg-card border border-border rounded-xl">
                  <p className="text-sm italic text-muted-foreground mb-2">&ldquo;{t.quote.slice(0, 140)}{t.quote.length > 140 ? '…' : ''}&rdquo;</p>
                  <div className="flex justify-between gap-2">
                    <p className="text-sm font-semibold">{t.name}{t.company ? ` · ${t.company}` : ''}</p>
                    <div className="flex gap-2">
                      <button type="button" className="text-accent text-sm font-semibold" onClick={() => {
                        setEditingTestimonialId(t.id)
                        setTestimonialForm({
                          name: t.name,
                          role: t.role || '',
                          company: t.company || '',
                          quote: t.quote,
                          link: t.link || '',
                          rating: t.rating,
                          published: t.published,
                          sort_order: t.sort_order,
                        })
                      }}>Edit</button>
                      <button type="button" className="text-red-400 text-sm font-semibold" onClick={async () => {
                        if (!confirm('Delete?')) return
                        await api(`/api/admin/testimonials/${t.id}`, { method: 'DELETE' })
                        await refreshAll()
                      }}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
              {!testimonials.length && <p className="text-sm text-muted-foreground">No testimonials in DB — site shows defaults.</p>}
            </section>
          </div>
        )}

        {/* MESSAGES */}
        {tab === 'messages' && (
          <div className="space-y-4">
            <h2 className="font-semibold">Messages ({submissions.length})</h2>
            {submissions.map((s) => (
              <article key={s.id} className="p-5 bg-card border border-border rounded-xl">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-2">
                  <div>
                    <p className="font-semibold">{s.name}</p>
                    <a href={`mailto:${s.email}`} className="text-accent text-sm">{s.email}</a>
                    {s.phone && <p className="text-sm text-muted-foreground">{s.phone}</p>}
                  </div>
                  <time className="text-xs text-muted-foreground">{new Date(s.created_at).toLocaleString()}</time>
                </div>
                <p className="text-sm text-accent font-medium mb-2">{s.subject}{s.budget ? ` · ${s.budget}` : ''}</p>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{s.message}</p>
              </article>
            ))}
            {!submissions.length && <p className="text-sm text-muted-foreground">No messages yet.</p>}
          </div>
        )}
      </div>
    </div>
  )
}
