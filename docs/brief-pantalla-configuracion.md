# Brief — Pantalla de configuración del visor (Fase 1)

Especificación corregida y congelada para el equipo frontend. Los valores de
bandas, unidades, límites y defaults salen del contrato y **no se inventan**:

- Contrato: `analysis-artifacts/docs/contrato-frames-v1.md` (repo
  `prompt-miscuous/analysis-artifacts`).
- Decisiones de stack/deploy: ADR-0001 y ADR-0002 en el mismo repo.

## 1. Rol y alcance

Frontend únicamente. Sin conexiones al backend, sin APIs externas ni servicios
astronómicos reales. La "generación" es una simulación local detrás de una
interfaz sustituible (`src/lib/api.js`), para que la Fase 3 cambie solo la
fuente de datos.

## 2. Historia de usuario

Como visitante, quiero ingresar RA, Dec, tamaño de región y banda espectral
para solicitar una zona del cielo para su visualización y animación.

## 3. Campos y valores (del contrato v1)

| Campo  | Tipo                   | Rango / opciones                                                                                                 | Default  |
| ------ | ---------------------- | ---------------------------------------------------------------------------------------------------------------- | -------- |
| RA     | numérico (°)           | 0 – 360                                                                                                          | 133.7951 |
| Dec    | numérico (°)           | −90 – +90                                                                                                        | −7.2451  |
| Tamaño | numérico (°) + presets | 0,05 – 1,00; presets 0,10 / 0,25 / 0,50 / 1,00                                                                   | 0,25     |
| Banda  | desplegable            | D1 (0,75–1,09 µm), D2 (1,10–1,62 µm), D3 (1,63–2,41 µm), D4 (2,42–3,82 µm), D5 (3,83–4,41 µm), D6 (4,42–5,00 µm) | D3       |

Correcciones aplicadas sobre el brief original: `W1` no existe (era una banda
de WISE); el default es 133,7951/−7,2451 (conversión exacta del catálogo J2000
de WISE 0855; el 133,98 anterior dejaba al objeto fuera del recorte); el
tamaño va en grados con límites explícitos.

## 4. Interfaz

Estética de observatorio digital: fondo oscuro azul marino/negro espacial,
paneles con glassmorphism sutil, tipografía moderna, iconografía astronómica
minimalista, diseño responsivo (apilado vertical en móvil).

Secciones: (A) encabezado con nombre "Planet X and SPHEREx" y subtítulo
"Explora y configura regiones del cielo"; (B) formulario RA/Dec/tamaño/banda;
(C) tarjeta de WISE 0855 ("Objeto astronómico de referencia cargado
inicialmente"); (D) botones Restablecer / Generar región / Copiar enlace;
(E) vista previa simulada que se actualiza con los parámetros y declara que
es simulación, no imagen real.

## 5. Validación en tiempo real

Mensajes bajo cada campo; "Generar región" deshabilitado si hay errores:

- RA: "La ascensión recta debe estar entre 0° y 360°".
- Dec: "La declinación debe estar entre −90° y +90°".
- Tamaño: "Introduce un tamaño entre 0,05° y 1,00°".
- Banda: "Selecciona una banda disponible".

## 6. URL (?ra=&dec=&size=&band=)

Sincronizar con `history.replaceState` sin recargar. Al cargar: leer, validar
y aplicar; si faltan, defaults de WISE 0855; si son inválidos, avisar y usar
defaults. Al recargar se conserva todo. "Copiar enlace" copia la URL completa.
(`frames` no viaja en la URL en el MVP.)

## 7. Simulación de "Generar región"

Validar todo → estado de procesamiento simulado → resumen de configuración →
mensaje de confirmación → actualizar vista previa. Cero peticiones HTTP.

## 8. Organización del código (stack existente, sin cambios)

React 19 + Vite + Tailwind v4 + Vitest/Testing Library, Prettier, oxlint.
Separar: `src/lib/` (bandas, validación pura, URL params, servicio mock),
`src/hooks/` (estado + sincronización URL), `src/components/` (visuales),
vista previa aparte. Tests para validación, URL y render principal.

## 9. Criterios de aceptación

- [ ] Campos RA/Dec/tamaño/banda funcionales con los rangos de §3.
- [ ] Defaults 133,7951 / −7,2451 al abrir sin parámetros.
- [ ] URL refleja la config; recargar y compartir la conservan.
- [ ] Restablecer recupera defaults; generar simula en local.
- [ ] Responsivo; sin conexiones al backend; consola sin errores.
- [ ] `npm test`, `npm run lint`, `npm run format:check`, `npm run build` en verde.
