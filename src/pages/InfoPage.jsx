import BlinkComparator from '../components/BlinkComparator.jsx';
import { INFORMACION as info } from '../content/informacion.js';
import { hrefFor } from '../lib/routes.js';

function Paragraphs({ items }) {
  return items.map((text) => <p key={text}>{text}</p>);
}

export default function InfoPage() {
  return (
    <article className="doc">
      <header className="doc-hero">
        <div>
          <h1>{info.titulo}</h1>
          <p className="lead">{info.entrada}</p>
          <div className="prose doc-hero-body">
            <Paragraphs items={info.resumen} />
          </div>
          <a className="btn btn-primary" href={hrefFor('demo')}>
            Probar la demo
          </a>
        </div>
        <BlinkComparator />
      </header>

      <section className="doc-row" aria-labelledby="info-beneficio">
        <h2 id="info-beneficio">{info.beneficio.titulo}</h2>
        <div className="prose">
          <Paragraphs items={info.beneficio.parrafos} />
        </div>
      </section>

      <section className="doc-row" aria-labelledby="info-tecnologia">
        <h2 id="info-tecnologia">{info.tecnologia.titulo}</h2>
        <div className="prose">
          <p>{info.tecnologia.entrada}</p>
          <dl className="spec-list">
            {info.tecnologia.elementos.map((item) => (
              <div key={item.termino}>
                <dt>{item.termino}</dt>
                <dd>{item.detalle}</dd>
              </div>
            ))}
          </dl>
          <p>{info.tecnologia.cierre}</p>
        </div>
      </section>

      <section className="doc-row" aria-labelledby="info-flujo">
        <h2 id="info-flujo">{info.flujo.titulo}</h2>
        <div className="prose">
          <Paragraphs items={info.flujo.parrafos} />
          <p>{info.flujo.entradaPasos}</p>
          <ol className="step-list">
            {info.flujo.pasos.map((paso) => (
              <li key={paso}>{paso}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="doc-row" aria-labelledby="info-creatividad">
        <h2 id="info-creatividad">{info.creatividad.titulo}</h2>
        <div className="prose">
          <Paragraphs items={info.creatividad.parrafos} />
        </div>
      </section>

      <section className="doc-row" aria-labelledby="info-compromisos">
        <h2 id="info-compromisos">{info.compromisos.titulo}</h2>
        <div className="prose">
          <p>{info.compromisos.entrada}</p>
          <dl className="term-list">
            {info.compromisos.elementos.map((item) => (
              <div key={item.termino}>
                <dt>{item.termino}</dt>
                <dd>{item.detalle}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <footer className="doc-close">
        <p className="lead">{info.cierre}</p>
        <a className="btn btn-primary" href={hrefFor('demo')}>
          Elegir una zona del cielo
        </a>
      </footer>
    </article>
  );
}
