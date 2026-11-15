import gifUrl from '../assets/sky-epocas.gif';

export default function SkyGif({ caption }) {
  return (
    <figure className="blink">
      <div className="blink-frame">
        <img
          src={gifUrl}
          alt="Animación de SPHEREx: el mismo cielo en tres épocas (banda D3)."
          className="block aspect-square w-full object-cover"
        />
        <span className="blink-epoch" aria-hidden="true">
          3 épocas · D3
        </span>
      </div>
      <figcaption>
        {caption ??
          'El mismo cielo en distintas épocas (SPHEREx, banda D3). Las estrellas quedan fijas; lo que salta es el candidato.'}
      </figcaption>
    </figure>
  );
}
