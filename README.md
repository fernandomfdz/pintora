# Pintora: Ecosistema para Sistemas de Diseño Modernos

Pintora es un ecosistema modular diseñado para facilitar la gestión, exportación y aplicación de sistemas de diseño en proyectos de desarrollo frontend. Su objetivo es proporcionar herramientas flexibles y eficientes para la creación de **tokens de diseño**, **gestión de iconos SVG optimizados** y un **kit de componentes web reutilizables**.

## Estructura del Proyecto

Este monorepo contiene los siguientes proyectos:

- **pintora-main**: Página principal y landing page del ecosistema Pintora.
- **pintora-studio**: Plataforma para la gestión y exportación de tokens de diseño.
- **pintora-icons**: Biblioteca para la organización y optimización de iconos SVG.
- **pintora-ui**: Kit de Web Components basados en los tokens generados en Studio.

## Requisitos

- Node.js 18.x o superior
- npm 8.x o superior

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/fernandomfdz/pintora.git
cd pintora

# Instalar dependencias
npm install
```

## Desarrollo

Puedes ejecutar cada proyecto individualmente:

```bash
# Ejecutar el proyecto principal
npm run dev:main

# Ejecutar Pintora Studio
npm run dev:studio

# Ejecutar Pintora Icons
npm run dev:icons

# Ejecutar Pintora UI
npm run dev:ui
```

## Construcción

Para construir todos los proyectos:

```bash
npm run build
```

O construir proyectos individuales:

```bash
npm run build:main
npm run build:studio
npm run build:icons
npm run build:ui
```

## Licencia

MIT 