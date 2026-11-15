import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import SkyMap from './SkyMap.jsx';

test('muestra el mapa celeste ornamental con su pie', () => {
  render(<SkyMap />);
  expect(
    screen.getByAltText(/Mapa cartográfico de todo el cielo observable/)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Todo el cielo observable en un solo mapa/)
  ).toBeInTheDocument();
});
