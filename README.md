# spherex-frontend

Visor web del reto Planet X and SPHEREx (NASA Space Apps Challenge 2026):
ingresar coordenadas de una zona del cielo y ver cómo cambia en el tiempo.

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

## Backend

El visor consume `GET /frames` del backend (repo `backend/`). Para desarrollo
local, arranca el backend en `http://127.0.0.1:8000` (ver su README) o copia
`.env.example` a `.env` y ajusta `VITE_BACKEND_URL`. Sin backend, añade
`?mock=1` a la URL para usar la simulación local.

## Estructura

```text
src/
  main.jsx        # entrada de la app
  App.jsx         # composición: config + vista + reproductor
  lib/            # bandas, validación, URL params, config, servicio api
  hooks/          # useSkyConfig (estado + sincronización URL + generación)
  components/     # Header, ConfigForm, ObjectCard, SkyPreview, SummaryPanel, FramePlayer
  test/           # setup y tests con Vitest + Testing Library
```

Decisiones de arquitectura (ADR): viven en
[analysis-artifacts/docs/adr](https://github.com/prompt-miscuous/analysis-artifacts/tree/main/docs/adr).
