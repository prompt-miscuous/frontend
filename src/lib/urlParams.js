// Sincronizacion del estado con ?ra=&dec=&size=&band= (contrato v1 §3).
import { DEFAULTS, validateAll } from './validation.js';

const KEYS = ['ra', 'dec', 'size', 'band'];

export function parseUrlParams(search) {
  const query = new URLSearchParams(search || '');
  const raw = {
    ra: query.get('ra') ?? String(DEFAULTS.ra),
    dec: query.get('dec') ?? String(DEFAULTS.dec),
    size: query.get('size') ?? String(DEFAULTS.size),
    band: query.get('band') ?? DEFAULTS.band,
  };
  const hadParams = KEYS.some((key) => query.get(key) !== null);
  const { errors, values } = validateAll(raw);
  const invalidKeys = KEYS.filter(
    (key) => query.get(key) !== null && errors[key]
  );
  return {
    inputs: { ra: raw.ra, dec: raw.dec, size: raw.size },
    band: errors.band ? DEFAULTS.band : raw.band,
    hadParams,
    invalidKeys,
    fallbackValues: {
      ra: values.ra ?? DEFAULTS.ra,
      dec: values.dec ?? DEFAULTS.dec,
      size: values.size ?? DEFAULTS.size,
      band: values.band ?? DEFAULTS.band,
    },
  };
}

export function buildSearch(values, currentSearch = '') {
  // Conserva parámetros ajenos (p. ej. mock=1).
  const query = new URLSearchParams(currentSearch || '');
  query.set('ra', String(values.ra));
  query.set('dec', String(values.dec));
  query.set('size', String(values.size));
  query.set('band', values.band);
  return `?${query.toString()}`;
}
