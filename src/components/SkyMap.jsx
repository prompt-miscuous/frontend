import { useRef } from 'react';
import { Maximize } from 'lucide-react';
import mapa from '../assets/mapa-cielo.jpg';

export default function SkyMap({ onShowAnimation }) {
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
        onClick={onShowAnimation}
        aria-label="Ver la animación de épocas en el reproductor"
        className="block w-full cursor-pointer"
      >
        <img
          src={mapa}
          alt="Mapa cartográfico de todo el cielo observable desde la Tierra: proyección oval con grilla de ascensión recta y declinación, Vía Láctea y constelaciones"
          className="block aspect-[21/9] w-full object-cover"
        />
      </button>
      <button
        type="button"
        onClick={toggleFullscreen}
        aria-label="Ver el mapa en pantalla completa"
        className="absolute top-3 right-3 flex items-center justify-center rounded-full border border-[var(--panel-border)] bg-[var(--panel)] p-2.5 text-[var(--text)] shadow-lg backdrop-blur-md"
      >
        <Maximize className="h-4 w-4" />
      </button>
    </figure>
  );
}
