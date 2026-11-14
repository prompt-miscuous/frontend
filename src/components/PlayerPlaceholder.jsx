export default function PlayerPlaceholder({ status }) {
  const loading = status === 'loading';
  return (
    <section
      aria-label="Animación temporal"
      aria-busy={loading ? 'true' : 'false'}
      className="glass-panel rounded-2xl p-5 sm:p-6"
    >
      <h2 className="text-lg font-semibold text-white">Animación temporal</h2>
      <div className="mt-3 flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-600/80 bg-slate-950/40 px-6 text-center">
        <p className="text-sm font-medium text-slate-300">
          {loading ? 'Generando cuadros…' : 'Todavía no hay imágenes'}
        </p>
        <p className="max-w-xs text-xs text-slate-500">
          {loading
            ? 'Buscando épocas y alineando los cuadros de la región.'
            : 'La animación temporal aparecerá aquí. Genera una región para verla.'}
        </p>
      </div>
    </section>
  );
}
