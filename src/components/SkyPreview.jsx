// Vista previa SIMULADA: campo de estrellas determinista derivado de los
// parametros. No es una imagen astronomica; el backend real llega en Fase 3.
import { useMemo } from 'react';

const WIDTH = 400;
const HEIGHT = 300;

function hashSeed(text) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash = Math.imul(hash ^ text.charCodeAt(i), 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeStars(seedText, count) {
  const random = mulberry32(hashSeed(seedText));
  return Array.from({ length: count }, (_, i) => {
    const bright = random();
    return {
      id: i,
      x: random() * WIDTH,
      y: random() * HEIGHT,
      r: bright > 0.93 ? 1.8 + random() : 0.5 + random() * 1.1,
      opacity: 0.35 + bright * 0.65,
    };
  });
}

export default function SkyPreview({ values, status, manifest }) {
  const seedText = values
    ? `${values.ra},${values.dec},${values.size},${values.band}`
    : 'invalid';
  const stars = useMemo(() => makeStars(seedText, 140), [seedText]);

  const frameSide = values
    ? 120 + ((values.size - 0.05) / (1.0 - 0.05)) * 130
    : 120;
  const frameX = (WIDTH - frameSide) / 2;
  const frameY = (HEIGHT - frameSide) / 2;

  return (
    <section
      aria-label="Vista previa simulada"
      className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/30 backdrop-blur-md"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-white">Vista previa</h2>
        <span className="rounded-full border border-amber-300/50 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200">
          Simulación visual
        </span>
      </div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label="Representación simulada de la región del cielo configurada"
        className="h-auto w-full rounded-xl border border-slate-700/60 bg-slate-950"
      >
        <defs>
          <radialGradient id="nebula-a" cx="30%" cy="25%" r="55%">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nebula-b" cx="75%" cy="80%" r="50%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="url(#nebula-a)" />
        <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="url(#nebula-b)" />
        {stars.map((star) => (
          <circle
            key={star.id}
            cx={star.x}
            cy={star.y}
            r={star.r}
            fill="#ffffff"
            opacity={values ? star.opacity : 0.15}
          />
        ))}
        {values ? (
          <g>
            <rect
              x={frameX}
              y={frameY}
              width={frameSide}
              height={frameSide}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
            <line
              x1={WIDTH / 2 - 10}
              y1={HEIGHT / 2}
              x2={WIDTH / 2 + 10}
              y2={HEIGHT / 2}
              stroke="#38bdf8"
              strokeWidth="1.5"
            />
            <line
              x1={WIDTH / 2}
              y1={HEIGHT / 2 - 10}
              x2={WIDTH / 2}
              y2={HEIGHT / 2 + 10}
              stroke="#38bdf8"
              strokeWidth="1.5"
            />
          </g>
        ) : null}
      </svg>
      <p className="mt-3 font-mono text-xs text-slate-300">
        {values
          ? `RA ${values.ra}° · Dec ${values.dec}° · ${values.size}° · ${values.band}`
          : 'Ajusta los parámetros para actualizar la simulación.'}
      </p>
      {status === 'ready' && manifest ? (
        <p role="status" className="mt-2 text-sm text-emerald-300">
          Región preparada: {manifest.frames.length} épocas simuladas de{' '}
          {manifest.epochs_available} disponibles.
        </p>
      ) : null}
      <p className="mt-1 text-xs text-slate-400">
        Representación decorativa: no es una imagen astronómica real.
      </p>
    </section>
  );
}
