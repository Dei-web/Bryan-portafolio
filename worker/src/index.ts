import { Hono, Context } from 'hono'
import { cors } from 'hono/cors'
import { createClient } from '@supabase/supabase-js'

type Env = {
  R2_BUCKET: R2Bucket
  R2_ACCOUNT_ID: string
  R2_PUBLIC_URL: string
  ADMIN_PASSWORD: string
  SUPABASE_URL: string
  SUPABASE_SERVICE_ROLE_KEY: string
}

function getSupabase(c: Context<{ Bindings: Env }>) {
  return createClient(c.env.SUPABASE_URL, c.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  })
}

const BASE = (c: Context<{ Bindings: Env }>) => `${c.env.R2_PUBLIC_URL}/`

function requireAdmin(c: Context<{ Bindings: Env }>) {
  const pw = c.req.header('x-admin-password')
  if (pw !== c.env.ADMIN_PASSWORD) return c.json({ error: 'Unauthorized' }, 401)
}

const app = new Hono<{ Bindings: Env }>()

app.use('*', cors({ origin: '*' }))

app.post('/api/upload', async (c: Context<{ Bindings: Env }>) => {
  const form = await c.req.formData()
  const file = form.get('file') as File
  const key = (form.get('key') as string) || `${crypto.randomUUID()}`
  const buffer = await file.arrayBuffer()
  await c.env.R2_BUCKET.put(key, buffer)
  const url = `${BASE(c)}${key}`
  return c.json({ url, key })
})

app.get('/api/projects', async (c: Context<{ Bindings: Env }>) => {
  const supabase = getSupabase(c)
  const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
  if (error) return c.json({ error: error.message }, 500)
  const projects = await Promise.all(
    (data ?? []).map(async (p: any) => {
      const { data: imgs } = await supabase.from('project_images').select('*').eq('project_id', p.id).order('position')
      return { ...p, images: imgs ?? [] }
    })
  )
  return c.json(projects)
})

app.get('/api/projects/:id', async (c: Context<{ Bindings: Env }>) => {
  const supabase = getSupabase(c)
  const { data, error } = await supabase.from('projects').select('*').eq('id', c.req.param('id')).single()
  if (error) return c.json({ error: error.message }, 500)
  const { data: imgs } = await supabase.from('project_images').select('*').eq('project_id', data.id).order('position')
  return c.json({ ...data, images: imgs ?? [] })
})

app.post('/api/projects', async (c: Context<{ Bindings: Env }>) => {
  const supabase = getSupabase(c)
  const body = await c.req.json()
  const { id, title, category, description, cover_url, images } = body
  const { data: project, error: pErr } = await supabase.from('projects').insert({ id, title, category, description, cover_url }).select().single()
  if (pErr) return c.json({ error: pErr.message }, 500)
  if (images?.length) {
    const rows = images.map((img: any, i: number) => ({ project_id: project.id, url: img.url, description: img.description, position: i }))
    const { error: iErr } = await supabase.from('project_images').insert(rows)
    if (iErr) return c.json({ error: iErr.message }, 500)
  }
  return c.json(project)
})

app.put('/api/projects/:id', async (c: Context<{ Bindings: Env }>) => {
  const supabase = getSupabase(c)
  const id = c.req.param('id')
  const body = await c.req.json()
  const { title, category, description, cover_url, images } = body
  await supabase.from('projects').update({ title, category, description, cover_url }).eq('id', id)
  const { data: oldImgs } = await supabase.from('project_images').select('url').eq('project_id', id)
  const oldUrls = new Set((oldImgs ?? []).map((i: any) => i.url))
  const newUrls = new Set((images ?? []).map((i: any) => i.url))
  for (const url of oldUrls) {
    if (!newUrls.has(url)) {
      const key = url.replace(`${BASE(c)}`, '')
      await c.env.R2_BUCKET.delete(key)
    }
  }
  await supabase.from('project_images').delete().eq('project_id', id)
  if (images?.length) {
    const rows = images.map((img: any, i: number) => ({ project_id: id, url: img.url, description: img.description, position: i }))
    await supabase.from('project_images').insert(rows)
  }
  return c.json({ ok: true })
})

app.delete('/api/projects/:id', async (c: Context<{ Bindings: Env }>) => {
  const supabase = getSupabase(c)
  const id = c.req.param('id')
  const { data: imgs } = await supabase.from('project_images').select('url').eq('project_id', id)
  if (imgs?.length) {
    const list = await c.env.R2_BUCKET.list({ prefix: `proyectos/${id}/` })
    for (const obj of list.objects ?? []) {
      await c.env.R2_BUCKET.delete((obj as any).name)
    }
  }
  await supabase.from('project_images').delete().eq('project_id', id)
  await supabase.from('projects').delete().eq('id', id)
  return c.json({ ok: true })
})

app.get('/api/comments', async (c: Context<{ Bindings: Env }>) => {
  const supabase = getSupabase(c)
  const projectId = c.req.query('projectId')
  const imageIndex = c.req.query('imageIndex')
  let q = supabase.from('comments').select('*').eq('project_id', projectId)
  if (imageIndex) q = q.eq('image_index', Number(imageIndex))
  const { data, error } = await q.order('created_at', { ascending: true })
  if (error) return c.json({ error: error.message }, 500)
  return c.json(data ?? [])
})

app.post('/api/comments', async (c: Context<{ Bindings: Env }>) => {
  const supabase = getSupabase(c)
  const body = await c.req.json()
  const { project_id, image_index, author, text } = body
  const { data, error } = await supabase.from('comments').insert({ project_id, image_index, author, text }).select().single()
  if (error) return c.json({ error: error.message }, 500)
  return c.json(data)
})

app.delete('/api/comments/:id', async (c: Context<{ Bindings: Env }>) => {
  const supabase = getSupabase(c)
  const { error } = await supabase.from('comments').delete().eq('id', c.req.param('id'))
  if (error) return c.json({ error: error.message }, 500)
  return c.json({ ok: true })
})

app.post('/api/admin/login', async (c: Context<{ Bindings: Env }>) => {
  const { password } = await c.req.json()
  if (password !== c.env.ADMIN_PASSWORD) return c.json({ ok: false }, 401)
  return c.json({ ok: true })
})

export default app
