import { Link } from 'react-router-dom'
import useProjects from '../hooks/useProjects'

export default function ProjectsCovers() {
  const { projects, loading } = useProjects()

  return (
    <section id="proyectos" className="section-web">
      <div className="container">
        <span className="kicker">Portafolio</span>
        <h2 className="section-title">Proyectos</h2>
        {loading ? (
          <p className="muted">Cargando proyectos...</p>
        ) : (
          <div className="covers">
            {projects.map((p) => (
              <Link key={p.id} to={`/proyecto/${p.id}`} className="cover">
                {p.cover_url ? (
                  <img src={p.cover_url} alt={p.title} loading="lazy" />
                ) : (
                  <div className="cover-placeholder" />
                )}
                <span className="cover-cta">Ver →</span>
                <span className="cover-count">
                  {p.images.length} {p.images.length === 1 ? 'imagen' : 'imágenes'}
                </span>
                <div className="cover-info">
                  <h3>{p.title}</h3>
                  <span>{p.category}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
