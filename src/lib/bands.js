// Bandas espectrales SPHEREx D1-D6.
// Fuente: contrato v1 (analysis-artifacts/docs/contrato-frames-v1.md).

export const BANDS = [
  { id: 'D1', minUm: 0.75, maxUm: 1.09 },
  { id: 'D2', minUm: 1.1, maxUm: 1.62 },
  { id: 'D3', minUm: 1.63, maxUm: 2.41 },
  { id: 'D4', minUm: 2.42, maxUm: 3.82 },
  { id: 'D5', minUm: 3.83, maxUm: 4.41 },
  { id: 'D6', minUm: 4.42, maxUm: 5.0 },
];

export function isValidBand(value) {
  return BANDS.some((band) => band.id === value);
}

export function bandLabel(band) {
  return `${band.id} (${band.minUm.toFixed(2)}–${band.maxUm.toFixed(2)} µm)`;
}
