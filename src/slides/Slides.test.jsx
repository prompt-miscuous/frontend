import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import { ThemeProvider } from '../contexts/ThemeContext.jsx';
import Slides from './Slides.jsx';

test('opens on the portada and advances with arrow keys', () => {
  render(
    <ThemeProvider>
      <Slides />
    </ThemeProvider>
  );
  expect(screen.getByRole('heading', { name: 'BlinkX' })).toBeInTheDocument();
  expect(screen.getByText(/1 \/ 9/)).toBeInTheDocument();

  fireEvent.keyDown(window, { key: 'ArrowRight' });
  expect(
    screen.getByRole('heading', { name: 'El problema' })
  ).toBeInTheDocument();
  expect(screen.getByText(/2 \/ 9/)).toBeInTheDocument();
});
