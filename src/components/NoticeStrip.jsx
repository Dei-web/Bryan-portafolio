export default function NoticeStrip() {
  return (
    <div className="notice">
      <span className="notice-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M12 3L22 20H2Z" />
          <path d="M12 9v5" />
          <circle cx="12" cy="17" r="0.5" />
        </svg>
      </span>
      <span className="notice-text">¡Leer con cuidado!</span>
      <span className="notice-lines" aria-hidden="true" />
      <span className="notice-logo">
        <img src="/imagenes/logo-ghost.png" alt="Logo brxan.art" />
        BRXN
      </span>
    </div>
  )
}
