// Secciones del sitio. La navegación usa el hash (#/demo, #/informacion…)
// para no añadir dependencias y para convivir con ?ra=&dec=&size=&band=.

export const ROUTES = [
  {
    id: 'demo',
    label: 'Demo',
    title: 'Planet X and SPHEREx — Visor del cielo',
    summary: 'Genera el time-lapse de una región.',
  },
  {
    id: 'informacion',
    label: 'Información',
    title: 'Información — BlinkX',
    summary: 'Qué es BlinkX y cómo funciona.',
  },
  {
    id: 'planes',
    label: 'Planes',
    title: 'Planes — BlinkX',
    summary: 'El acceso actual y lo que evaluamos.',
  },
  {
    id: 'ia',
    label: 'IA',
    title: 'IA — BlinkX',
    summary: 'Detección asistida, en desarrollo.',
  },
];

export const DEFAULT_ROUTE = 'demo';

export function hrefFor(id) {
  return `#/${id}`;
}

/**
 * Devuelve el id de la sección para un hash de ruta ("#/planes").
 * Un hash que no es de ruta (vacío, "#inicio"…) devuelve null para que
 * quien llama conserve la sección actual.
 */
export function routeFromHash(hash) {
  if (!hash || !hash.startsWith('#/')) return null;
  const id = hash.slice(2).split(/[/?]/)[0].toLowerCase();
  return ROUTES.some((route) => route.id === id) ? id : DEFAULT_ROUTE;
}

export function getRoute(id) {
  return ROUTES.find((route) => route.id === id) ?? ROUTES[0];
}
