import { useEffect } from 'react'

export default function Lightbox({ img, onClose }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <figure onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>
        <img src={img.src} alt={img.descripcion} />
        <figcaption>{img.descripcion}</figcaption>
      </figure>
    </div>
  )
}
