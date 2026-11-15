// Contenido de la página «Información».
// Traducción al español de frontmark.md. Para cambiar el texto de la página
// basta con editar este archivo; InfoPage.jsx solo lo maqueta.

export const INFORMACION = {
  titulo: 'Qué es BlinkX',
  entrada:
    'BlinkX es una aplicación web pública que convierte las observaciones de SPHEREx, de la NASA, en breves videos time-lapse de cualquier región del cielo.',
  resumen: [
    'El usuario introduce las coordenadas de una zona del cielo —ascensión recta y declinación— junto con un tamaño y una banda infrarroja. El backend consulta el archivo de la misión para encontrar todas las observaciones que cubren ese punto en distintas épocas, descarga pequeños recortes en lugar de archivos completos, los alinea sobre una cuadrícula común, los convierte en imágenes y devuelve los cuadros al navegador, que los reproduce como un video en bucle con la fecha de cada época.',
    'Sin descargas, sin instalaciones y sin necesidad de saber astronomía.',
  ],

  beneficio: {
    titulo: 'Beneficio principal',
    parrafos: [
      'El principal beneficio es una simplificación radical. Trabajar con datos de SPHEREx suele implicar manejar archivos FITS de más de 60 MB, sistemas de coordenadas celestes y un esquema espectral de 102 canales repartido entre detectores y pasos de apuntado.',
      'BlinkX oculta todo eso detrás de un formulario y un botón de reproducción, y conserva la ciencia: la banda, la época y los indicadores de calidad de los datos acompañan a cada cuadro.',
      'Su impacto esperado es ampliar la base de voluntarios que busca objetos en movimiento. Como la mayoría de los cometas y enanas marrones conocidos fueron descubiertos por voluntarios que comparaban imágenes a lo largo del tiempo, reducir esa tarea a un solo clic multiplica directamente las probabilidades de nuevos hallazgos, incluido un posible Planeta X.',
    ],
  },

  tecnologia: {
    titulo: 'Tecnología',
    entrada: 'Construimos BlinkX con:',
    elementos: [
      { termino: 'Frontend', detalle: 'React, Vite y Tailwind CSS' },
      {
        termino: 'Backend',
        detalle: 'Python, FastAPI, Astropy, NumPy y reproject',
      },
      {
        termino: 'Infraestructura',
        detalle: 'AWS gestionado con Terraform, con S3 y CloudFront',
      },
      {
        termino: 'Fuentes de datos',
        detalle:
          'NASA/IPAC Infrared Science Archive, mediante su API pública de búsqueda SIA2 y su servicio de recortes IBE',
      },
      {
        termino: 'Datos de la misión',
        detalle: 'SPHEREx Quick Release, alojado en AWS Open Data',
      },
    ],
    cierre:
      'El desarrollo se hizo en portátiles comunes con la capa gratuita de AWS, sin hardware especial.',
  },

  flujo: {
    titulo: 'Flujo de datos',
    parrafos: [
      'La aplicación obtiene los datos en vivo del NASA/IPAC Infrared Science Archive. En lugar de descargar archivos FITS completos, BlinkX solicita pequeños recortes alrededor de las coordenadas que elige el usuario.',
    ],
    entradaPasos: 'Después, el backend:',
    pasos: [
      'Busca las observaciones que cubren la región solicitada.',
      'Obtiene los recortes correspondientes a cada época.',
      'Procesa las imágenes astronómicas con Astropy y NumPy.',
      'Reproyecta las imágenes sobre una cuadrícula común.',
      'Convierte las observaciones procesadas en cuadros.',
      'Envía los cuadros al navegador.',
      'Los cuadros se reproducen en secuencia como un time-lapse en bucle, con sus fechas de observación.',
    ],
  },

  creatividad: {
    titulo: 'Qué hace creativo a BlinkX',
    parrafos: [
      'Lo que hace creativo a BlinkX es que trata el tiempo, y no el espectro, como la dimensión del descubrimiento.',
      'En lugar de mostrar 102 canales estáticos, vuelve a reproducir el cielo y deja que el movimiento hable por sí solo: el mismo principio de comparación por parpadeo que permitió descubrir Plutón, reconstruido para la era de los sondeos infrarrojos de todo el cielo.',
      'Este enfoque transforma un flujo complejo de análisis de datos astronómicos en una experiencia visual intuitiva que cualquiera puede usar.',
    ],
  },

  compromisos: {
    titulo: 'Compromisos de ingeniería',
    entrada:
      'Durante el desarrollo, el equipo tuvo que sopesar varios compromisos reales:',
    elementos: [
      {
        termino: 'Recortes frente a archivos completos',
        detalle: 'reducir el ancho de banda y el procesamiento necesarios.',
      },
      {
        termino: 'Rotación en cada época',
        detalle: 'obliga a reproyectar antes de animar.',
      },
      {
        termino: 'Diferencias de longitud de onda dentro de una banda',
        detalle: 'mantener la coherencia científica entre observaciones.',
      },
      {
        termino: 'Límites de truncamiento silencioso de la API',
        detalle:
          'asegurar que los resultados de búsqueda no queden incompletos sin que nadie lo note.',
      },
      {
        termino: 'Infraestructura solo con la capa gratuita',
        detalle: 'mantener todo el sistema dentro de un presupuesto estricto.',
      },
    ],
  },

  cierre:
    'BlinkX combina procesamiento de datos astronómicos, infraestructura en la nube y una interfaz visual intuitiva para que explorar las observaciones de SPHEREx sea muchísimo más fácil: convierte un archivo complejo en algo tan simple como elegir una zona del cielo y pulsar reproducir.',
};
