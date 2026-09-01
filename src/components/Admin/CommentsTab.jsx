import { useState } from 'react'
import useProjects from '../../hooks/useProjects'
import { useAdmin } from '../../context/AdminContext'
import { api } from '../../hooks/useApi'

export default function CommentsTab() {
  const { projects } = useProjects()
  const { password } = useAdmin()
  const [projectId, setProjectId] = useState('')
  const [imageIndex, setImageIndex] = useState('')
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    const q = new URLSearchParams({ projectId })
    if (imageIndex !== '') q.set('imageIndex', imageIndex)
    try {
      const data = await api(`/comments?${q}`, { headers: { 'x-admin-password': password } })
      setComments(data)
    } catch (e) {
      alert(e.message)
    }
    setLoading(false)
  }

  const remove = async (id) => {
    try {
      await api(`/comments/${id}`, { method: 'DELETE', headers: { 'x-admin-password': password } })
      load()
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="admin-comments">
      <h2>Comentarios</h2>
      <div className="filter-row">
        <select value={projectId} onChange={(e) => setProjectId(e.target.value)}>
          <option value="">Seleccionar proyecto</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="0"
          placeholder="Índice de imagen (opcional)"
          value={imageIndex}
          onChange={(e) => setImageIndex(e.target.value)}
        />
        <button className="btn btn-small" onClick={load} disabled={loading}>
          {loading ? 'Cargando...' : 'Buscar'}
        </button>
      </div>
      {comments.length === 0 && !loading && <p className="muted">Sin comentarios.</p>}
      <table className="comments-table">
        <thead>
          <tr>
            <th>Autor</th>
            <th>Comentario</th>
            <th>Fecha</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {comments.map((c) => (
            <tr key={c.id}>
              <td>{c.author}</td>
              <td>{c.text}</td>
              <td>{new Date(c.created_at).toLocaleString()}</td>
              <td>
                <button className="btn btn-small btn-ghost" onClick={() => remove(c.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
