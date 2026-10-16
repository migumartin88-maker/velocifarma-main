# Ritmos de perfusión

Calculadora estática de ritmos de administración para perfusiones con velocidad creciente. El proyecto usa Astro y puede desplegarse desde GitHub en Vercel.

## Desarrollo

```sh
npm install
npm run dev
```

## Despliegue

Conecta el repositorio a Vercel. Astro genera el sitio estático en `dist/`; Vercel detecta Astro y configura la compilación automáticamente. Para una compilación local, ejecuta `npm run build`.

## Estructura

- `src/pages/`: páginas del sitio.
- `src/layouts/`: estructura compartida y metadatos.
- `src/components/`: controles de interfaz reutilizables.
- `src/data/`: catálogo de fármacos y protocolos.
- `src/lib/`: tipos y lógica de cálculo.
- `src/styles/`: tokens visuales y estilos globales.

La aplicación calcula ritmos configurados para rituximab. Antes de cualquier uso asistencial, deben comprobarse frente a la prescripción y al protocolo vigente del centro. La progresión de velocidad requiere valoración clínica.
