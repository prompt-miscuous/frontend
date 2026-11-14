import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import App from '../App.jsx';
import { fetchFramesMock } from '../lib/api.js';

function resetUrl(search = '') {
  window.history.replaceState(null, '', `/${search}`);
}

function mockBackend() {
  return fetchFramesMock(
    { ra: 133.7951, dec: -7.2451, size: 0.25, band: 'D3', frames: 5 },
    { delayMs: 0 }
  ).then(
    (manifest) =>
      new Response(JSON.stringify(manifest), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
  );
}

beforeEach(() => {
  resetUrl();
  vi.stubGlobal('fetch', vi.fn().mockImplementation(mockBackend));
});

afterEach(() => {
  vi.unstubAllGlobals();
  resetUrl();
});

describe('App', () => {
  test('renders the app heading', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: 'Planet X and SPHEREx' })
    ).toBeInTheDocument();
  });

  test('carga los defaults de WISE 0855 sin parámetros', () => {
    render(<App />);
    expect(screen.getByLabelText(/Ascensión recta/)).toHaveValue('133.7951');
    expect(screen.getByLabelText(/Declinación/)).toHaveValue('-7.2451');
    expect(screen.getByLabelText(/Tamaño de la región/)).toHaveValue('0.25');
    expect(screen.getByLabelText(/Banda espectral/)).toHaveValue('D3');
  });

  test('recupera la configuración desde la URL', () => {
    resetUrl('?ra=200&dec=10&size=0.5&band=D6');
    render(<App />);
    expect(screen.getByLabelText(/Ascensión recta/)).toHaveValue('200');
    expect(screen.getByLabelText(/Banda espectral/)).toHaveValue('D6');
  });

  test('avisa y usa defaults ante parámetros inválidos', () => {
    resetUrl('?ra=999&band=W1');
    render(<App />);
    expect(screen.getByRole('status')).toHaveTextContent(/inválidos/);
    expect(screen.getByLabelText(/Ascensión recta/)).toHaveValue('999');
    expect(screen.getByLabelText(/Banda espectral/)).toHaveValue('D3');
  });

  test('RA inválida muestra error y deshabilita generar', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/Ascensión recta/), {
      target: { value: '999' },
    });
    expect(screen.getByRole('alert')).toHaveTextContent(/entre 0° y 360°/);
    expect(
      screen.getByRole('button', { name: 'Generar región' })
    ).toBeDisabled();
  });

  test('los cambios válidos se reflejan en la URL', async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/Ascensión recta/), {
      target: { value: '200' },
    });
    await waitFor(() => {
      expect(window.location.search).toContain('ra=200');
    });
  });

  test('restablecer recupera los defaults', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/Ascensión recta/), {
      target: { value: '200' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: 'Restablecer valores' })
    );
    expect(screen.getByLabelText(/Ascensión recta/)).toHaveValue('133.7951');
  });

  test('generar muestra el resumen del manifiesto', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Generar región' }));
    expect(
      await screen.findByText(
        'Región preparada (simulación local)',
        {},
        { timeout: 3000 }
      )
    ).toBeInTheDocument();
    expect(screen.getByText('sim-epoch-1')).toBeInTheDocument();
  });

  test('un error del backend se muestra como alerta', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            code: 'no_coverage',
            message: 'Sin cobertura aquí.',
          }),
          { status: 404, headers: { 'content-type': 'application/json' } }
        )
      )
    );
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Generar región' }));
    expect(await screen.findByText('Sin cobertura aquí.')).toBeInTheDocument();
  });

  test('copiar enlace usa el portapapeles', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } });
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Copiar enlace' }));
    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(window.location.href);
    });
    expect(
      screen.getByRole('button', { name: '¡Enlace copiado!' })
    ).toBeInTheDocument();
  });
});
