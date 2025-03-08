# Pintora: Un Ecosistema para Sistemas de Diseño Modernos

## Introducción
Pintora es un ecosistema modular diseñado para facilitar la gestión, exportación y aplicación de sistemas de diseño en proyectos de desarrollo frontend. Su objetivo es proporcionar herramientas flexibles y eficientes para la creación de **tokens de diseño**, **gestión de iconos SVG optimizados** y un **kit de componentes web reutilizables**.

Pintora está compuesto por tres pilares fundamentales:

- **Pintora/Studio**: Plataforma para la gestión y exportación de tokens de diseño.
- **Pintora/Icons**: Biblioteca para la organización y optimización de iconos SVG utilizando `mask-image` en CSS.
- **Pintora/UI**: Un kit de Web Components basados en los tokens generados en Studio.

## Objetivos del Proyecto
1. **Estandarizar la gestión de diseño** mediante una plataforma intuitiva y escalable.
2. **Optimizar el uso de iconos SVG** sin depender de fuentes de iconos externas.
3. **Facilitar la implementación de UI** con un conjunto de componentes web accesibles y estilizados con tokens de diseño.

---

## 🔹 **Pintora/Studio: Creación y Gestión de Tokens de Diseño**

### Descripción
Pintora/Studio permite a diseñadores y desarrolladores definir y gestionar tokens de diseño, los cuales pueden ser exportados en diferentes formatos para su integración en proyectos.

### Funcionalidades Clave
✅ Importar tokens usando la configuración de tailwind que se añada.
✅ Creación y gestión de tokens de diseño (colores, tipografías, espaciado, sombras, etc.).
✅ Exportación en formatos JSON, CSS Variables, Tailwind Config y SCSS.
✅ Vista previa en tiempo real de los cambios aplicados.
✅ Sincronización con sistemas de diseño en Figma o Sketch (futuro desarrollo).
✅ API para consumo dinámico de tokens en entornos de desarrollo.

### Ejemplo de Exportación en CSS Variables:
```css
:root {
  --color-primary: #007bff;
  --font-size-base: 16px;
  --spacing-medium: 16px;
}
```

---

## 🎭 **Pintora/Icons: Gestión de Iconos SVG con `mask-image` y Variables CSS**

### Descripción
Pintora/Icons es una herramienta para gestionar bibliotecas personalizadas de iconos SVG sin necesidad de fuentes de iconos, optimizando el rendimiento y la flexibilidad en la personalización.

### Funcionalidades Clave
✅ Subida y almacenamiento de iconos SVG.
✅ Optimización automática de SVG para reducción de tamaño.
✅ Generación de clases CSS utilizando `mask-image` con `:after`, referenciando variables CSS para mejorar la edición.
✅ Exportación de iconos en formato CSS y JSON.
✅ Vista previa interactiva con edición rápida y iteración en vivo.

### Implementación con Variables CSS
En lugar de duplicar los SVG en cada clase, se usa una variable CSS para definir la máscara de cada icono, facilitando su mantenimiento y actualización.

### Ejemplo de CSS Generado:
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

Esto permite modificar los iconos desde una sola ubicación (`:root`), sin necesidad de cambiar cada clase individualmente.

---

## 🏗️ **Pintora/UI: Kit de Componentes Web Personalizables**

### Descripción
Pintora/UI proporciona una librería de Web Components completamente estilizados con los tokens generados en Pintora/Studio, permitiendo una integración sencilla en cualquier stack de frontend.

### Funcionalidades Clave
✅ Componentes modulares y accesibles.
✅ Uso de tokens de diseño de Pintora/Studio para personalización automática.
✅ Soporte para modos claro/oscuro y variaciones de tema.
✅ Compatible con cualquier framework (React, Vue, Svelte, etc.).
✅ Componentes básicos incluidos: Botón, Tarjeta, Campo de Texto, Tooltip, Switch, Iconos.

### Ejemplo de Uso en HTML:
```html
<pui-button variant="primary">Click me</pui-button>
<pui-icon name="home" color="blue" size="32"></pui-icon>
```

---

## 📌 Conclusión
Pintora es una solución integral para la gestión de sistemas de diseño, permitiendo a equipos de desarrollo y diseño **trabajar de manera más eficiente y coherente**. Con **Pintora/Studio**, **Pintora/Icons** y **Pintora/UI**, se crea un ecosistema escalable que facilita la implementación de estilos y componentes reutilizables en cualquier proyecto.

💡 **¿Listo para optimizar tu flujo de trabajo con Pintora?** 🎨✨

