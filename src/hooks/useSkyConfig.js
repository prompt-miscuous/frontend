// Estado de configuracion: formulario + sincronizacion con la URL +
// generacion simulada. La Fase 3 solo cambia fetchFrames por el real.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchFrames } from '../lib/api.js';
import { buildGifMockManifest } from '../lib/gifMock.js';
import { buildSearch, parseUrlParams } from '../lib/urlParams.js';
import { DEFAULTS, isDemoSearch, validateAll } from '../lib/validation.js';

function defaultInputs() {
  return {
    ra: String(DEFAULTS.ra),
    dec: String(DEFAULTS.dec),
    size: String(DEFAULTS.size),
  };
}

export function useSkyConfig() {
  const [initial] = useState(() =>
    typeof window === 'undefined'
      ? { inputs: defaultInputs(), band: DEFAULTS.band, invalidKeys: [] }
      : parseUrlParams(window.location.search)
  );
  const [inputs, setInputs] = useState(initial.inputs);
  const [band, setBand] = useState(initial.band);
  const [status, setStatus] = useState('idle'); // idle | loading | ready | error
  const [manifest, setManifest] = useState(null);
  const [requestId, setRequestId] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [copied, setCopied] = useState(false);
  const abortRef = useRef(null);
  const copiedTimer = useRef(null);

  const { errors, values, isValid } = useMemo(
    () => validateAll({ ...inputs, band }),
    [inputs, band]
  );

  const urlWarning =
    initial.invalidKeys.length > 0
      ? `Parámetros inválidos en la URL (${initial.invalidKeys.join(', ')}): se usaron los valores de WISE 0855.`
      : null;

  // Espejo formulario -> URL, sin recargar. Se conserva el hash porque
  // ahí vive la sección activa (#/demo, #/informacion…).
  useEffect(() => {
    if (!isValid) return;
    const search = buildSearch(values, window.location.search);
    if (window.location.search !== search) {
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}${search}${window.location.hash}`
      );
    }
  }, [isValid, values]);

  useEffect(
    () => () => {
      abortRef.current?.abort();
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    },
    []
  );

  const touch = useCallback(() => {
    setStatus('idle');
    setManifest(null);
    setErrorMessage(null);
  }, []);

  const setInput = useCallback(
    (field, value) => {
      setInputs((prev) => ({ ...prev, [field]: value }));
      touch();
    },
    [touch]
  );

  const changeBand = useCallback(
    (value) => {
      setBand(value);
      touch();
    },
    [touch]
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setInputs(defaultInputs());
    setBand(DEFAULTS.band);
    setStatus('idle');
    setManifest(null);
    setErrorMessage(null);
  }, []);

  const generate = useCallback(async () => {
    if (!isValid) return;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setStatus('loading');
    setManifest(null);
    setErrorMessage(null);
    // Búsquedas fuera de las coordenadas conectadas: GIF de demostración.
    if (!isDemoSearch(values)) {
      setManifest(buildGifMockManifest(values));
      setStatus('ready');
      setRequestId((id) => id + 1);
      return;
    }
    try {
      const result = await fetchFrames(
        { ...values, frames: 5 },
        { signal: controller.signal }
      );
      setManifest(result);
      setStatus('ready');
      setRequestId((id) => id + 1);
    } catch (error) {
      if (error?.name === 'AbortError') {
        setStatus('idle');
      } else {
        setStatus('error');
        setErrorMessage(
          error?.message ?? 'No se pudo generar la región. Inténtalo de nuevo.'
        );
      }
    }
  }, [isValid, values]);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 2000);
      return true;
    } catch {
      setCopied(false);
      return false;
    }
  }, []);

  return {
    inputs,
    band,
    errors,
    values: isValid ? values : null,
    isValid,
    urlWarning,
    status,
    manifest,
    requestId,
    errorMessage,
    copied,
    setInput,
    changeBand,
    reset,
    generate,
    copyLink,
  };
}
