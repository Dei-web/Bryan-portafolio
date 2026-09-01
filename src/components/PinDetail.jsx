import { useState } from 'react'
import useComments from '../hooks/useComments'

export default function PinDetail({ proyecto, idx, onNav, onClose }) {
  const { comments, loading, addComment } = useComments(proyecto.id, idx)
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')
  const img = proyecto.images[idx]
  const ultimo = proyecto.images.length - 1

  const submit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    await addComment(author || 'Anónimo', text)
    setText('')
  }

  return (
    <div className="pindetail" onClick={onClose} role="dialog" aria-modal="true">
      <div className="pindetail-card" onClick={(e) => e.stopPropagation()}>
        <button className="pindetail-close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>
        <div className="pindetail-img">
          <img src={img.url} alt={img.description} />
        </div>
        <div className="pindetail-panel">
          <h2>{proyecto.title}</h2>
          <span className="kicker">{proyecto.category}</span>
          <p className="pindetail-desc">{img.description}</p>
          <section className="comments-section">
            <h3>Comentarios</h3>
            {loading && <p className="muted">Cargando...</p>}
            {!loading && comments.length === 0 && <p className="muted">Sin comentarios.</p>}
            <ul className="comment-list">
              {comments.map((c) => (
                <li key={c.id} className="comment">
                  <strong>{c.author}</strong>
                  <p>{c.text}</p>
                  <span>{new Date(c.created_at).toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <form className="comment-form" onSubmit={submit}>
              <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Tu nombre" />
              <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Deja un comentario" />
              <button type="submit" className="btn btn-small">Enviar</button>
            </form>
          </section>
          <div className="pindetail-nav">
            <button disabled={idx === 0} onClick={() => onNav(idx - 1)}>
              ← Anterior
            </button>
            <button disabled={idx === ultimo} onClick={() => onNav(idx + 1)}>
              Siguiente →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
