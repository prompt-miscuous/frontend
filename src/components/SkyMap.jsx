import { useRef, useState } from 'react';
import { Maximize } from 'lucide-react';
import mapa from '../assets/mapa-cielo.jpg';
import epocas from '../assets/sky-epocas.gif';

export default function SkyMap() {
  const [showGif, setShowGif] = useState(false);
  const figureRef = useRef(null);

  function toggleFullscreen() {
    const el = figureRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      el.requestFullscreen?.();
    }
  }

  return (
    <figure
      ref={figureRef}
      className="glass-panel relative overflow-hidden rounded-2xl bg-[var(--page)]"
    >
      <button
        type="button"
        onClick={() => setShowGif((v) => !v)}
        aria-pressed={showGif}
        aria-label={
          showGif
            ? 'Volver al mapa del cielo'
            : 'Ver la animación de épocas de SPHEREx'
        }
        className="block w-full cursor-pointer"
      >
        {showGif ? (
          <img
            src={epocas}
            alt="Animación de SPHEREx: el mismo cielo en tres épocas (banda D3)"
            className="block aspect-[21/9] w-full object-cover [image-rendering:pixelated]"
          />
        ) : (
          <img
            src={mapa}
            alt="Mapa cartográfico de todo el cielo observable desde la Tierra: proyección oval con grilla de ascensión recta y declinación, Vía Láctea y constelaciones"
            className="block aspect-[21/9] w-full object-cover"
          />
        )}
      </button>
      <button
        type="button"
        onClick={toggleFullscreen}
        aria-label="Ver el mapa en pantalla completa"
        className="absolute top-3 right-3 flex items-center gap-2 rounded-full border border-[var(--panel-border)] bg-[var(--panel)] px-3 py-2 text-xs font-medium text-[var(--text)] shadow-lg backdrop-blur-md"
      >
        <Maximize className="h-4 w-4" />
        Pantalla completa
      </button>
      <figcaption className="px-5 py-3 text-xs text-[var(--muted)]">
        {showGif
          ? 'El mismo cielo en tres épocas de SPHEREx. Toca de nuevo para volver al mapa.'
          : 'Todo el cielo observable en un solo mapa. Toca el mapa para verlo moverse en el tiempo.'}
      </figcaption>
    </figure>
  );
}
