import { act, renderHook } from '@testing-library/react';
import { expect, test } from 'vitest';
import { useSkyConfig } from './useSkyConfig.js';

test('showReferenceAnimation carga el manifiesto GIF de demostración', () => {
  const { result } = renderHook(() => useSkyConfig());
  act(() => {
    result.current.showReferenceAnimation();
  });
  expect(result.current.status).toBe('ready');
  expect(result.current.manifest?.mockGif).toBe(true);
  expect(result.current.manifest?.frames).toHaveLength(3);
});
