# spherex-frontend

Sitio web de BlinkX para el reto Planet X and SPHEREx (NASA Space Apps
Challenge 2026): ingresar coordenadas de una zona del cielo y ver cómo cambia
en el tiempo.

Stack: React + Vite + Vitest, con npm. Decisión registrada en
[ADR-0001](https://github.com/prompt-miscuous/analysis-artifacts/blob/main/docs/adr/0001-frontend-stack.md).

## Requisitos

Node 20+ y npm.

## Comandos

```bash
npm install   # instalar dependencias
npm run dev   # servidor de desarrollo en http://localhost:5173
npm test      # tests con Vitest
npm run lint  # lint con oxlint
npm run build # build de producción en dist/
```

## Secciones

La barra superior lleva a cuatro secciones. La navegación usa el hash de la
URL, así que no hay dependencias nuevas y convive con `?ra=&dec=&size=&band=`:

| Sección     | URL              | Contenido                         |
| ----------- | ---------------- | --------------------------------- |
| Demo        | `/#/demo`        | El visor (formulario + animación) |
| Información | `/#/informacion` | `src/content/informacion.js`      |
| Planes      | `/#/planes`      | `src/content/planes.js`           |
| IA          | `/#/ia`          | `src/content/ia.js`               |

Los textos de Información, Planes e IA viven en `src/content/`: para
cambiarlos no hace falta tocar los componentes. `informacion.js` es la
traducción al español de `frontmark.md`.

El botón fijo de la esquina inferior derecha abre el menú rápido
(`src/components/QuickMenu.jsx`): secciones, cargar WISE 0855, copiar el enlace
de la región y cambiar de tema.

## Backend

El visor consume `GET /frames` del backend (repo `backend/`). Para desarrollo
local, arranca el backend en `http://127.0.0.1:8000` (ver su README) o copia
`.env.example` a `.env` y ajusta `VITE_BACKEND_URL`. Sin backend, añade
`?mock=1` a la URL para usar la simulación local.

## Estructura

```text
src/
  main.jsx        # entrada de la app
  App.jsx         # cabecera + sección activa + pie + menú rápido
  index.css       # variables de tema y estilos de la demo
  styles/site.css # cabecera, páginas de contenido, pie y menú rápido
  pages/          # DemoPage, InfoPage, PlansPage, AiPage
  content/        # textos de Información, Planes e IA
  lib/            # bandas, validación, URL params, rutas, config, servicio api
  hooks/          # useSkyConfig (estado de la demo), useHashRoute (sección)
  components/     # Navbar, QuickMenu, BlinkComparator, ConfigForm, FramePlayer…
  test/           # setup y tests con Vitest + Testing Library
```

Decisiones de arquitectura (ADR): viven en
[analysis-artifacts/docs/adr](https://github.com/prompt-miscuous/analysis-artifacts/tree/main/docs/adr).
