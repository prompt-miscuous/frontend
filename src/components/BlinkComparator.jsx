// Ilustración de la comparación por parpadeo: dos épocas del mismo campo.
// Las estrellas quedan fijas y un único punto cambia de posición.
// Es un dibujo generado en el navegador, no una imagen de SPHEREx.
import { useEffect, useId, useMemo, useState } from 'react';
import { IconPause, IconPlay } from './icons.jsx';

const BLINK_MS = 800;
const EPOCHS = [
  { x: 37.5, y: 62 },
  { x: 45, y: 56.5 },
];

function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeStars() {
  const random = mulberry32(855);
  return Array.from({ length: 78 }, (_, i) => {
    const weight = random() ** 3;
    return {
      id: i,
      x: 3 + random() * 94,
      y: 3 + random() * 94,
      r: 0.28 + weight * 1.5,
      opacity: 0.35 + weight * 0.65,
      warm: random() > 0.7,
    };
  });
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export default function BlinkComparator({ defaultMarked = false, caption }) {
  const stars = useMemo(makeStars, []);
  const [epoch, setEpoch] = useState(0);
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());
  const [marked, setMarked] = useState(defaultMarked);
  const markId = useId();
  // useId puede incluir caracteres no válidos dentro de url(#…).
  const glowId = `blink-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  useEffect(() => {
    if (!playing) return undefined;
    const timer = setInterval(() => {
      setEpoch((value) => (value + 1) % EPOCHS.length);
    }, BLINK_MS);
    return () => clearInterval(timer);
  }, [playing]);

  const mover = EPOCHS[epoch];

  return (
    <figure className="blink">
      <div className="blink-frame">
        <svg
          viewBox="0 0 100 100"
          role="img"
          aria-label="Ilustración de la comparación por parpadeo: dos épocas del mismo campo de estrellas en las que un solo punto cambia de posición."
        >
          <defs>
            <radialGradient id={`${glowId}-cool`}>
              <stop offset="0" stopColor="#dbe7ff" stopOpacity="0.55" />
              <stop offset="1" stopColor="#dbe7ff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`${glowId}-warm`}>
              <stop offset="0" stopColor="#ffd9a8" stopOpacity="0.55" />
              <stop offset="1" stopColor="#ffd9a8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="#04070c" />
          {stars.map((star) => (
            <g key={star.id} opacity={star.opacity}>
              {star.r > 0.9 ? (
                <circle
                  cx={star.x}
                  cy={star.y}
                  r={star.r * 3.2}
                  fill={`url(#${glowId}-${star.warm ? 'warm' : 'cool'})`}
                />
              ) : null}
              <circle
                cx={star.x}
                cy={star.y}
                r={star.r * 0.8}
                fill={star.warm ? '#ffe7c7' : '#eef4ff'}
              />
            </g>
          ))}
          {marked ? (
            <g fill="none" stroke="#ffb454" strokeWidth="0.45">
              <path
                d={`M${EPOCHS[0].x} ${EPOCHS[0].y}L${EPOCHS[1].x} ${EPOCHS[1].y}`}
                strokeDasharray="1.2 1.2"
                opacity="0.7"
              />
              <circle cx={mover.x} cy={mover.y} r="3.4" />
            </g>
          ) : null}
          <circle
            cx={mover.x}
            cy={mover.y}
            r="0.8"
            fill="#eef4ff"
            opacity="0.9"
          />
        </svg>
        <span className="blink-epoch" aria-hidden="true">
          Época {epoch + 1} de {EPOCHS.length}
        </span>
      </div>
      <div className="blink-controls">
        <button
          type="button"
          className="blink-toggle"
          onClick={() => setPlaying((value) => !value)}
          aria-pressed={playing}
        >
          {playing ? <IconPause size={15} /> : <IconPlay size={15} />}
          {playing ? 'Pausar' : 'Reproducir'}
        </button>
        <label className="blink-mark" htmlFor={markId}>
          <input
            id={markId}
            type="checkbox"
            checked={marked}
            onChange={(event) => setMarked(event.target.checked)}
          />
          Marcar el objeto que se mueve
        </label>
      </div>
      <figcaption>
        {caption ??
          'Las estrellas no cambian entre épocas; lo que salta es el candidato. Ilustración, no datos reales.'}
      </figcaption>
    </figure>
  );
}
