import { useState, useRef } from 'react'
import useComments from '../hooks/useComments'

export default function InfoPanel({
  proyecto,
  idx,
  imageIndex
}) {
  const { comments, loading, addComment } = useComments(proyecto.id, imageIndex)
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')
  const textareaRef = useRef(null)

  const img = proyecto.images[imageIndex]

  const submit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    await addComment(author || 'Anónimo', text)
    setText('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const autoResize = (e) => {
    const ta = e.target
    ta.style.height = 'auto'
    const lineHeight = parseInt(getComputedStyle(ta).lineHeight) || 20
    const maxH = 5 * lineHeight
    ta.style.height = Math.min(ta.scrollHeight, maxH) + 'px'
  }

  return (
    <aside className="info-panel" onClick={(e) => e.stopPropagation()}>
      <header className="info-panel-header">
        <h2>{proyecto.title}</h2>
        <span className="kicker">{proyecto.category}</span>
        <p className="info-panel-desc">{img.description}</p>
      </header>
      <section className="info-panel-comments">
        <h3>Comentarios <span>({comments.length})</span></h3>
        {loading && <p className="muted">Cargando...</p>}
        {!loading && comments.length === 0 && <p className="muted">Sin comentarios.</p>}
        <ul className="info-panel-comment-list">
          {comments.map((c) => (
            <li key={c.id} className="info-panel-comment">
              <strong>{c.author}</strong>
              <p>{c.text}</p>
              <span>{new Date(c.created_at).toLocaleString()}</span>
            </li>
          ))}
        </ul>
        <form className="info-panel-form" onSubmit={submit}>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Tu nombre"
          />
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onInput={autoResize}
            placeholder="Deja un comentario"
            rows="1"
          />
          <button type="submit" className="btn btn-small">Enviar</button>
        </form>
      </section>
    </aside>
  )
}