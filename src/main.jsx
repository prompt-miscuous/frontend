import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/site.css';
import App from './App.jsx';
import Slides from './slides/Slides.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';

const isSlides = window.location.pathname === '/slides';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>{isSlides ? <Slides /> : <App />}</ThemeProvider>
  </StrictMode>
);
