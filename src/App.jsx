import { useCallback, useEffect, useRef } from 'react';
import Navbar from './components/Navbar.jsx';
import QuickMenu from './components/QuickMenu.jsx';
import { useHashRoute } from './hooks/useHashRoute.js';
import { useSkyConfig } from './hooks/useSkyConfig.js';
import { getRoute } from './lib/routes.js';
import AiPage from './pages/AiPage.jsx';
import DemoPage from './pages/DemoPage.jsx';
import InfoPage from './pages/InfoPage.jsx';
import PlansPage from './pages/PlansPage.jsx';

function App() {
  // El estado de la demo vive aquí: así no se pierde al cambiar de sección.
  const config = useSkyConfig();
  const [route, navigate] = useHashRoute();
  const mainRef = useRef(null);
  const previousRoute = useRef(route);

  useEffect(() => {
    document.title = getRoute(route).title;
    if (previousRoute.current === route) return;
    previousRoute.current = route;
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [route]);

  const { reset } = config;
  const loadReference = useCallback(() => {
    reset();
    navigate('demo');
  }, [reset, navigate]);

  return (
    <div className="space-bg site text-slate-100">
      <a
        className="skip-link"
        href="#contenido"
        onClick={(event) => {
          event.preventDefault();
          mainRef.current?.focus();
        }}
      >
        Saltar al contenido
      </a>
      <Navbar route={route} />
      <main id="contenido" ref={mainRef} tabIndex={-1} className="page shell">
        {route === 'informacion' ? <InfoPage /> : null}
        {route === 'planes' ? <PlansPage /> : null}
        {route === 'ia' ? <AiPage /> : null}
        {route === 'demo' ? <DemoPage config={config} /> : null}
      </main>
      <footer className="site-footer">
        <div className="shell">
          <p>
            BlinkX, proyecto del reto Planet X and SPHEREx del NASA Space Apps
            Challenge 2026.
          </p>
          <p>
            Datos de SPHEREx a través del NASA/IPAC Infrared Science Archive.
          </p>
        </div>
      </footer>
      <QuickMenu route={route} onLoadReference={loadReference} />
    </div>
  );
}

export default App;
