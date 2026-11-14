export default function SkyPreview() {
  return (
    <section
      aria-label="Visualizador del cielo"
      className="glass-panel rounded-2xl p-5 sm:p-6"
    >
      <h2 className="text-lg font-semibold text-white">Vista previa</h2>
      <div className="preview-stage">
        <div aria-hidden="true" className="preview-placeholder" />
      </div>
    </section>
  );
}
