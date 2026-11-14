// Configuración del frontend. Ver frontend/.env.example.
export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ?? 'http://127.0.0.1:8000';

export function resolvePngUrl(pngUrl) {
  return new URL(pngUrl, BACKEND_URL).href;
}
