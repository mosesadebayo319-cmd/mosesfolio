'use client'

import { useCallback, useState } from 'react'

type Tab = 'messages' | 'services' | 'projects'

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
  slug: string
  sort_order: number
  published: boolean
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
  slug: string
  featured: boolean
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

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > 1.4 * 1024 * 1024) {
      reject(new Error('Image must be under 1.4MB. Compress it or use an image URL.'))
      return
    }
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('Failed to read image'))
    reader.readAsDataURL(file)
  })
}

export default function AdminPage() {
  const [secret, setSecret] = useState('')
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState<Tab>('projects')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [projects, setProjects] = useState<Project[]>([])

  const [serviceForm, setServiceForm] = useState(emptyService)
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null)

  const [projectForm, setProjectForm] = useState(emptyProject)
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null)

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

  const login = async () => {
    setLoading(true)
    setError('')
    setNotice('')
    try {
      await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret }),
        credentials: 'include',
      }).then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Login failed')
      })
      setAuthed(true)
      setNotice('Logged in. Load a tab to manage content.')
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
    setSubmissions([])
    setServices([])
    setProjects([])
    setNotice('Logged out.')
  }

  const refreshAll = async () => {
    setLoading(true)
    setError('')
    try {
      const [msg, svc, proj] = await Promise.all([
        api('/api/admin/submissions'),
        api('/api/admin/services'),
        api('/api/admin/projects'),
      ])
      setSubmissions(msg.submissions || [])
      setServices(svc.services || [])
      setProjects(proj.projects || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  const saveService = async () => {
    setLoading(true)
    setError('')
    setNotice('')
    try {
      const payload = {
        title: serviceForm.title,
        description: serviceForm.description,
        benefits: serviceForm.benefits,
        deliverables: serviceForm.deliverables,
        pricing: serviceForm.pricing,
        best_for: serviceForm.best_for,
        flagship: serviceForm.flagship,
        published: serviceForm.published,
        sort_order: Number(serviceForm.sort_order) || 0,
      }
      if (editingServiceId) {
        await api(`/api/admin/services/${editingServiceId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        })
        setNotice('Service updated.')
      } else {
        await api('/api/admin/services', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
        setNotice('Service created. It will show on /services if published.')
      }
      setServiceForm(emptyService)
      setEditingServiceId(null)
      const svc = await api('/api/admin/services')
      setServices(svc.services || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setLoading(false)
    }
  }

  const editService = (s: Service) => {
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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const removeService = async (id: number) => {
    if (!confirm('Delete this service?')) return
    setLoading(true)
    try {
      await api(`/api/admin/services/${id}`, { method: 'DELETE' })
      setServices((prev) => prev.filter((s) => s.id !== id))
      setNotice('Service deleted.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed')
    } finally {
      setLoading(false)
    }
  }

  const saveProject = async () => {
    setLoading(true)
    setError('')
    setNotice('')
    try {
      const payload = { ...projectForm, sort_order: Number(projectForm.sort_order) || 0 }
      if (editingProjectId) {
        await api(`/api/admin/projects/${editingProjectId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        })
        setNotice('Project updated.')
      } else {
        await api('/api/admin/projects', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
        setNotice('Project created. Visible on site if published.')
      }
      setProjectForm(emptyProject)
      setEditingProjectId(null)
      const proj = await api('/api/admin/projects')
      setProjects(proj.projects || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setLoading(false)
    }
  }

  const editProject = (p: Project) => {
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
  }

  const removeProject = async (id: number) => {
    if (!confirm('Delete this project?')) return
    setLoading(true)
    try {
      await api(`/api/admin/projects/${id}`, { method: 'DELETE' })
      setProjects((prev) => prev.filter((p) => p.id !== id))
      setNotice('Project deleted.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed')
    } finally {
      setLoading(false)
    }
  }

  const onImageFile = async (file: File | null) => {
    if (!file) return
    try {
      const dataUrl = await fileToDataUrl(file)
      setProjectForm((f) => ({ ...f, image: dataUrl }))
      setNotice('Image loaded. Click Save project to store it.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image error')
    }
  }

  const inputClass = 'form-input text-sm'
  const labelClass = 'block text-xs font-semibold text-muted-foreground mb-1'

  if (!authed) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container max-w-md">
          <div className="accent-line mb-6" />
          <h1 className="section-heading mb-2">Admin dashboard</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Enter your <code className="text-accent">ADMIN_SECRET</code> from
            Vercel to manage messages, services, and projects.
          </p>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Admin secret"
            className={`${inputClass} mb-4`}
            autoComplete="current-password"
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
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="accent-line mb-4" />
            <h1 className="text-3xl font-display font-bold">Admin dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage contact messages, services, and project case studies.
            </p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={refreshAll} className="secondary-button !py-2 !px-4 text-sm" disabled={loading}>
              Refresh
            </button>
            <button type="button" onClick={logout} className="secondary-button !py-2 !px-4 text-sm">
              Log out
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {(
            [
              ['projects', 'Projects'],
              ['services', 'Services'],
              ['messages', 'Messages'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                tab === id
                  ? 'bg-accent text-accent-foreground border-accent'
                  : 'border-border text-muted-foreground hover:border-accent hover:text-accent'
              }`}
            >
              {label}
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

        {/* ─── PROJECTS ─── */}
        {tab === 'projects' && (
          <div className="space-y-10">
            <section className="p-6 bg-card border border-border rounded-xl">
              <h2 className="text-xl font-semibold mb-4">
                {editingProjectId ? 'Edit project' : 'Add new project'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Title *</label>
                  <input className={inputClass} value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Category</label>
                  <input className={inputClass} placeholder="e.g. Social Media Management" value={projectForm.category} onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })} />
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
                  <input className={inputClass} placeholder="e.g. 90 days" value={projectForm.timeframe} onChange={(e) => setProjectForm({ ...projectForm, timeframe: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Image URL (or upload below)</label>
                  <input className={inputClass} placeholder="https://..." value={projectForm.image.startsWith('data:') ? '' : projectForm.image} onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Upload image (max ~1.4MB)</label>
                  <input type="file" accept="image/*" className="text-sm text-muted-foreground" onChange={(e) => onImageFile(e.target.files?.[0] || null)} />
                  {projectForm.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={projectForm.image} alt="Preview" className="mt-3 h-40 object-cover rounded-lg border border-border" />
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Challenge / problem</label>
                  <textarea className={`${inputClass} min-h-[80px]`} value={projectForm.problem} onChange={(e) => setProjectForm({ ...projectForm, problem: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Strategy</label>
                  <textarea className={`${inputClass} min-h-[80px]`} value={projectForm.strategy} onChange={(e) => setProjectForm({ ...projectForm, strategy: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Execution</label>
                  <textarea className={`${inputClass} min-h-[80px]`} value={projectForm.execution} onChange={(e) => setProjectForm({ ...projectForm, execution: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Metric 1 value</label>
                  <input className={inputClass} placeholder="+150%" value={projectForm.metric1} onChange={(e) => setProjectForm({ ...projectForm, metric1: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Metric 1 label</label>
                  <input className={inputClass} placeholder="Engagement growth" value={projectForm.label1} onChange={(e) => setProjectForm({ ...projectForm, label1: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Metric 2 value</label>
                  <input className={inputClass} value={projectForm.metric2} onChange={(e) => setProjectForm({ ...projectForm, metric2: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Metric 2 label</label>
                  <input className={inputClass} value={projectForm.label2} onChange={(e) => setProjectForm({ ...projectForm, label2: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Metric 3 value</label>
                  <input className={inputClass} value={projectForm.metric3} onChange={(e) => setProjectForm({ ...projectForm, metric3: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Metric 3 label</label>
                  <input className={inputClass} value={projectForm.label3} onChange={(e) => setProjectForm({ ...projectForm, label3: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Testimonial quote</label>
                  <textarea className={`${inputClass} min-h-[60px]`} value={projectForm.testimonial} onChange={(e) => setProjectForm({ ...projectForm, testimonial: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Testimonial author</label>
                  <input className={inputClass} value={projectForm.testimonial_author} onChange={(e) => setProjectForm({ ...projectForm, testimonial_author: e.target.value })} />
                </div>
                <div className="flex flex-wrap gap-4 items-center md:col-span-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={projectForm.featured} onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })} />
                    Featured on homepage
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={projectForm.published} onChange={(e) => setProjectForm({ ...projectForm, published: e.target.checked })} />
                    Published (visible on site)
                  </label>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={saveProject} disabled={loading || !projectForm.title} className="cta-button !py-2.5 !px-5 text-sm disabled:opacity-50">
                  {editingProjectId ? 'Update project' : 'Save project'}
                </button>
                {editingProjectId && (
                  <button type="button" className="secondary-button !py-2.5 !px-5 text-sm" onClick={() => { setEditingProjectId(null); setProjectForm(emptyProject) }}>
                    Cancel edit
                  </button>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Your projects ({projects.length})</h2>
              <div className="space-y-3">
                {projects.map((p) => (
                  <div key={p.id} className="p-4 bg-card border border-border rounded-xl flex flex-col sm:flex-row gap-4 sm:items-center">
                    {p.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt="" className="w-full sm:w-28 h-20 object-cover rounded-lg" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{p.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {p.category || 'Project'}
                        {p.featured ? ' · Featured' : ''}
                        {p.published ? ' · Published' : ' · Draft'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" className="text-sm text-accent font-semibold" onClick={() => editProject(p)}>Edit</button>
                      <button type="button" className="text-sm text-red-400 font-semibold" onClick={() => removeProject(p.id)}>Delete</button>
                    </div>
                  </div>
                ))}
                {!projects.length && (
                  <p className="text-muted-foreground text-sm">No projects in the database yet. Add one above — until then the site shows default case studies.</p>
                )}
              </div>
            </section>
          </div>
        )}

        {/* ─── SERVICES ─── */}
        {tab === 'services' && (
          <div className="space-y-10">
            <section className="p-6 bg-card border border-border rounded-xl">
              <h2 className="text-xl font-semibold mb-4">
                {editingServiceId ? 'Edit service' : 'Add new service'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className={labelClass}>Title *</label>
                  <input className={inputClass} value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Description</label>
                  <textarea className={`${inputClass} min-h-[80px]`} value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Benefits (one per line)</label>
                  <textarea className={`${inputClass} min-h-[100px]`} value={serviceForm.benefits} onChange={(e) => setServiceForm({ ...serviceForm, benefits: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Deliverables (one per line)</label>
                  <textarea className={`${inputClass} min-h-[100px]`} value={serviceForm.deliverables} onChange={(e) => setServiceForm({ ...serviceForm, deliverables: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Pricing</label>
                  <input className={inputClass} value={serviceForm.pricing} onChange={(e) => setServiceForm({ ...serviceForm, pricing: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Best for</label>
                  <input className={inputClass} value={serviceForm.best_for} onChange={(e) => setServiceForm({ ...serviceForm, best_for: e.target.value })} />
                </div>
                <div className="flex flex-wrap gap-4 md:col-span-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={serviceForm.flagship} onChange={(e) => setServiceForm({ ...serviceForm, flagship: e.target.checked })} />
                    Flagship
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={serviceForm.published} onChange={(e) => setServiceForm({ ...serviceForm, published: e.target.checked })} />
                    Published
                  </label>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={saveService} disabled={loading || !serviceForm.title} className="cta-button !py-2.5 !px-5 text-sm disabled:opacity-50">
                  {editingServiceId ? 'Update service' : 'Save service'}
                </button>
                {editingServiceId && (
                  <button type="button" className="secondary-button !py-2.5 !px-5 text-sm" onClick={() => { setEditingServiceId(null); setServiceForm(emptyService) }}>
                    Cancel edit
                  </button>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Your services ({services.length})</h2>
              <div className="space-y-3">
                {services.map((s) => (
                  <div key={s.id} className="p-4 bg-card border border-border rounded-xl flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1">
                      <p className="font-semibold">{s.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {s.flagship ? 'Flagship · ' : ''}
                        {s.published ? 'Published' : 'Draft'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" className="text-sm text-accent font-semibold" onClick={() => editService(s)}>Edit</button>
                      <button type="button" className="text-sm text-red-400 font-semibold" onClick={() => removeService(s.id)}>Delete</button>
                    </div>
                  </div>
                ))}
                {!services.length && (
                  <p className="text-muted-foreground text-sm">No services in the database yet. Add one above — until then the site shows default services.</p>
                )}
              </div>
            </section>
          </div>
        )}

        {/* ─── MESSAGES ─── */}
        {tab === 'messages' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Contact messages ({submissions.length})</h2>
            {submissions.map((s) => (
              <article key={s.id} className="p-6 bg-card border border-border rounded-xl">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{s.name}</h3>
                    <a href={`mailto:${s.email}`} className="text-accent text-sm hover:underline">{s.email}</a>
                    {s.phone && <p className="text-sm text-muted-foreground">{s.phone}</p>}
                  </div>
                  <time className="text-xs text-muted-foreground">{new Date(s.created_at).toLocaleString()}</time>
                </div>
                <p className="text-sm mb-2">
                  <span className="text-accent font-medium">{s.subject}</span>
                  {s.budget && <span className="text-muted-foreground"> · {s.budget}</span>}
                </p>
                <p className="text-muted-foreground text-sm whitespace-pre-wrap">{s.message}</p>
              </article>
            ))}
            {!submissions.length && (
              <p className="text-muted-foreground text-sm">No messages yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
