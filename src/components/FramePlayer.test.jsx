import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { resolvePngUrl } from '../lib/config.js';
import FramePlayer from './FramePlayer.jsx';

const MANIFEST = {
  frames: [
    {
      obs_id: 'obs-1',
      mjd: 60869.72,
      date_obs: '2025-07-13T17:19:27',
      png_url: '/frames/img/k/00.png',
    },
    {
      obs_id: 'obs-2',
      mjd: 61028.19,
      date_obs: '2026-02-20T16:38:52',
      png_url: '/frames/img/k/01.png',
    },
  ],
};

afterEach(() => {
  vi.useRealTimers();
});

describe('resolvePngUrl', () => {
  test('resuelve rutas relativas contra el backend', () => {
    expect(resolvePngUrl('/frames/img/k/00.png')).toBe(
      'http://127.0.0.1:8000/frames/img/k/00.png'
    );
  });
});

describe('FramePlayer', () => {
  test('muestra la primera época con sus metadatos', () => {
    render(<FramePlayer manifest={MANIFEST} />);
    const img = screen.getByRole('img', { name: /obs-1/ });
    expect(img).toHaveAttribute(
      'src',
      'http://127.0.0.1:8000/frames/img/k/00.png'
    );
    expect(screen.getByText(/Época 1\/2/)).toHaveTextContent('MJD 60869.72');
  });

  test('el slider cambia de época', () => {
    render(<FramePlayer manifest={MANIFEST} />);
    fireEvent.change(screen.getByRole('slider', { name: 'Época' }), {
      target: { value: '1' },
    });
    expect(screen.getByRole('img', { name: /obs-2/ })).toBeInTheDocument();
  });

  test('reproducir avanza automáticamente', () => {
    vi.useFakeTimers();
    render(<FramePlayer manifest={MANIFEST} />);
    fireEvent.click(screen.getByRole('button', { name: 'Reproducir' }));
    act(() => {
      vi.advanceTimersByTime(900);
    });
    expect(screen.getByRole('img', { name: /obs-2/ })).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(900);
    });
    expect(screen.getByRole('img', { name: /obs-1/ })).toBeInTheDocument();
  });

  test('invertir aplica el filtro y diferencia muestra el lienzo', () => {
    render(<FramePlayer manifest={MANIFEST} />);
    fireEvent.click(screen.getByLabelText('Invertir'));
    expect(screen.getByRole('img', { name: /obs-1/ })).toHaveStyle({
      filter: 'invert(1)',
    });
    fireEvent.click(screen.getByLabelText('Diferencia'));
    expect(
      screen.getByRole('img', { name: 'Diferencia entre épocas' })
    ).toBeInTheDocument();
  });
});
