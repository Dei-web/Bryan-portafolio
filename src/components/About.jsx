import Txt from './Txt'
import { EDUCACION, ESPECIALIDADES, EXPERIENCIA, HERRAMIENTAS, IDIOMAS, SOBRE_MI } from '../data/data'

function GrupoHerramientas({ titulo, items }) {
  return (
    <div className="tool-group">
      <h4>{titulo}</h4>
      <div className="skill-row">
        {items.map((h) => (
          <span key={h.nombre} className="skill-badge" title={h.nombre}>
            {h.ab}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="sobre-mi" className="section-web section-alt">
      <div className="container">
        <span className="kicker">Sobre mí</span>
        <h2 className="section-title">Transformo ideas en imágenes con personalidad</h2>
        <div className="about-grid">
          <div className="about-copy">
            {SOBRE_MI.map((p, i) => (
              <p key={i}>
                <Txt texto={p} />
              </p>
            ))}
            <div className="about-cols">
              <div>
                <h3>Experiencia</h3>
                {EXPERIENCIA.map((e) => (
                  <div key={e.rol} className="exp-item">
                    <span className="exp-periodo">{e.periodo}</span>
                    <strong>{e.rol}</strong>
                    <span>{e.lugar}</span>
                  </div>
                ))}
                <h3>Educación</h3>
                {EDUCACION.map((e) => (
                  <div key={e.titulo} className="exp-item">
                    <span className="exp-periodo">{e.periodo}</span>
                    <strong>{e.titulo}</strong>
                    <span>{e.lugar}</span>
                  </div>
                ))}
              </div>
              <div>
                <h3>Herramientas</h3>
                <GrupoHerramientas titulo="Manejo principal" items={HERRAMIENTAS.principal} />
                <GrupoHerramientas titulo="También trabajo con" items={HERRAMIENTAS.tambien} />
                <GrupoHerramientas titulo="En exploración" items={HERRAMIENTAS.exploracion} />
                <div className="lang-bar">
                  <strong>Idiomas</strong>
                  {IDIOMAS.map((i) => (
                    <span key={i.codigo}>
                      [{i.codigo}] {i.nivel}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <ul className="tags-row">
              {ESPECIALIDADES.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <figure className="portrait">
            <span className="tape tape-a" aria-hidden="true" />
            <h3>Retrato IRL</h3>
            <img src="/imagenes/retrato.jpg" alt="Bryan en la vida real" />
            <span className="stamp">
              Aprobado
              <br />
              brxan.art
              <br />
              2026
            </span>
          </figure>
        </div>
      </div>
    </section>
  )
}
