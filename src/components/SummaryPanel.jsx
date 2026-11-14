export default function SummaryPanel({ manifest, errorMessage }) {
  if (errorMessage) {
    return (
      <section
        role="alert"
        aria-label="Error de generación"
        className="rounded-2xl border border-rose-400/40 bg-rose-500/10 p-5 backdrop-blur-md"
      >
        <h2 className="text-lg font-semibold text-rose-200">Error</h2>
        <p className="mt-1 text-sm text-rose-100">{errorMessage}</p>
      </section>
    );
  }
  if (!manifest) return null;
  const { params, grid, epochs_available, frames } = manifest;
  return (
    <section
      aria-label="Resumen de la región"
      className="glass-panel rounded-2xl p-5 sm:p-6"
    >
      <h2 className="text-lg font-semibold text-white">
        Región preparada (simulación local)
      </h2>
      <dl className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
        <div className="rounded-xl border border-white/[0.06] bg-slate-950/35 px-3 py-2">
          <dt className="text-slate-400">RA / Dec</dt>
          <dd className="font-mono text-slate-100">
            {params.ra}° / {params.dec}°
          </dd>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-slate-950/35 px-3 py-2">
          <dt className="text-slate-400">Tamaño / Banda</dt>
          <dd className="font-mono text-slate-100">
            {params.size}° / {params.band}
          </dd>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-slate-950/35 px-3 py-2">
          <dt className="text-slate-400">Cuadrícula</dt>
          <dd className="font-mono text-slate-100">
            {grid.width}×{grid.height} px
          </dd>
        </div>
      </dl>
      <ul className="mt-3 space-y-1 text-sm text-slate-200">
        {frames.map((frame) => (
          <li
            key={frame.obs_id}
            className="flex justify-between gap-2 rounded-lg bg-slate-950/35 px-3 py-1.5"
          >
            <span className="font-mono">{frame.obs_id}</span>
            <span className="text-slate-400">
              {frame.date_obs} · MJD {frame.mjd}
              {frame.png_url ? '' : ' · imagen pendiente del backend'}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-slate-400">
        {frames.length} épocas solicitadas de {epochs_available} disponibles.
        Las imágenes reales llegan con el backend (Fase 3).
      </p>
    </section>
  );
}
