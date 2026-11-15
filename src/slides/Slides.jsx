import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Database, Monitor, Server } from 'lucide-react';

const VIDEO_ID = 'Jqw6QeUIDoU';

function Shell({ children }) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 py-10">
      <div className="flex w-full max-w-5xl flex-col items-center gap-6 text-center">
        {children}
      </div>
    </section>
  );
}

function Kicker({ children }) {
  return (
    <p className="text-xs font-semibold tracking-[0.3em] text-slate-400 uppercase">
      {children}
    </p>
  );
}

function Title({ children }) {
  return (
    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
      {children}
    </h2>
  );
}

function Lead({ children }) {
  return (
    <p className="max-w-3xl text-lg text-slate-300 sm:text-xl">{children}</p>
  );
}

function Chip({ children }) {
  return (
    <span className="rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1 text-sm text-sky-200">
      {children}
    </span>
  );
}

function ArchBox({ icon, title, caption }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-2 rounded-2xl border border-slate-600 bg-slate-900/70 p-5">
      <span className="text-sky-300">{icon}</span>
      <p className="text-lg font-semibold text-white">{title}</p>
      <p className="text-sm text-slate-400">{caption}</p>
    </div>
  );
}

function Arrow() {
  return (
    <span
      className="hidden shrink-0 items-center text-slate-400 sm:flex"
      aria-hidden="true"
    >
      <ArrowRight className="h-6 w-6" />
    </span>
  );
}

function SlideVideo() {
  return (
    <Shell>
      <Kicker>NASA Space Apps 2026 · Cochabamba</Kicker>
      <h1 className="text-6xl font-bold tracking-tight text-white">BlinkX</h1>
      <Lead>
        En este cielo hay un objeto que se está moviendo, y nadie sabe todavía
        qué es.
      </Lead>
      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-700 shadow-2xl">
        <iframe
          title="Video: Exploring Cosmic Origins with NASA's SPHEREx"
          src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0`}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <p className="text-sm text-slate-500">
        Video: NASA Jet Propulsion Laboratory — Exploring Cosmic Origins with
        NASA&rsquo;s SPHEREx
      </p>
    </Shell>
  );
}

function SlideArchitecture() {
  return (
    <Shell>
      <Kicker>Cómo funciona</Kicker>
      <Title>La arquitectura, en una imagen</Title>
      <Lead>
        Nivel contenedores (C4 L2 simplificado): tres piezas entre los datos de
        la NASA y tus ojos.
      </Lead>
      <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <ArchBox
          icon={<Database className="h-8 w-8" />}
          title="1 · Datos NASA"
          caption="Archivo SPHEREx en AWS (bucket S3/IRSA): más de mil millones de objetos infrarrojos"
        />
        <Arrow />
        <ArchBox
          icon={<Server className="h-8 w-8" />}
          title="2 · BlinkX Backend"
          caption="Busca tu zona, recorta, alinea las épocas y las convierte en imágenes (GET /frames)"
        />
        <Arrow />
        <ArchBox
          icon={<Monitor className="h-8 w-8" />}
          title="3 · Tu pantalla"
          caption="Escribes las coordenadas y ves tu cielo como un video, época tras época"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Chip>Datos públicos (S3)</Chip>
        <Chip>Sin claves ni cuentas</Chip>
        <Chip>Frontend en CloudFront</Chip>
      </div>
    </Shell>
  );
}

function SlideProblem() {
  return (
    <Shell>
      <Kicker>El problema</Kicker>
      <Title>El telescopio vuela; la investigación se queda fuera</Title>
      <Lead>
        Desde 2025 SPHEREx fotografía todo el cielo cada seis meses en 102
        bandas del infrarrojo cercano. Devuelve imágenes de más de mil millones
        de objetos… y ninguna persona puede revisarlas todas.
      </Lead>
      <p className="max-w-3xl text-lg text-slate-200">
        Ahí está la brecha: entre la investigación de todos y la tecnología
        avanzada de la NASA. El telescopio vuela, pero quien debería estar
        mirando sigue fuera de la sala.
      </p>
    </Shell>
  );
}

function SlideChallenge() {
  return (
    <Shell>
      <Kicker>El reto</Kicker>
      <Title>Planet X and SPHEREx</Title>
      <Lead>
        El desafío de la NASA: crear una herramienta pública para ver cómo
        cambia el cielo en el tiempo y cazar objetos en movimiento.
      </Lead>
      <p className="max-w-3xl text-lg text-slate-200">
        La misma técnica que Clyde Tombaugh usó para encontrar a Plutón en 1930:
        comparar imágenes de épocas distintas hasta que algo se delata
        moviéndose.
      </p>
    </Shell>
  );
}

function SlideSolution() {
  const steps = [
    [
      '1',
      'Escribes',
      'Coordenadas, tamaño y banda infrarroja de tu región del cielo',
    ],
    [
      '2',
      'BlinkX busca',
      'Todas las épocas que la cubren; descarga solo tu recorte, las alinea y renderiza',
    ],
    [
      '3',
      'Ves el video',
      'El mismo cielo, época tras época: todo quieto… excepto lo que se movió',
    ],
  ];
  return (
    <Shell>
      <Kicker>La solución</Kicker>
      <Title>Archivos de 70 MB en videos de segundos</Title>
      <div className="grid w-full gap-4 sm:grid-cols-3">
        {steps.map(([n, h, p]) => (
          <div
            key={n}
            className="flex flex-col items-center gap-2 rounded-2xl border border-slate-600 bg-slate-900/70 p-5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/20 text-lg font-bold text-sky-200">
              {n}
            </span>
            <p className="text-lg font-semibold text-white">{h}</p>
            <p className="text-sm text-slate-400">{p}</p>
          </div>
        ))}
      </div>
      <Lead>
        Sin descargar nada, sin saber astronomía ni software avanzado.
        Cualquiera puede parpadear el cielo como lo hizo Tombaugh.
      </Lead>
    </Shell>
  );
}

function SlideChatbot() {
  return (
    <Shell>
      <Kicker>Segunda capa</Kicker>
      <Title>Un guía inteligente en la pantalla</Title>
      <Lead>
        El chatbot integrado te dice qué astro conocido hay en las coordenadas
        que estás mirando. Si el punto no coincide con catálogos, el modelo lo
        marca como región desconocida.
      </Lead>
      <div className="flex max-w-2xl flex-col gap-3 text-left">
        <p className="rounded-2xl rounded-bl-sm bg-slate-800 px-4 py-3 text-slate-200">
          ¿Qué hay en 232.66, −10.72?
        </p>
        <p className="rounded-2xl rounded-br-sm bg-sky-900/60 px-4 py-3 text-sky-100">
          Es una región sin objetos catalogados brillantes. El modelo sugiere
          mirar aquí: hay candidatos que merecen una segunda visita.
        </p>
      </div>
      <Lead>
        El modelo prioriza candidatos para que el tiempo humano vaya a la caza
        prometedora.
      </Lead>
    </Shell>
  );
}

function SlideData() {
  const items = [
    [
      'Fuente',
      'Bucket público nasa-irsa-spherex (QR2 y QR3, Nivel 2) + servicio SIA2/IRSA',
    ],
    [
      'Pipeline',
      'Recortes de ~MB en vez de FITS de 70 MB; alineación entre épocas verificada con PoCs',
    ],
    [
      'En vivo',
      'Frontend desplegado en CloudFront; backend sirviendo épocas reales de SPHEREx',
    ],
  ];
  return (
    <Shell>
      <Kicker>Datos y resultados</Kicker>
      <Title>Construido sobre datos reales de la NASA</Title>
      <div className="flex w-full max-w-3xl flex-col gap-3 text-left">
        {items.map(([k, v]) => (
          <p
            key={k}
            className="rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 text-slate-200"
          >
            <span className="font-semibold text-white">{k}: </span>
            {v}
          </p>
        ))}
      </div>
    </Shell>
  );
}

function SlideClose() {
  return (
    <Shell>
      <Kicker>Impacto</Kicker>
      <Title>Democratizar la exploración</Title>
      <Lead>
        La mayoría de los cometas y enanas marrones conocidos se descubrió con
        voluntarios comparando imágenes. Si el Planeta X existe, se vería aquí:
        como un punto que se mueve lento entre dos visitas.
      </Lead>
      <p className="max-w-3xl text-xl font-semibold text-white">
        Estamos democratizando la educación para todo investigador, sea nuevo o
        no: el mismo dato y la misma técnica — la que Tombaugh usó para
        encontrar a Plutón.
      </p>
      <p className="text-2xl font-bold text-sky-300">
        BlinkX. Mira cómo se mueve el cielo.
      </p>
    </Shell>
  );
}

const SLIDES = [
  SlideVideo,
  SlideArchitecture,
  SlideProblem,
  SlideChallenge,
  SlideSolution,
  SlideChatbot,
  SlideData,
  SlideClose,
];

export default function Slides() {
  const [index, setIndex] = useState(0);
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
    <div className="space-bg min-h-screen text-slate-100">
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
          className="rounded-full border border-slate-600 bg-slate-900/80 p-2 text-slate-200 disabled:opacity-30"
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
              className={`h-2.5 w-2.5 rounded-full ${i === index ? 'bg-sky-400' : 'bg-slate-600'}`}
            />
          ))}
          <span className="ml-3 text-sm text-slate-400">
            {index + 1} / {SLIDES.length} · ← → para navegar
          </span>
        </div>
        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === last}
          aria-label="Siguiente"
          className="rounded-full border border-slate-600 bg-slate-900/80 p-2 text-slate-200 disabled:opacity-30"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </nav>
    </div>
  );
}
