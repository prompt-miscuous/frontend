// Sección activa a partir del hash de la URL.
import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_ROUTE, hrefFor, routeFromHash } from '../lib/routes.js';

function readRoute() {
  if (typeof window === 'undefined') return DEFAULT_ROUTE;
  return routeFromHash(window.location.hash) ?? DEFAULT_ROUTE;
}

export function useHashRoute() {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const onHashChange = () => {
      const next = routeFromHash(window.location.hash);
      if (next) setRoute(next);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((id) => {
    window.location.hash = hrefFor(id).slice(1);
    setRoute(id);
  }, []);

  return [route, navigate];
}
