import { useRef, useState } from 'react'
import { api } from '../../hooks/useApi'

export default function ImageUploader({ projectId, onUploaded }) {
  const inputRef = useRef()
  const [loading, setLoading] = useState(false)

  const upload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setLoading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('key', `proyectos/${projectId}/${crypto.randomUUID()}-${file.name}`)
      const { url } = await api('/upload', { method: 'POST', body: form })
      onUploaded(url)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <input ref={inputRef} type="file" accept="image/*" onChange={upload} hidden />
      <button type="button" className="btn btn-small" onClick={() => inputRef.current.click()} disabled={loading}>
        {loading ? 'Subiendo...' : '+ Imagen'}
      </button>
    </>
  )
}
