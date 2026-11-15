import SkyGif from '../components/SkyGif.jsx';
import { IA as ia } from '../content/ia.js';
import { hrefFor } from '../lib/routes.js';

export default function AiPage() {
  return (
    <article className="doc">
      <header className="doc-hero">
        <div>
          <p className="state-tag">{ia.estado}</p>
          <h1>{ia.titulo}</h1>
          <p className="lead">{ia.entrada}</p>
          <a className="btn btn-ghost" href={hrefFor('demo')}>
            Revisar una región a mano
          </a>
        </div>
        <SkyGif caption={ia.ilustracion} />
      </header>

      {ia.secciones.map((seccion, index) => (
        <section
          key={seccion.titulo}
          className="doc-row"
          aria-labelledby={`ia-seccion-${index}`}
        >
          <h2 id={`ia-seccion-${index}`}>{seccion.titulo}</h2>
          <div className="prose">
            {seccion.parrafos.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </section>
      ))}

      <section className="doc-row" aria-labelledby="ia-frentes">
        <h2 id="ia-frentes">{ia.frentes.titulo}</h2>
        <div className="prose">
          <p>{ia.frentes.entrada}</p>
          <dl className="term-list">
            {ia.frentes.elementos.map((item) => (
              <div key={item.termino}>
                <dt>{item.termino}</dt>
                <dd>{item.detalle}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </article>
  );
}
