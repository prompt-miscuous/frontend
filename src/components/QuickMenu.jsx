// Menú rápido: botón fijo en la esquina inferior derecha que abre un modal
// con las secciones y las acciones más usadas.
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { ROUTES, hrefFor } from '../lib/routes.js';
import {
  IconClose,
  IconContrast,
  IconLink,
  IconMenuDots,
  IconTarget,
} from './icons.jsx';

const FOCUSABLE = 'a[href], button:not([disabled])';

export default function QuickMenu({ route, onLoadReference }) {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const launcherRef = useRef(null);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const copiedTimer = useRef(null);
  const titleId = useId();

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  useEffect(
    () => () => {
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
    },
    []
  );

  function onKeyDown(event) {
    if (event.key === 'Escape') {
      event.stopPropagation();
      close();
      return;
    }
    if (event.key !== 'Tab') return;
    const items = dialogRef.current?.querySelectorAll(FOCUSABLE);
    if (!items || items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  async function copyRegionLink() {
    const { origin, pathname, search } = window.location;
    try {
      await navigator.clipboard.writeText(
        `${origin}${pathname}${search}${hrefFor('demo')}`
      );
      setCopied(true);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      {open ? (
        <>
          <div className="quick-scrim" onClick={close} aria-hidden="true" />
          <div
            ref={dialogRef}
            className="quick-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onKeyDown={onKeyDown}
          >
            <div className="quick-head">
              <h2 id={titleId}>Menú rápido</h2>
              <button
                ref={closeRef}
                type="button"
                className="quick-close"
                onClick={close}
                aria-label="Cerrar el menú rápido"
              >
                <IconClose size={16} />
              </button>
            </div>

            <ul className="quick-sections">
              {ROUTES.map((item) => (
                <li key={item.id}>
                  <a
                    href={hrefFor(item.id)}
                    aria-current={route === item.id ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span className="quick-section-name">{item.label}</span>
                    <span className="quick-section-summary">
                      {item.summary}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <ul className="quick-actions">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onLoadReference();
                    setOpen(false);
                  }}
                >
                  <IconTarget size={16} />
                  Cargar WISE 0855 en la demo
                </button>
              </li>
              <li>
                <button type="button" onClick={copyRegionLink}>
                  <IconLink size={16} />
                  <span aria-live="polite">
                    {copied ? 'Enlace copiado' : 'Copiar enlace de la región'}
                  </span>
                </button>
              </li>
              <li>
                <button type="button" onClick={toggleTheme}>
                  <IconContrast size={16} />
                  Usar tema {theme === 'dark' ? 'claro' : 'oscuro'}
                </button>
              </li>
            </ul>

            <p className="quick-tip">
              Para empezar, escribe la ascensión recta y la declinación, elige
              tamaño y banda, y pulsa «Generar región».
            </p>
          </div>
        </>
      ) : null}
      <button
        ref={launcherRef}
        type="button"
        className="quick-launcher"
        onClick={() => (open ? close() : setOpen(true))}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={open ? 'Cerrar el menú rápido' : 'Abrir el menú rápido'}
      >
        {open ? <IconClose size={20} /> : <IconMenuDots size={20} />}
      </button>
    </>
  );
}
