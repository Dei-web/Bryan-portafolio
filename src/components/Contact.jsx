import { CONTACTO } from '../data/data'

export default function Contact() {
  return (
    <section id="contacto" className="section-web">
      <div className="container">
        <div className="contact-panel">
          <h2>¿Tienes una idea en mente?</h2>
          <p>Si buscas un diseño con personalidad, estoy aquí para ayudarte. ¡Trabajemos juntos!</p>
          <div className="contact-cards">
            <a className="contact-card" href={CONTACTO.instagram.url} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.6" />
              </svg>
              <strong>Instagram</strong>
              <span>{CONTACTO.instagram.usuario}</span>
            </a>
            <div className="contact-card">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.5 5C6 5 4.5 7.5 4 11c-.5 3.5.3 6 1.3 6.6.9.5 2.2.1 2.7-.4l.8-1.2h6.4l.8 1.2c.5.5 1.8.9 2.7.4 1-.6 1.8-3.1 1.3-6.6-.5-3.5-2-6-4.5-6-2-.6-5-.6-7 0Z" />
                <circle cx="9.3" cy="11" r="1.2" className="eye" />
                <circle cx="14.7" cy="11" r="1.2" className="eye" />
              </svg>
              <strong>Discord</strong>
              <span>{CONTACTO.discord.usuario}</span>
            </div>
            <a className="contact-card" href={CONTACTO.whatsapp.url} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z" />
              </svg>
              <strong>WhatsApp</strong>
              <span>{CONTACTO.whatsapp.usuario}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
