import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../hooks/useApi'
import useProjects from '../../hooks/useProjects'
import { useAdmin } from '../../context/AdminContext'
import ImageUploader from './ImageUploader'

export default function ProjectForm() {
  const { id: projectId } = useParams()
  const { projects, loading } = useProjects()
  const { password } = useAdmin()
  const navigate = useNavigate()
  const isNew = !projectId

  const project = projectId ? projects.find((p) => p.id === projectId) : null

  const [title, setTitle] = useState(project?.title || '')
  const [category, setCategory] = useState(project?.category || '')
  const [description, setDescription] = useState(project?.description || '')
  const [cover, setCover] = useState(project?.cover_url || '')
  const [images, setImages] = useState(project?.images || [])

  const id = projectId || crypto.randomUUID()

  useEffect(() => {
    if (!projectId || loading) return
    if (!project && !loading) return
    if (project) {
      setTitle(project.title)
      setCategory(project.category)
      setDescription(project.description)
      setCover(project.cover_url)
      setImages(project.images)
    }
  }, [project, projectId, loading])

  const addImage = (url) => setImages((prev) => [...prev, { url, description: '' }])
  const removeImage = (idx) => setImages((prev) => prev.filter((_, i) => i !== idx))
  const updateDesc = (idx, desc) => setImages((prev) => prev.map((img, i) => (i === idx ? { ...img, description: desc } : img)))

  const save = async (e) => {
    e.preventDefault()
    const body = { id, title, category, description, cover_url: cover, images }
    try {
      if (isNew) {
        await api('/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
          body: JSON.stringify(body),
        })
      } else {
        await api(`/projects/${projectId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
          body: JSON.stringify(body),
        })
      }
      navigate('/admin/proyectos')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <form className="admin-form" onSubmit={save}>
      <h2>{isNew ? 'Nuevo proyecto' : 'Editar proyecto'}</h2>
      <div className="form-row">
        <label>Título</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="form-row">
        <label>Categoría</label>
        <input value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Descripción</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Portada</label>
        <div className="cover-row">
          {cover && <img src={cover} alt="portada" className="cover-preview" />}
          <ImageUploader projectId={id} onUploaded={setCover} />
        </div>
      </div>
      <div className="form-row">
        <label>Imágenes ({images.length})</label>
        <div className="images-list">
          {images.map((img, idx) => (
            <div key={idx} className="image-row">
              <img src={img.url} alt={img.description} className="thumb" />
              <input
                value={img.description}
                onChange={(e) => updateDesc(idx, e.target.value)}
                placeholder="Descripción"
              />
              <button type="button" className="btn btn-small btn-ghost" onClick={() => removeImage(idx)}>×</button>
            </div>
          ))}
        </div>
        <ImageUploader projectId={id} onUploaded={addImage} />
      </div>
      <button type="submit" className="btn">Guardar</button>
      <button type="button" className="btn btn-small btn-ghost" onClick={() => navigate('/admin/proyectos')}>
        Cancelar
      </button>
    </form>
  )
}
