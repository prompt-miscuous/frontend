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
        className="w-full rounded-xl border border-white/10 bg-slate-950/45 px-3.5 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/20"
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
      className="glass-panel rounded-2xl p-5 sm:p-6"
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
                className="rounded-lg border border-white/10 bg-white/[0.025] px-3 py-1.5 text-xs text-slate-300 transition hover:border-cyan-300/50 hover:text-white"
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
            className="w-full rounded-xl border border-white/10 bg-slate-950/45 px-3.5 py-3 text-slate-100 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/20"
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
          className="flex-1 rounded-xl bg-cyan-300 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? 'Generando…' : 'Generar región'}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-200 transition hover:border-white/30 hover:bg-white/[0.04]"
        >
          Restablecer valores
        </button>
        <button
          type="button"
          onClick={onCopy}
          className="rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-200 transition hover:border-white/30 hover:bg-white/[0.04]"
        >
          {copied ? '¡Enlace copiado!' : 'Copiar enlace'}
        </button>
      </div>
    </section>
  );
}
