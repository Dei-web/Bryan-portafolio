import { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import Lightbox from './Lightbox'
import { PROYECTOS } from '../data/data'

const LS_KEY = 'brxan-likes'

export default function Projects() {
  const [liked, setLiked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY)) || {}
    } catch {
      return {}
    }
  })
  const [open, setOpen] = useState(null)

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(liked))
  }, [liked])

  const toggleLike = (id) => setLiked((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <section className="section">
      <SectionHeader titulo="Archivos de proyecto" />
      {PROYECTOS.map((proyecto) => (
        <div key={proyecto.id} className="project-group">
          <div className="project-head">
            <h3>{proyecto.titulo}</h3>
            <span>{proyecto.categoria}</span>
          </div>
          <div className="masonry">
            {proyecto.imagenes.map((img, idx) => {
              const id = `${proyecto.id}-${idx}`
              const meGusta = !!liked[id]
              return (
                <figure key={id} className="pin">
                  <button className="pin-img" onClick={() => setOpen(img)} aria-label={`Ampliar imagen de ${proyecto.titulo}`}>
                    <img src={img.src} alt={img.descripcion} loading="lazy" />
                  </button>
                  <figcaption>
                    <p>{img.descripcion}</p>
                    <button className={meGusta ? 'like liked' : 'like'} onClick={() => toggleLike(id)} aria-label="Me gusta">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 21C5 15 2 11 2 7.5 2 4.5 4.5 2.5 7 2.5c2 0 4 1.5 5 3 1-1.5 3-3 5-3 2.5 0 5 2 5 5 0 3.5-3 7.5-10 13.5Z" />
                      </svg>
                      {img.likes + (meGusta ? 1 : 0)}
                    </button>
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </div>
      ))}
      {open && <Lightbox img={open} onClose={() => setOpen(null)} />}
    </section>
  )
}
