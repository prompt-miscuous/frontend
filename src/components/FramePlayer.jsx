// Reproductor de épocas: play/pause, velocidad, slider, brillo/contraste,
// invertir y modo diferencia entre cuadros (canvas).
import { useEffect, useMemo, useRef, useState } from 'react';
import { resolvePngUrl } from '../lib/config.js';

const SPEEDS = [200, 500, 900, 1500];

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export default function FramePlayer({ manifest }) {
  const frames = manifest.frames;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(900);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [invert, setInvert] = useState(false);
  const [diff, setDiff] = useState(false);
  const [diffBase, setDiffBase] = useState('first'); // first | prev
  const [diffError, setDiffError] = useState(false);
  const canvasRef = useRef(null);

  const current = frames[index];
  const baseIndex = diffBase === 'prev' ? Math.max(index - 1, 0) : 0;
  // El padre remonta con key={requestId} en cada generación: sin efecto reset.

  useEffect(() => {
    if (!playing || frames.length < 2) return undefined;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % frames.length);
    }, speedMs);
    return () => clearInterval(timer);
  }, [playing, speedMs, frames.length]);

  const filter = useMemo(() => {
    const parts = [];
    if (brightness !== 100) parts.push(`brightness(${brightness}%)`);
    if (contrast !== 100) parts.push(`contrast(${contrast}%)`);
    if (invert) parts.push('invert(1)');
    return parts.length > 0 ? parts.join(' ') : undefined;
  }, [brightness, contrast, invert]);

  useEffect(() => {
    if (!diff) return undefined;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return undefined;
    let cancelled = false;
    setDiffError(false);
    (async () => {
      try {
        const [base, img] = await Promise.all([
          loadImage(resolvePngUrl(frames[baseIndex].png_url)),
          loadImage(resolvePngUrl(current.png_url)),
        ]);
        if (cancelled) return;
        canvas.width = base.naturalWidth;
        canvas.height = base.naturalHeight;
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(base, 0, 0);
        ctx.globalCompositeOperation = 'difference';
        ctx.drawImage(img, 0, 0);
      } catch {
        if (!cancelled) setDiffError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [diff, diffBase, baseIndex, current, frames]);

  return (
    <section
      aria-label="Reproductor de épocas"
      className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/30 backdrop-blur-md"
    >
      <h2 className="text-lg font-semibold text-white">Animación temporal</h2>
      <div className="mt-3 overflow-hidden rounded-xl border border-slate-700/60 bg-slate-950">
        {diff ? (
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="Diferencia entre épocas"
            style={filter ? { filter } : undefined}
            className="h-auto w-full"
          />
        ) : (
          <img
            key={current.png_url}
            src={resolvePngUrl(current.png_url)}
            alt={`Época ${index + 1}: ${current.obs_id}`}
            style={filter ? { filter } : undefined}
            className="h-auto w-full"
            draggable="false"
          />
        )}
      </div>
      {diffError ? (
        <p role="alert" className="mt-2 text-sm text-rose-300">
          No se pudo calcular la diferencia (¿bloqueo CORS del backend?).
        </p>
      ) : null}
      <p className="mt-2 font-mono text-xs text-slate-300" aria-live="polite">
        Época {index + 1}/{frames.length} · {current.obs_id} ·{' '}
        {current.date_obs} · MJD {current.mjd}
      </p>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          aria-pressed={playing}
          className="rounded-lg bg-sky-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-sky-400"
        >
          {playing ? 'Pausar' : 'Reproducir'}
        </button>
        <label className="flex flex-1 items-center gap-2 text-sm text-slate-300">
          <span className="sr-only">Época</span>
          <input
            type="range"
            min="0"
            max={frames.length - 1}
            step="1"
            value={index}
            aria-label="Época"
            onChange={(event) => setIndex(Number(event.target.value))}
            className="w-full accent-sky-400"
          />
        </label>
        <label className="flex items-center gap-1 text-sm text-slate-300">
          Velocidad
          <select
            value={speedMs}
            onChange={(event) => setSpeedMs(Number(event.target.value))}
            className="rounded-lg border border-slate-600/60 bg-slate-900/70 px-2 py-1 text-slate-100"
          >
            {SPEEDS.map((ms) => (
              <option key={ms} value={ms}>
                {ms} ms
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="flex items-center gap-2 text-sm text-slate-300">
          Brillo
          <input
            type="range"
            min="20"
            max="250"
            value={brightness}
            aria-label="Brillo"
            onChange={(event) => setBrightness(Number(event.target.value))}
            className="w-full accent-sky-400"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-300">
          Contraste
          <input
            type="range"
            min="20"
            max="250"
            value={contrast}
            aria-label="Contraste"
            onChange={(event) => setContrast(Number(event.target.value))}
            className="w-full accent-sky-400"
          />
        </label>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-200">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={invert}
            onChange={(event) => setInvert(event.target.checked)}
            className="h-4 w-4 accent-sky-400"
          />
          Invertir
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={diff}
            onChange={(event) => setDiff(event.target.checked)}
            className="h-4 w-4 accent-sky-400"
          />
          Diferencia
        </label>
        {diff ? (
          <label className="flex items-center gap-1 text-slate-300">
            contra
            <select
              value={diffBase}
              aria-label="Base de la diferencia"
              onChange={(event) => setDiffBase(event.target.value)}
              className="rounded-lg border border-slate-600/60 bg-slate-900/70 px-2 py-1 text-slate-100"
            >
              <option value="first">primera época</option>
              <option value="prev">época anterior</option>
            </select>
          </label>
        ) : null}
      </div>
    </section>
  );
}
