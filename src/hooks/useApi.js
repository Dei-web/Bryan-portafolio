export async function api(path, opts = {}) {
  const res = await fetch('/api' + path, opts)
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  return res.json()
}
