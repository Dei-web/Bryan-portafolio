import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import PinDetail from './PinDetail'

export default function ProjectPage() {
  const { id } = useParams()
  const { projects, loading } = useProjects()
  const proyecto = projects.find((p) => p.id === id)
  const [openIdx, setOpenIdx] = useState(null)

  if (loading)
    return (
      <div className="container not-found">
        <p className="muted">Cargando proyecto...</p>
      </div>
    )

  if (!proyecto)
    return (
      <div className="container not-found">
        <h1>Proyecto no encontrado</h1>
        <Link className="btn" to="/#proyectos">
          ← Volver a proyectos
        </Link>
      </div>
    )

  return (
    <main className="container project-page">
      <Link className="back-link" to="/#proyectos">
        ← Volver
      </Link>
      <div className="project-hero">
        <div>
          <span className="kicker">{proyecto.category}</span>
          <h1>{proyecto.title}</h1>
          <p>{proyecto.description}</p>
        </div>
        <span className="project-count">
          {proyecto.images.length} {proyecto.images.length === 1 ? 'imagen' : 'imágenes'}
        </span>
      </div>
      <div className="masonry">
        {proyecto.images.map((img, idx) => (
          <figure key={idx} className="pin">
            <button className="pin-img" onClick={() => setOpenIdx(idx)} aria-label={`Ampliar imagen de ${proyecto.title}`}>
              <img src={img.url} alt={img.description} loading="lazy" />
            </button>
            <figcaption>
              <p>{img.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      {openIdx !== null && (
        <PinDetail proyecto={proyecto} idx={openIdx} onNav={setOpenIdx} onClose={() => setOpenIdx(null)} />
      )}
    </main>
  )
}
