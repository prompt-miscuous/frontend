// Contenido de la página «IA».
// OJO: texto de BORRADOR. En los archivos del proyecto solo consta que existe
// el repositorio model-training (entrenamiento, datasets, preprocesamiento y
// evaluación). Ajusta aquí lo que el modelo hará de verdad.

export const IA = {
  titulo: 'IA',
  estado: 'En desarrollo',
  entrada:
    'Estamos preparando un modelo que revise las épocas por ti y señale qué fuentes cambian de posición. Todavía no está disponible en la demo.',
  secciones: [
    {
      titulo: 'Qué hará',
      parrafos: [
        'Comparará los cuadros ya alineados de una región y marcará los candidatos a objeto en movimiento, para que empieces por lo más prometedor en lugar de revisar cada cuadro a ojo.',
      ],
    },
    {
      titulo: 'Qué no hará',
      parrafos: [
        'No confirmará descubrimientos. El modelo propone y una persona decide: cada marca se podrá comprobar en el reproductor, cuadro por cuadro.',
      ],
    },
  ],
  frentes: {
    titulo: 'Cómo se construye',
    entrada: 'El trabajo del modelo se organiza en cuatro frentes:',
    elementos: [
      {
        termino: 'Conjuntos de datos',
        detalle:
          'secuencias de recortes alineados, con y sin objetos en movimiento.',
      },
      {
        termino: 'Preprocesamiento',
        detalle:
          'la misma reproyección sobre una cuadrícula común que usa la demo.',
      },
      {
        termino: 'Entrenamiento',
        detalle:
          'un modelo que aprenda a separar el movimiento real del ruido y los artefactos.',
      },
      {
        termino: 'Evaluación',
        detalle:
          'cuántos candidatos reales encuentra y cuántas falsas alarmas genera.',
      },
    ],
  },
  ilustracion:
    'Así se vería un candidato marcado sobre la animación. Ilustración, no datos reales.',
};
