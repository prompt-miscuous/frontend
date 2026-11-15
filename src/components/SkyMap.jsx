import mapa from '../assets/mapa-cielo.jpg';

export default function SkyMap() {
  return (
    <figure className="glass-panel overflow-hidden rounded-2xl">
      <img
        src={mapa}
        alt="Mapa celeste ornamental: la Vía Láctea cruzando la esfera celeste con su grilla de coordenadas"
        className="block aspect-[21/9] w-full object-cover"
      />
      <figcaption className="px-5 py-3 text-xs text-[var(--muted)]">
        La esfera celeste y la Vía Láctea: todo ese cielo en 102 bandas es lo
        que SPHEREx está fotografiando.
      </figcaption>
    </figure>
  );
}
