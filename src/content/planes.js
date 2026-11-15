// Contenido de la página «Planes».
// OJO: el plan «Explorador» describe lo que la demo hace hoy. Los otros dos
// son una PROPUESTA de borrador (no venían en los archivos del proyecto):
// edítalos o elimínalos aquí antes de publicar.

export const PLANES = {
  titulo: 'Planes',
  entrada:
    'BlinkX es de acceso público y gratuito. Este es el plan disponible hoy y los dos que estamos evaluando.',
  nota:
    'Los planes en evaluación son una propuesta y pueden cambiar. Ninguno tiene precio definido todavía.',
  lista: [
    {
      id: 'explorador',
      nombre: 'Explorador',
      precio: 'Gratis',
      estado: 'disponible',
      resumen: 'Todo lo que BlinkX hace hoy, sin registro.',
      incluye: [
        'Time-lapse de cualquier región con cobertura de SPHEREx',
        'Regiones de 0,05° a 1,00° de lado',
        'Las seis bandas infrarrojas, de D1 a D6',
        'Hasta 5 épocas por animación',
        'Reproductor con velocidad, brillo, contraste y modo diferencia',
        'Enlace para compartir la región configurada',
      ],
      accion: { texto: 'Abrir la demo', ruta: 'demo' },
    },
    {
      id: 'investigador',
      nombre: 'Investigador',
      precio: 'Por definir',
      estado: 'evaluacion',
      resumen:
        'Para quien revisa muchas regiones y necesita conservar su trabajo.',
      incluye: [
        'Más épocas por animación',
        'Descarga de los cuadros con sus metadatos',
        'Historial de regiones revisadas',
      ],
    },
    {
      id: 'institucional',
      nombre: 'Institucional',
      precio: 'A convenir',
      estado: 'evaluacion',
      resumen: 'Para aulas, clubes de astronomía y grupos de voluntarios.',
      incluye: [
        'Acceso por API',
        'Procesamiento de listas de coordenadas',
        'Acompañamiento para grupos',
      ],
    },
  ],
};

export const ESTADOS_PLAN = {
  disponible: 'Disponible hoy',
  evaluacion: 'En evaluación',
};
