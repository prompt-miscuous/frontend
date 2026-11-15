import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { ROUTES, hrefFor } from '../lib/routes.js';

// Logo blanco sobre el tema oscuro y logo negro sobre el tema claro.
const LOGOS = {
  dark: '/space-apps-cochabamba-white.webp',
  light: '/space-apps-cochabamba-dark.webp',
};

export default function Navbar({ route }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="site-header">
      <nav className="topbar shell" aria-label="Navegación principal">
        <a
          className="brand"
          href={hrefFor('demo')}
          aria-label="BlinkX, ir a la demo"
        >
          <span className="brand-mark">
            <img
              src={LOGOS[theme]}
              alt="NASA Space Apps Challenge Cochabamba"
              className="brand-logo"
            />
          </span>
          <span className="brand-name">BlinkX</span>
        </a>
        <ul className="nav-links">
          {ROUTES.map((item) => (
            <li key={item.id}>
              <a
                className="nav-link"
                href={hrefFor(item.id)}
                aria-current={route === item.id ? 'page' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Cambiar al tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
          aria-pressed={theme === 'light'}
        >
          {theme === 'dark' ? (
            <Sun aria-hidden="true" size={18} strokeWidth={1.8} />
          ) : (
            <Moon aria-hidden="true" size={18} strokeWidth={1.8} />
          )}
        </button>
      </nav>
    </header>
  );
}
