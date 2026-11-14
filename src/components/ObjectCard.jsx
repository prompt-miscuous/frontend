import { DEFAULTS } from '../lib/validation.js';

export default function ObjectCard({ onSelect }) {
  return (
    <section
      aria-label="Objeto de referencia"
      className="glass-panel rounded-2xl p-5 sm:p-6"
    >
      <h2 className="text-lg font-semibold text-white">WISE 0855</h2>
      <p className="mt-1 text-sm text-slate-300">
        Objeto astronómico de referencia cargado inicialmente.
      </p>
      <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-xl border border-white/[0.06] bg-slate-950/35 px-3 py-2">
          <dt className="text-slate-400">RA</dt>
          <dd className="font-mono text-slate-100">{DEFAULTS.ra}°</dd>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-slate-950/35 px-3 py-2">
          <dt className="text-slate-400">Dec</dt>
          <dd className="font-mono text-slate-100">{DEFAULTS.dec}°</dd>
        </div>
      </dl>
      <button
        type="button"
        onClick={onSelect}
        className="mt-3 w-full rounded-xl border border-cyan-200/20 px-4 py-2.5 text-sm text-cyan-100 transition hover:border-cyan-200/50 hover:bg-cyan-300/[0.06]"
      >
        Cargar WISE 0855
      </button>
    </section>
  );
}
