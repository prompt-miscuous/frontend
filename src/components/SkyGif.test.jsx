import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import SkyGif from './SkyGif.jsx';

test('muestra la animación de épocas con su pie', () => {
  render(<SkyGif caption="Pie de prueba" />);
  expect(
    screen.getByAltText(/Animación de SPHEREx: el mismo cielo en tres épocas/)
  ).toBeInTheDocument();
  expect(screen.getByText('Pie de prueba')).toBeInTheDocument();
});
