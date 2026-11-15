import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import SkyMap from './SkyMap.jsx';

test('muestra el mapa y al hacer clic pasa a la animación de épocas', () => {
  render(<SkyMap />);
  expect(
    screen.getByAltText(/Mapa cartográfico de todo el cielo observable/)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Todo el cielo observable en un solo mapa/)
  ).toBeInTheDocument();

  fireEvent.click(
    screen.getByRole('button', {
      name: 'Ver la animación de épocas de SPHEREx',
    })
  );
  expect(
    screen.getByAltText(/Animación de SPHEREx: el mismo cielo en tres épocas/)
  ).toBeInTheDocument();
});

test('ofrece botón de pantalla completa', () => {
  render(<SkyMap />);
  expect(
    screen.getByRole('button', { name: 'Ver el mapa en pantalla completa' })
  ).toBeInTheDocument();
});
