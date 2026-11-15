import mapa from '../assets/mapa-cielo.jpg';

export default function SkyMap() {
  return (
    <figure className="glass-panel overflow-hidden rounded-2xl">
      <img
        src={mapa}
        alt="Mapa cartográfico de todo el cielo observable desde la Tierra: proyección oval con grilla de ascensión recta y declinación, Vía Láctea y constelaciones"
        className="block aspect-[21/9] w-full object-cover"
      />
      <figcaption className="px-5 py-3 text-xs text-[var(--muted)]">
        Todo el cielo observable en un solo mapa. SPHEREx lo vuelve a
        fotografiar entero cada seis meses, en 102 bandas.
      </figcaption>
    </figure>
  );
}
