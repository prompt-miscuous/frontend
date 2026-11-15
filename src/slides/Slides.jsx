import { useCallback, useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Database,
  Monitor,
  Server,
} from 'lucide-react';
import campo from '../assets/spherex-campo.png';
import epocas from '../assets/sky-epocas.gif';
import alineado from '../assets/alineado.gif';
import sinAlinear from '../assets/sin-alinear.gif';
import satelite from '../assets/satelite-spherex.png';
import { useTheme } from '../contexts/ThemeContext.jsx';

const LOGOS = {
  dark: '/space-apps-cochabamba-white.webp',
  light: '/space-apps-cochabamba-dark.webp',
};

function MediaSlide({ header, phrase, cue, children }) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 pt-12 pb-24 text-center">
      <h2 className="text-4xl font-bold tracking-tight text-[var(--text)] sm:text-5xl">
        {header}
      </h2>
      <div className="w-full max-w-5xl">{children}</div>
      <p className="max-w-3xl text-base text-[var(--muted)] sm:text-lg">
        {phrase}
      </p>
      {cue ? (
        <p className="w-full max-w-3xl border-l-2 border-[var(--accent)] pl-4 text-left text-sm leading-relaxed text-[var(--muted)] italic sm:text-base">
          {cue}
        </p>
      ) : null}
    </section>
  );
}

function Img({ src, alt, className }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`mx-auto h-[50vh] w-auto rounded-3xl border border-[var(--panel-border)] shadow-2xl ${className ?? ''}`}
    />
  );
}

function ArchBox({ icon, title, caption }) {
  return (
    <div className="flex h-full min-h-[170px] flex-col items-center justify-center gap-3 rounded-3xl border border-[var(--panel-border)] bg-[var(--panel)] p-6 text-center backdrop-blur-md">
      <span className="text-[var(--accent)]">{icon}</span>
      <p className="text-xl font-semibold text-[var(--text)]">{title}</p>
      <p className="text-sm leading-relaxed text-[var(--muted)] sm:text-base">
        {caption}
      </p>
    </div>
  );
}

function SlideVideo() {
  const { theme } = useTheme();
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 pt-12 pb-24 text-center">
      <img
        src={LOGOS[theme] ?? LOGOS.dark}
        alt="NASA Space Apps Cochabamba"
        className="h-14 w-auto"
      />
      <h1 className="text-6xl font-bold tracking-tight text-[var(--text)]">
        BlinkX
      </h1>
      <div className="aspect-video w-full max-w-3xl overflow-hidden rounded-2xl border border-[var(--panel-border)] shadow-2xl">
        <video
          title="Video de presentación de BlinkX"
          src="/demo%20de%20presentacion.mp4"
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          controls
        />
      </div>
      <p className="max-w-2xl text-base text-[var(--muted)] sm:text-lg">
        En este cielo hay un objeto que se está moviendo, y nadie sabe todavía
        qué es.
      </p>
      <p className="w-full max-w-3xl border-l-2 border-[var(--accent)] pl-4 text-left text-sm leading-relaxed text-[var(--muted)] italic sm:text-base">
        Desde 2025, SPHEREx fotografía todo el cielo cada seis meses en 102
        bandas del espectro infrarrojo.
      </p>
    </section>
  );
}

function SlideArchitecture() {
  return (
    <MediaSlide
      header="BlinkX, en una imagen"
      phrase="Así viaja una búsqueda: del archivo de la NASA a tu pantalla."

      cue="La NASA guarda las fotos; BlinkX las recorta, alinea y renderiza; el modelo marca los candidatos; la última palabra la tiene quien mira."
    >
      <div className="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ArchBox
          icon={<Database className="h-10 w-10" />}
          title="1 · Datos NASA"
          caption="Archivo SPHEREx en AWS: más de mil millones de objetos infrarrojos"
        />
        <ArchBox
          icon={<Server className="h-10 w-10" />}
          title="2 · BlinkX Backend"
          caption="Busca tu zona, recorta, alinea y renderiza (GET /frames)"
        />
        <ArchBox
          icon={<Brain className="h-10 w-10" />}
          title="3 · Nuestro modelo"
          caption="Lee los cuadros alineados, marca candidatos que se mueven y sugiere dónde mirar"
        />
        <ArchBox
          icon={<Monitor className="h-10 w-10" />}
          title="4 · Tu pantalla"
          caption="Coordenadas adentro, video y sugerencias afuera"
        />
      </div>
    </MediaSlide>
  );
}

function SlideProblem() {
  return (
    <MediaSlide
      header="El problema"
      phrase="Desde 2025 SPHEREx fotografía todo el cielo cada seis meses en 102 bandas del infrarrojo. Ninguna persona puede revisar más de mil millones de objetos."

      cue="102 bandas, más de mil millones de objetos y ni una sola persona capaz de revisarlo todo: esa es la brecha entre la investigación y la tecnología avanzada de la NASA."
    >
      <Img
        src={campo}
        alt="Campo de estrellas real observado por SPHEREx (detector 1)"
      />
    </MediaSlide>
  );
}

function SlideChallenge() {
  return (
    <MediaSlide
      header="Planet X and SPHEREx"
      phrase="El reto de la NASA: ver cómo cambia el cielo y cazar objetos en movimiento, con la técnica que Clyde Tombaugh usó para encontrar a Plutón."

      cue="El reto «Planet X and SPHEREx» pide una herramienta web pública para ver cómo cambia el cielo en el tiempo y cazar objetos en movimiento."
    >
      <div className="flex w-full flex-col gap-4 sm:flex-row">
        <figure className="flex-1">
          <img
            src={sinAlinear}
            alt="Dos épocas del mismo cielo sin alinear"
            className="h-[36vh] w-full rounded-3xl border border-[var(--panel-border)] object-cover [image-rendering:pixelated]"
          />
          <figcaption className="mt-2 text-sm text-[var(--muted)]">
            Sin alinear
          </figcaption>
        </figure>
        <figure className="flex-1">
          <img
            src={alineado}
            alt="Las mismas épocas alineadas como animación"
            className="h-[36vh] w-full rounded-3xl border border-[var(--panel-border)] object-cover [image-rendering:pixelated]"
          />
          <figcaption className="mt-2 text-sm text-[var(--muted)]">
            Alineado por BlinkX
          </figcaption>
        </figure>
      </div>
    </MediaSlide>
  );
}

function SlideMission() {
  return (
    <MediaSlide
      header="Elegimos SPHEREx"
      phrase="El observatorio infrarrojo de la NASA que fotografía todo el cielo cada seis meses, en 102 bandas."

      cue="Todo el cielo, cada seis meses, en 102 bandas del infrarrojo cercano: esa es la fuente de cada imagen que se ve en BlinkX."
    >
      <div className="flex w-full flex-col gap-4 sm:flex-row">
        <figure className="flex-1">
          <img
            src={satelite}
            alt="Ilustración del observatorio SPHEREx (NASA/JPL-Caltech)"
            className="h-[42vh] w-full rounded-3xl border border-[var(--panel-border)] bg-[var(--inset)] object-contain"
          />
          <figcaption className="mt-2 text-sm text-[var(--muted)]">
            El observatorio SPHEREx
          </figcaption>
        </figure>
        <figure className="flex-1">
          <img
            src={epocas}
            alt="Lo que se ve en BlinkX: el mismo cielo en tres épocas de SPHEREx"
            className="h-[42vh] w-full rounded-3xl border border-[var(--panel-border)] object-cover [image-rendering:pixelated]"
          />
          <figcaption className="mt-2 text-sm text-[var(--muted)]">
            BlinkX en vivo: épocas reales
          </figcaption>
        </figure>
      </div>
    </MediaSlide>
  );
}

function SlideSolution() {
  return (
    <MediaSlide
      header="La solución"
      phrase="Archivos de 70 MB en videos de segundos: escribes, BlinkX busca y alinea, tú das play."

      cue="Sin descargar nada y sin saber astronomía ni software avanzado: cualquiera puede parpadear el cielo como lo hizo Tombaugh con Plutón."
    >
      <Img
        src={epocas}
        alt="El mismo cielo en tres épocas de SPHEREx (banda D3)"
        className="h-[44vh] w-auto [image-rendering:pixelated]"
      />
    </MediaSlide>
  );
}

function SlideChatbot() {
  return (
    <MediaSlide
      header="Un guía inteligente"
      phrase="El chatbot te dice qué astro hay en tus coordenadas; si nada coincide, sugiere dónde mirar."

      cue="Le preguntas qué astro conocido hay en esas coordenadas y te responde; si el punto no coincide con catálogos, el modelo lo marca como región desconocida y sugiere dónde conviene mirar a continuación."
    >
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-[var(--panel-border)] bg-[var(--panel)] text-left shadow-xl backdrop-blur-md">
        <div className="bg-[var(--inset)] px-6 py-4">
          <p className="text-lg font-semibold text-[var(--text)]">
            Asistente BlinkX
          </p>
          <p className="text-sm text-[var(--muted)]">En línea · WISE 0855</p>
        </div>
        <div className="flex flex-col gap-3 px-5 py-5 text-base sm:text-lg">
          <p className="max-w-[80%] self-end rounded-2xl rounded-br-sm bg-[var(--accent)] px-4 py-3 text-[var(--accent-text)]">
            ¿Qué hay en 232.66, −10.72?
          </p>
          <p className="max-w-[85%] self-start rounded-2xl rounded-bl-sm border border-[var(--panel-border)] bg-[var(--inset)] px-4 py-3 text-[var(--text)]">
            Región sin objetos catalogados brillantes. El modelo sugiere mirar
            aquí.
          </p>
        </div>
      </div>
    </MediaSlide>
  );
}

function SlideData() {
  return (
    <MediaSlide
      header="Datos reales de la NASA"
      phrase="Bucket público nasa-irsa-spherex (QR2 y QR3) y servicio SIA2/IRSA: del crudo al video, sin intermediarios."

      cue="El frontend está desplegado en CloudFront y el backend ya sirve épocas reales de SPHEREx, con las pruebas del pipeline disponibles en los repos."
    >
      <Img
        src={campo}
        alt="Campo de SPHEREx renderizado desde un FITS de ciencia"
      />
    </MediaSlide>
  );
}

function SlideClose() {
  return (
    <MediaSlide
      header="Mira cómo se mueve el cielo"
      phrase="Estamos democratizando la educación para todo investigador, sea nuevo o no: el mismo dato y la misma técnica que encontró a Plutón."

      cue="La mayoría de los cometas y enanas marrones conocidos se descubrió con voluntarios comparando imágenes. Si el Planeta X pasó por estas épocas, se vería aquí: como un punto que se mueve lento entre dos visitas."
    >
      <Img
        src={epocas}
        alt="Parpadeo del mismo cielo entre épocas de SPHEREx"
        className="h-[44vh] w-auto [image-rendering:pixelated]"
      />
    </MediaSlide>
  );
}

const SLIDES = [
  SlideVideo,
  SlideProblem,
  SlideChallenge,
  SlideMission,
  SlideArchitecture,
  SlideSolution,
  SlideChatbot,
  SlideData,
  SlideClose,
];

export default function Slides() {
  const [index, setIndex] = useState(() => {
    const n = Number(new URLSearchParams(window.location.search).get('s'));
    return Number.isInteger(n) && n >= 1 && n <= SLIDES.length ? n - 1 : 0;
  });
  const last = SLIDES.length - 1;

  const go = useCallback(
    (next) => setIndex(() => Math.min(last, Math.max(0, next))),
    [last]
  );

  useEffect(() => {
    function onKey(event) {
      if (['ArrowRight', 'ArrowDown', ' '].includes(event.key)) {
        event.preventDefault();
        go(index + 1);
      } else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) {
        event.preventDefault();
        go(index - 1);
      } else if (event.key === 'Home') {
        go(0);
      } else if (event.key === 'End') {
        go(last);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, index, last]);

  const Current = SLIDES[index];

  return (
    <div className="space-bg min-h-screen text-[var(--text)]">
      <Current />
      <nav
        aria-label="Navegación de diapositivas"
        className="fixed right-0 bottom-0 left-0 flex items-center justify-between px-6 pb-4"
      >
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label="Anterior"
          className="rounded-full border border-[var(--panel-border)] bg-[var(--panel)] p-2 text-[var(--text)] disabled:opacity-30"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Ir a la diapositiva ${i + 1}`}
              aria-current={i === index}
              className={`h-2.5 w-2.5 rounded-full ${i === index ? 'bg-[var(--accent)]' : 'bg-[var(--muted)]'}`}
            />
          ))}
          <span className="ml-3 text-sm text-[var(--muted)]">
            {index + 1} / {SLIDES.length} · ← → para navegar
          </span>
        </div>
        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === last}
          aria-label="Siguiente"
          className="rounded-full border border-[var(--panel-border)] bg-[var(--panel)] p-2 text-[var(--text)] disabled:opacity-30"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </nav>
    </div>
  );
}
