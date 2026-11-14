import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  FramesError,
  fetchFrames,
  fetchFramesMock,
  isMockBackend,
} from './api.js';

const PARAMS = { ra: 1, dec: 2, size: 0.25, band: 'D3', frames: 3 };

afterEach(() => {
  vi.unstubAllGlobals();
  window.history.replaceState(null, '', '/');
});

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

describe('fetchFrames (backend real)', () => {
  test('pide GET /frames con los parámetros y devuelve el manifiesto', async () => {
    const manifest = { params: PARAMS, frames: [] };
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(manifest));
    vi.stubGlobal('fetch', fetchMock);
    const result = await fetchFrames(PARAMS);
    expect(result).toEqual(manifest);
    const [url] = fetchMock.mock.calls[0];
    expect(url).toContain('/frames?');
    expect(url).toContain('band=D3');
  });

  test('mapea errores HTTP a FramesError con código', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          jsonResponse({ code: 'no_coverage', message: 'Sin cobertura.' }, 404)
        )
    );
    const error = await fetchFrames(PARAMS).catch((err) => err);
    expect(error).toBeInstanceOf(FramesError);
    expect(error.code).toBe('no_coverage');
    expect(error.message).toBe('Sin cobertura.');
  });

  test('caída de red da backend_unreachable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('x')));
    const error = await fetchFrames(PARAMS).catch((err) => err);
    expect(error).toBeInstanceOf(FramesError);
    expect(error.code).toBe('backend_unreachable');
  });

  test('respeta AbortSignal', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new DOMException('Aborted', 'AbortError'))
    );
    const controller = new AbortController();
    controller.abort();
    await expect(
      fetchFrames(PARAMS, { signal: controller.signal })
    ).rejects.toMatchObject({ name: 'AbortError' });
  });
});

describe('modo mock (?mock=1)', () => {
  test('isMockBackend lee el parámetro', () => {
    expect(isMockBackend()).toBe(false);
    window.history.replaceState(null, '', '/?mock=1');
    expect(isMockBackend()).toBe(true);
  });

  test('fetchFrames usa la simulación con ?mock=1 sin tocar fetch', async () => {
    window.history.replaceState(null, '', '/?mock=1');
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const manifest = await fetchFrames(PARAMS, { delayMs: 0 });
    expect(manifest.simulated).toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test('el manifiesto simulado conserva la forma del contrato', async () => {
    const manifest = await fetchFramesMock(PARAMS, { delayMs: 0 });
    expect(manifest.grid).toMatchObject({
      crs: 'north-up',
      pixel_scale_arcsec: 6.15,
    });
    expect(manifest.grid.width).toBe(146);
    expect(manifest.frames).toHaveLength(3);
    expect(manifest.frames[0]).toMatchObject({ detector: 3, png_url: null });
    const mjds = manifest.frames.map((frame) => frame.mjd);
    expect([...mjds].sort((a, b) => a - b)).toEqual(mjds);
  });
});
