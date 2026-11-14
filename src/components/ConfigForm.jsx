import { BANDS, bandLabel } from '../lib/bands.js';
import { SIZE_PRESETS } from '../lib/validation.js';

function NumberField({
  id,
  label,
  unit,
  value,
  error,
  placeholder,
  onChange,
  children,
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-slate-200"
      >
        {label} <span className="text-slate-400">({unit})</span>
      </label>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        spellCheck="false"
        placeholder={placeholder}
        value={value}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-600/60 bg-slate-900/70 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
      />
      {children}
      {error ? (
        <p id={errorId} role="alert" className="mt-1 text-sm text-rose-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function ConfigForm({
  inputs,
  band,
  errors,
  isValid,
  status,
  copied,
  onInput,
  onBand,
  onReset,
  onGenerate,
  onCopy,
}) {
  const loading = status === 'loading';
  return (
    <section
      aria-label="Configuración de la región"
      className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/30 backdrop-blur-md sm:p-6"
    >
      <h2 className="mb-4 text-lg font-semibold text-white">
        Configuración de la región
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          id="field-ra"
          label="Ascensión recta"
          unit="grados, 0–360"
          value={inputs.ra}
          error={errors.ra}
          placeholder="133.7951"
          onChange={(value) => onInput('ra', value)}
        />
        <NumberField
          id="field-dec"
          label="Declinación"
          unit="grados, −90–+90"
          value={inputs.dec}
          error={errors.dec}
          placeholder="-7.2451"
          onChange={(value) => onInput('dec', value)}
        />
        <NumberField
          id="field-size"
          label="Tamaño de la región"
          unit="grados, 0,05–1,00"
          value={inputs.size}
          error={errors.size}
          placeholder="0.25"
          onChange={(value) => onInput('size', value)}
        >
          <div
            className="mt-2 flex flex-wrap gap-2"
            role="group"
            aria-label="Tamaños predefinidos"
          >
            {SIZE_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => onInput('size', String(preset))}
                className="rounded-full border border-slate-500/60 px-3 py-1 text-xs text-slate-200 transition hover:border-sky-400 hover:text-white"
              >
                {preset.toFixed(2)}°
              </button>
            ))}
          </div>
        </NumberField>
        <div>
          <label
            htmlFor="field-band"
            className="mb-1 block text-sm font-medium text-slate-200"
          >
            Banda espectral
          </label>
          <select
            id="field-band"
            value={band}
            aria-invalid={errors.band ? 'true' : 'false'}
            aria-describedby={errors.band ? 'field-band-error' : undefined}
            onChange={(event) => onBand(event.target.value)}
            className="w-full rounded-lg border border-slate-600/60 bg-slate-900/70 px-3 py-2 text-slate-100 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
          >
            <option value="">Selecciona una banda…</option>
            {BANDS.map((item) => (
              <option key={item.id} value={item.id}>
                {bandLabel(item)}
              </option>
            ))}
          </select>
          {errors.band ? (
            <p
              id="field-band-error"
              role="alert"
              className="mt-1 text-sm text-rose-300"
            >
              {errors.band}
            </p>
          ) : null}
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={onGenerate}
          disabled={!isValid || loading}
          className="flex-1 rounded-lg bg-sky-500 px-4 py-2.5 font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? 'Generando…' : 'Generar región'}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-slate-500/70 px-4 py-2.5 text-slate-100 transition hover:border-slate-300"
        >
          Restablecer valores
        </button>
        <button
          type="button"
          onClick={onCopy}
          className="rounded-lg border border-slate-500/70 px-4 py-2.5 text-slate-100 transition hover:border-slate-300"
        >
          {copied ? '¡Enlace copiado!' : 'Copiar enlace'}
        </button>
      </div>
    </section>
  );
}
