// Servicio de cuadros. Por defecto llama al backend real (Fase 2);
// con ?mock=1 en la URL usa la simulación local (útil sin backend).
import { BACKEND_URL } from './config.js';

export function delay(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }
    const onAbort = () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    signal?.addEventListener('abort', onAbort);
  });
}

function fakeFrames(count, size, band) {
  const detector = Number(band.slice(1));
  const px = Math.round((size * 3600) / 6.15);
  const baseMjd = 60869.72;
  return Array.from({ length: count }, (_, i) => {
    const mjd = baseMjd + (i * 370) / Math.max(count - 1, 1);
    const date = new Date((mjd - 40587) * 86400000);
    return {
      obs_id: `sim-epoch-${i + 1}`,
      mjd: Math.round(mjd * 100) / 100,
      date_obs: date.toISOString().slice(0, 19),
      detector,
      png_url: null,
      width: px,
      height: px,
      warning: null,
    };
  });
}

export async function fetchFramesMock(
  { ra, dec, size, band, frames = 5 },
  options = {}
) {
  const { signal, delayMs = 900 } = options;
  await delay(delayMs, signal);
  const px = Math.round((size * 3600) / 6.15);
  return {
    simulated: true,
    params: { ra, dec, size, band, frames },
    grid: {
      crs: 'north-up',
      pixel_scale_arcsec: 6.15,
      width: px,
      height: px,
    },
    epochs_available: Math.max(frames, 9),
    frames: fakeFrames(frames, size, band),
    warnings: [],
  };
}

export class FramesError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

export function isMockBackend() {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('mock') === '1';
}

export async function fetchFrames(params, options = {}) {
  if (isMockBackend()) {
    return fetchFramesMock(params, options);
  }
  const query = new URLSearchParams({
    ra: String(params.ra),
    dec: String(params.dec),
    size: String(params.size),
    band: params.band,
    frames: String(params.frames ?? 5),
  });
  let response;
  try {
    response = await fetch(`${BACKEND_URL}/frames?${query.toString()}`, {
      signal: options.signal,
    });
  } catch (error) {
    if (error?.name === 'AbortError') throw error;
    throw new FramesError(
      'backend_unreachable',
      'No se pudo contactar al backend. Revisa que esté corriendo (o añade ?mock=1 a la URL).'
    );
  }
  if (!response.ok) {
    let code = 'unknown';
    let message = `El backend respondió ${response.status}.`;
    try {
      const body = await response.json();
      code = body.code ?? code;
      message = body.message ?? message;
    } catch {
      // Respuesta no JSON: se conserva el mensaje genérico.
    }
    throw new FramesError(code, message);
  }
  return response.json();
}
