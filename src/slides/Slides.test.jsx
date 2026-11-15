import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import Slides from './Slides.jsx';

test('opens on the portada and advances with arrow keys', () => {
  render(<Slides />);
  expect(screen.getByRole('heading', { name: 'BlinkX' })).toBeInTheDocument();
  expect(screen.getByText(/1 \/ 8/)).toBeInTheDocument();

  fireEvent.keyDown(window, { key: 'ArrowRight' });
  expect(
    screen.getByRole('heading', { name: 'La arquitectura, en una imagen' })
  ).toBeInTheDocument();
  expect(screen.getByText(/2 \/ 8/)).toBeInTheDocument();
});
