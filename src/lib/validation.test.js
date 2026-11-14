import { describe, expect, test } from 'vitest';
import {
  DEFAULTS,
  ERROR_MESSAGES,
  parseNumber,
  validateAll,
  validateBand,
  validateDec,
  validateRa,
  validateSize,
} from './validation.js';

describe('parseNumber', () => {
  test('acepta punto y coma decimal', () => {
    expect(parseNumber('133.7951')).toBe(133.7951);
    expect(parseNumber('133,7951')).toBe(133.7951);
    expect(parseNumber('  -7.24  ')).toBe(-7.24);
  });

  test('rechaza vacíos y no numéricos', () => {
    expect(parseNumber('')).toBeNull();
    expect(parseNumber('   ')).toBeNull();
    expect(parseNumber(null)).toBeNull();
    expect(parseNumber('abc')).toBeNull();
    expect(parseNumber('Infinity')).toBeNull();
  });
});

describe('rangos', () => {
  test('RA acepta 0–360 inclusive', () => {
    expect(validateRa('0')).toBeNull();
    expect(validateRa('360')).toBeNull();
    expect(validateRa('-0.1')).toBe(ERROR_MESSAGES.ra);
    expect(validateRa('360.1')).toBe(ERROR_MESSAGES.ra);
    expect(validateRa('')).toBe(ERROR_MESSAGES.ra);
  });

  test('Dec acepta −90–+90 inclusive', () => {
    expect(validateDec('-90')).toBeNull();
    expect(validateDec('90')).toBeNull();
    expect(validateDec('-90.1')).toBe(ERROR_MESSAGES.dec);
    expect(validateDec('90.1')).toBe(ERROR_MESSAGES.dec);
  });

  test('tamaño acepta 0,05–1,00 y rechaza cero o negativos', () => {
    expect(validateSize('0.05')).toBeNull();
    expect(validateSize('1')).toBeNull();
    expect(validateSize('0')).toBe(ERROR_MESSAGES.size);
    expect(validateSize('-0.5')).toBe(ERROR_MESSAGES.size);
    expect(validateSize('1.01')).toBe(ERROR_MESSAGES.size);
    expect(validateSize('')).toBe(ERROR_MESSAGES.size);
  });

  test('banda exige D1–D6 y rechaza W1', () => {
    for (const id of ['D1', 'D2', 'D3', 'D4', 'D5', 'D6']) {
      expect(validateBand(id)).toBeNull();
    }
    expect(validateBand('W1')).toBe(ERROR_MESSAGES.band);
    expect(validateBand('')).toBe(ERROR_MESSAGES.band);
  });
});

describe('validateAll', () => {
  test('los defaults del contrato son válidos', () => {
    const result = validateAll({
      ra: String(DEFAULTS.ra),
      dec: String(DEFAULTS.dec),
      size: String(DEFAULTS.size),
      band: DEFAULTS.band,
    });
    expect(result.isValid).toBe(true);
    expect(result.values).toEqual(DEFAULTS);
  });

  test('reporta cada campo inválido por separado', () => {
    const result = validateAll({
      ra: '999',
      dec: '0',
      size: '0.25',
      band: 'D3',
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.ra).toBe(ERROR_MESSAGES.ra);
    expect(result.errors.dec).toBeNull();
    expect(result.values.ra).toBeNull();
    expect(result.values.dec).toBe(0);
  });
});
