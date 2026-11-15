import { describe, expect, test } from 'vitest';
import { buildGifMockManifest } from './gifMock.js';
import { DEFAULTS, isDemoSearch } from './validation.js';

describe('isDemoSearch', () => {
  test('reconoce las coordenadas conectadas (WISE 0855)', () => {
    expect(isDemoSearch({ ra: DEFAULTS.ra, dec: DEFAULTS.dec })).toBe(true);
  });

  test('rechaza cualquier otra búsqueda', () => {
    expect(isDemoSearch({ ra: 10, dec: 20 })).toBe(false);
    expect(isDemoSearch({ ra: DEFAULTS.ra, dec: 0 })).toBe(false);
  });
});

describe('buildGifMockManifest', () => {
  test('marca el manifiesto como mock con 3 épocas', () => {
    const manifest = buildGifMockManifest({
      ra: 10,
      dec: 20,
      size: 0.25,
      band: 'D3',
    });
    expect(manifest.mockGif).toBe(true);
    expect(manifest.simulated).toBe(true);
    expect(manifest.frames).toHaveLength(3);
    expect(manifest.params).toEqual({
      ra: 10,
      dec: 20,
      size: 0.25,
      band: 'D3',
      frames: 3,
    });
  });
});
