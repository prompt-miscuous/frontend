import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';
import ChatMock from './ChatMock.jsx';

test('abre el chat, muestra el saludo y responde sobre WISE 0855', async () => {
  render(<ChatMock />);

  fireEvent.click(
    screen.getByRole('button', { name: 'Abrir el chat del asistente' })
  );
  expect(
    screen.getByRole('dialog', { name: 'Chat con el asistente de BlinkX' })
  ).toBeInTheDocument();
  expect(screen.getByText(/Estás mirando WISE 0855/)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: '¿Se mueve WISE 0855?' }));
  await waitFor(() =>
    expect(
      screen.getByText(/candidato perfecto para parpadear/)
    ).toBeInTheDocument()
  );

  fireEvent.click(screen.getByRole('button', { name: 'Cerrar el chat' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
