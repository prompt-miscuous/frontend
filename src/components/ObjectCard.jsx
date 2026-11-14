import { DEFAULTS } from '../lib/validation.js';

export default function ObjectCard({ onSelect }) {
  return (
    <section
      aria-label="Objeto de referencia"
      className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/30 backdrop-blur-md"
    >
      <h2 className="text-lg font-semibold text-white">WISE 0855</h2>
      <p className="mt-1 text-sm text-slate-300">
        Objeto astronómico de referencia cargado inicialmente.
      </p>
      <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-lg bg-slate-900/60 px-3 py-2">
          <dt className="text-slate-400">RA</dt>
          <dd className="font-mono text-slate-100">{DEFAULTS.ra}°</dd>
        </div>
        <div className="rounded-lg bg-slate-900/60 px-3 py-2">
          <dt className="text-slate-400">Dec</dt>
          <dd className="font-mono text-slate-100">{DEFAULTS.dec}°</dd>
        </div>
      </dl>
      <button
        type="button"
        onClick={onSelect}
        className="mt-3 w-full rounded-lg border border-sky-400/50 px-4 py-2 text-sm text-sky-200 transition hover:bg-sky-400/10"
      >
        Cargar WISE 0855
      </button>
    </section>
  );
}
