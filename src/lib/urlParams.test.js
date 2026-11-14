import { describe, expect, test } from 'vitest';
import { DEFAULTS } from './validation.js';
import { buildSearch, parseUrlParams } from './urlParams.js';

describe('parseUrlParams', () => {
  test('sin parámetros devuelve defaults sin aviso', () => {
    const result = parseUrlParams('');
    expect(result.hadParams).toBe(false);
    expect(result.invalidKeys).toEqual([]);
    expect(result.inputs).toEqual({
      ra: String(DEFAULTS.ra),
      dec: String(DEFAULTS.dec),
      size: String(DEFAULTS.size),
    });
    expect(result.band).toBe(DEFAULTS.band);
  });

  test('aplica parámetros válidos', () => {
    const result = parseUrlParams('?ra=200&dec=10&size=0.5&band=D6');
    expect(result.invalidKeys).toEqual([]);
    expect(result.inputs).toEqual({ ra: '200', dec: '10', size: '0.5' });
    expect(result.band).toBe('D6');
  });

  test('marca inválidos y conserva el resto', () => {
    const result = parseUrlParams('?ra=999&dec=10&size=0.5&band=W1');
    expect(result.invalidKeys).toEqual(['ra', 'band']);
    expect(result.fallbackValues.dec).toBe(10);
    expect(result.fallbackValues.ra).toBe(DEFAULTS.ra);
    expect(result.band).toBe(DEFAULTS.band);
  });
});

describe('buildSearch', () => {
  test('serializa con los nombres del contrato', () => {
    expect(
      buildSearch({ ra: 133.7951, dec: -7.2451, size: 0.25, band: 'D3' })
    ).toBe('?ra=133.7951&dec=-7.2451&size=0.25&band=D3');
  });

  test('roundtrip parse-url → build → parse-url', () => {
    const values = { ra: 200, dec: -10.5, size: 1, band: 'D1' };
    const parsed = parseUrlParams(buildSearch(values));
    expect(parsed.invalidKeys).toEqual([]);
    expect(parsed.fallbackValues).toEqual(values);
  });

  test('conserva parámetros ajenos como mock=1', () => {
    const values = { ra: 200, dec: 10, size: 0.5, band: 'D6' };
    expect(buildSearch(values, '?mock=1&foo=bar')).toBe(
      '?mock=1&foo=bar&ra=200&dec=10&size=0.5&band=D6'
    );
  });
});
