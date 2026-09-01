import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../hooks/useApi'
import useProjects from '../../hooks/useProjects'
import { useAdmin } from '../../context/AdminContext'

export default function ProjectList() {
  const { projects, loading, refreshProjects } = useProjects()
  const { password } = useAdmin()
  const navigate = useNavigate()
  const [removing, setRemoving] = useState(null)

  const remove = async (id) => {
    if (!confirm('Eliminar este proyecto y sus imágenes de R2?')) return
    setRemoving(id)
    try {
      await api(`/projects/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': password },
      })
      refreshProjects()
    } catch (e) {
      alert(e.message)
    } finally {
      setRemoving(null)
    }
  }

  if (loading) return <p className="muted">Cargando proyectos...</p>

  return (
    <>
      <div className="admin-header-row">
        <h2>Proyectos</h2>
        <button className="btn" onClick={() => navigate('nuevo')}>Nuevo proyecto</button>
      </div>
      <div className="admin-grid">
      {projects.map((p) => (
        <div key={p.id} className="admin-card">
          {p.cover_url && <img src={p.cover_url} alt={p.title} />}
          <div>
            <h3>{p.title}</h3>
            <span>{p.category}</span>
            <span>{p.images.length} {p.images.length === 1 ? 'imagen' : 'imágenes'}</span>
            <div className="actions">
              <button className="btn btn-small" onClick={() => navigate(`editar/${p.id}`)}>Editar</button>
              <button className="btn btn-small btn-ghost" onClick={() => remove(p.id)} disabled={removing === p.id}>
                {removing === p.id ? '...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}
