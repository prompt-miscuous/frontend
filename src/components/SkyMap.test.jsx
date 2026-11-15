import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import SkyMap from './SkyMap.jsx';

test('muestra el mapa celeste ornamental con su pie', () => {
  render(<SkyMap />);
  expect(
    screen.getByAltText(/Mapa celeste ornamental: la Vía Láctea/)
  ).toBeInTheDocument();
  expect(screen.getByText(/todo ese cielo en 102 bandas/)).toBeInTheDocument();
});
