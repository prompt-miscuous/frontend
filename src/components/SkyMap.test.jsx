import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import SkyMap from './SkyMap.jsx';

test('muestra el mapa y avisa al hacer clic para animar el reproductor', () => {
  const onShowAnimation = vi.fn();
  render(<SkyMap onShowAnimation={onShowAnimation} />);
  expect(
    screen.getByAltText(/Mapa cartográfico de todo el cielo observable/)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Todo el cielo observable en un solo mapa/)
  ).toBeInTheDocument();

  fireEvent.click(
    screen.getByRole('button', {
      name: 'Ver la animación de épocas en el reproductor',
    })
  );
  expect(onShowAnimation).toHaveBeenCalledTimes(1);
});

test('ofrece botón de pantalla completa', () => {
  render(<SkyMap onShowAnimation={() => {}} />);
  expect(
    screen.getByRole('button', { name: 'Ver el mapa en pantalla completa' })
  ).toBeInTheDocument();
});
