import { useTheme } from '../contexts/ThemeContext.jsx';
import { Moon, Sun } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="topbar" aria-label="Navegación principal">
      <a className="brand" href="#inicio" aria-label="Planet X — inicio">
        <img
          src="/space-apps-cochabamba-white.webp"
          alt="NASA Space Apps Challenge Cochabamba"
          className="brand-logo"
        />
      </a>
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
  );
}
