const BADGES = [
  {
    label: 'Atención al detalle',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M1 12h4M19 12h4" />
      </svg>
    ),
  },
  {
    label: 'Hecho para inspirar',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2l2.2 7.3L22 12l-7.8 2.7L12 22l-2.2-7.3L2 12l7.8-2.7Z" />
      </svg>
    ),
  },
  {
    label: 'Multitarea',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="3" width="11" height="11" rx="2" />
        <rect x="10" y="10" width="11" height="11" rx="2" />
      </svg>
    ),
  },
  {
    label: 'Pensamiento estratégico',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="5" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="M8.7 10.6l6.6-4M8.7 13.4l6.6 4" />
      </svg>
    ),
  },
  {
    label: 'Impulsado por cafeína',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 9h12v5a5 5 0 0 1-10 0Z" />
        <path d="M16 10h2a3 3 0 0 1 0 6h-2M7 2v3M11 2v3" />
      </svg>
    ),
  },
]

export default function TopBar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <ul className="badges">
          {BADGES.map((b) => (
            <li key={b.label}>
              {b.icon}
              <span>{b.label}</span>
            </li>
          ))}
        </ul>
        <div className="warning">
          <svg viewBox="0 0 24 24">
            <path d="M12 3L22 20H2Z" />
            <path d="M12 9v5" />
            <circle cx="12" cy="17" r="0.5" />
          </svg>
          <p>
            <strong>Advertencia:</strong> este portafolio contiene material de un cerebro gráfico. Prepárate para ideas sin fin.
          </p>
        </div>
      </div>
      <div className="topbar-arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M12 3v15M12 20l-6-6M12 20l6-6" />
        </svg>
      </div>
      <div className="topbar-notch" aria-hidden="true" />
    </header>
  )
}
