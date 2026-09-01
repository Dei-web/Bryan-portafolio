import SectionHeader from './SectionHeader'
import Txt from './Txt'
import { CONTACTO, PERFIL } from '../data/data'

export default function UserProfile() {
  return (
    <section className="section">
      <SectionHeader titulo="Perfil de usuario" />
      <div className="profile-grid">
        <figure className="avatar-card">
          <span className="tape tape-a" aria-hidden="true" />
          <span className="tape tape-b" aria-hidden="true" />
          <div className="avatar-frame">
            <img src="/imagenes/logo-ghost-app.png" alt="Logo de brxan.art" />
            <div className="avatar-tag">
              <strong>brxan.art</strong>
              <span>diseñador gráfico & artista digital</span>
              <span className="avatar-tag-line">100% creativo</span>
            </div>
          </div>
          <span className="sticker" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 2C7 2 4 6 4 11v9l2.6-2 2.7 2 2.7-2 2.7 2 2.7-2 2.6 2v-9c0-5-3-9-8-9Z" />
              <circle cx="9.5" cy="10" r="1.4" className="sticker-eye" />
              <circle cx="14.5" cy="10" r="1.4" className="sticker-eye" />
            </svg>
          </span>
        </figure>
        <div className="profile-body">
          {PERFIL.map((p, i) => (
            <p key={i}>
              <Txt texto={p} />
            </p>
          ))}
          <ul className="contactos">
            <li>
              <span className="contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="0.6" />
                </svg>
              </span>
              <a href={CONTACTO.instagram.url} target="_blank" rel="noreferrer">
                instagram.com/{CONTACTO.instagram.usuario.replace('@', '')}
              </a>
            </li>
            <li>
              <span className="contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M8.5 5C6 5 4.5 7.5 4 11c-.5 3.5.3 6 1.3 6.6.9.5 2.2.1 2.7-.4l.8-1.2h6.4l.8 1.2c.5.5 1.8.9 2.7.4 1-.6 1.8-3.1 1.3-6.6-.5-3.5-2-6-4.5-6-2-.6-5-.6-7 0Z" />
                  <circle cx="9.3" cy="11" r="1.2" className="sticker-eye" />
                  <circle cx="14.7" cy="11" r="1.2" className="sticker-eye" />
                </svg>
              </span>
              <span>discord: {CONTACTO.discord.usuario}</span>
            </li>
            <li>
              <span className="contact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z" />
                  <path d="M9 8.5c-.5 3 2.5 6 5.5 6.5l.8-1.6-2-1.2-1 .6c-1-.5-1.8-1.3-2.2-2.3l.7-.9-1-2Z" className="sticker-eye" />
                </svg>
              </span>
              <a href={CONTACTO.whatsapp.url} target="_blank" rel="noreferrer">
                {CONTACTO.whatsapp.usuario}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
