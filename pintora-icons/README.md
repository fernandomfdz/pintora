# 🎭 Pintora/Icons: Gestión de Iconos SVG con mask-image y Variables CSS

## Descripción

Pintora/Icons es una herramienta para gestionar bibliotecas personalizadas de iconos SVG sin necesidad de fuentes de iconos, optimizando el rendimiento y la flexibilidad en la personalización.

## Funcionalidades Clave

- ✅ Subida y almacenamiento de iconos SVG.
- ✅ Pegar svgs a la colección desde el portapapeles
- ✅ Optimización automática de SVG para reducción de tamaño.
- ✅ Generación de clases CSS utilizando mask con :after, referenciando variables CSS para mejorar la edición.
- ✅ Exportación de iconos en formato CSS y JSON.
- ✅ Vista previa interactiva con edición rápida y iteración en vivo.
- ✅ Posibilidad de cambiar el tamaño de los iconos y el color via css.

## Implementación con Variables CSS

En lugar de duplicar los SVG en cada clase, se usa una variable CSS para definir la máscara de cada icono, facilitando su mantenimiento y actualización.

Ejemplo de CSS Generado:

```css
:root {
  --icon-home: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' %3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5' /%3E%3C/svg%3E");
}

.icon-home::after {
  content: "";
  display: inline-block;
  width: 24px;
  height: 24px;
  background-color: currentColor;
  mask: var(--icon-home);
  -webkit-mask: var(--icon-home);
}

```

Esto permite modificar los iconos desde una sola ubicación (:root), sin necesidad de cambiar cada clase individualmente.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
