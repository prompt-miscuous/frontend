// Validacion pura del formulario. Rangos y defaults del contrato v1.
import { isValidBand } from './bands.js';

/** Coordenadas con datos reales conectados (WISE 0855, valores por defecto). */
export function isDemoSearch({ ra, dec }) {
  const EPS = 1e-4;
  return (
    ra !== null &&
    dec !== null &&
    Math.abs(ra - DEFAULTS.ra) <= EPS &&
    Math.abs(dec - DEFAULTS.dec) <= EPS
  );
}

export const RA_MIN = 0;
export const RA_MAX = 360;
export const DEC_MIN = -90;
export const DEC_MAX = 90;
export const SIZE_MIN = 0.05;
export const SIZE_MAX = 1.0;
export const SIZE_PRESETS = [0.1, 0.25, 0.5, 1.0];

// WISE 0855: AR 08h 55m 10,83s / Dec -07° 14' 42,5" (J2000) en grados.
export const DEFAULTS = { ra: 133.7951, dec: -7.2451, size: 0.25, band: 'D3' };

export const ERROR_MESSAGES = {
  ra: 'La ascensión recta debe estar entre 0° y 360°.',
  dec: 'La declinación debe estar entre -90° y +90°.',
  size: 'Introduce un tamaño entre 0,05° y 1,00°.',
  band: 'Selecciona una banda disponible.',
};

/** Acepta punto o coma decimal; devuelve número finito o null. */
export function parseNumber(raw) {
  if (raw === null || raw === undefined) return null;
  const text = String(raw).trim().replace(',', '.');
  if (text === '') return null;
  const value = Number(text);
  return Number.isFinite(value) ? value : null;
}

function inRange(value, min, max) {
  return value !== null && value >= min && value <= max;
}

export function validateRa(raw) {
  return inRange(parseNumber(raw), RA_MIN, RA_MAX) ? null : ERROR_MESSAGES.ra;
}

export function validateDec(raw) {
  return inRange(parseNumber(raw), DEC_MIN, DEC_MAX)
    ? null
    : ERROR_MESSAGES.dec;
}

export function validateSize(raw) {
  return inRange(parseNumber(raw), SIZE_MIN, SIZE_MAX)
    ? null
    : ERROR_MESSAGES.size;
}

export function validateBand(value) {
  return isValidBand(value) ? null : ERROR_MESSAGES.band;
}

export function validateAll({ ra, dec, size, band }) {
  const errors = {
    ra: validateRa(ra),
    dec: validateDec(dec),
    size: validateSize(size),
    band: validateBand(band),
  };
  const values = {
    ra: errors.ra ? null : parseNumber(ra),
    dec: errors.dec ? null : parseNumber(dec),
    size: errors.size ? null : parseNumber(size),
    band: errors.band ? null : band,
  };
  const isValid = !errors.ra && !errors.dec && !errors.size && !errors.band;
  return { errors, values, isValid };
}
