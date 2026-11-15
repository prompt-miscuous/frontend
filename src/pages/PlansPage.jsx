import { IconCheck, IconPending } from '../components/icons.jsx';
import { ESTADOS_PLAN, PLANES as planes } from '../content/planes.js';
import { hrefFor } from '../lib/routes.js';

export default function PlansPage() {
  return (
    <div className="doc">
      <header className="page-head">
        <h1>{planes.titulo}</h1>
        <p className="lead">{planes.entrada}</p>
      </header>
      <ul className="plans">
        {planes.lista.map((plan) => {
          const disponible = plan.estado === 'disponible';
          return (
            <li key={plan.id} className="plan" data-estado={plan.estado}>
              <p className="plan-status">{ESTADOS_PLAN[plan.estado]}</p>
              <h2>{plan.nombre}</h2>
              <p className="plan-price">{plan.precio}</p>
              <p className="plan-summary">{plan.resumen}</p>
              <ul className="plan-features">
                {plan.incluye.map((item) => (
                  <li key={item}>
                    {disponible ? (
                      <IconCheck size={16} />
                    ) : (
                      <IconPending size={16} />
                    )}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {plan.accion ? (
                <a className="btn btn-primary" href={hrefFor(plan.accion.ruta)}>
                  {plan.accion.texto}
                </a>
              ) : null}
            </li>
          );
        })}
      </ul>
      <p className="plans-note">{planes.nota}</p>
    </div>
  );
}
