<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Documentación</h1>
      <p class="text-muted-foreground">
        Aprende a utilizar los bloques de componentes de Pintora en tus proyectos.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div class="bg-card text-card-foreground rounded-lg border p-6">
        <h3 class="text-xl font-semibold mb-2">Instalación</h3>
        <p class="text-muted-foreground mb-4">
          Aprende a instalar y configurar Pintora Blocks en tu proyecto.
        </p>
        <a href="#instalacion" class="text-primary hover:underline">
          Ver más →
        </a>
      </div>
      <div class="bg-card text-card-foreground rounded-lg border p-6">
        <h3 class="text-xl font-semibold mb-2">Uso básico</h3>
        <p class="text-muted-foreground mb-4">
          Guía básica para utilizar los bloques de componentes en tu proyecto.
        </p>
        <a href="#uso-basico" class="text-primary hover:underline">
          Ver más →
        </a>
      </div>
      <div class="bg-card text-card-foreground rounded-lg border p-6">
        <h3 class="text-xl font-semibold mb-2">Personalización</h3>
        <p class="text-muted-foreground mb-4">
          Aprende a personalizar los bloques para adaptarlos a tu diseño.
        </p>
        <a href="#personalizacion" class="text-primary hover:underline">
          Ver más →
        </a>
      </div>
    </div>

    <section id="instalacion" class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Instalación</h2>
      <div class="bg-card text-card-foreground rounded-lg border p-6">
        <p class="mb-4">
          Para utilizar Pintora Blocks en tu proyecto, puedes instalarlo como una dependencia:
        </p>
        <div class="bg-muted p-4 rounded-lg mb-4">
          <pre class="text-sm overflow-x-auto"><code>npm install @pintora/blocks</code></pre>
        </div>
        <p class="mb-4">
          O puedes clonar el repositorio y copiar los componentes que necesites:
        </p>
        <div class="bg-muted p-4 rounded-lg">
          <pre class="text-sm overflow-x-auto"><code>git clone https://github.com/pintora/pintora.git
cd pintora/pintora-blocks</code></pre>
        </div>
      </div>
    </section>

    <section id="uso-basico" class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Uso básico</h2>
      <div class="bg-card text-card-foreground rounded-lg border p-6">
        <p class="mb-4">
          Para utilizar un bloque de componente en tu proyecto, simplemente importa el componente y úsalo en tu plantilla:
        </p>
        <div class="bg-muted p-4 rounded-lg mb-4">
          <pre class="text-sm overflow-x-auto"><code>&lt;script setup lang="ts"&gt;
import { HeroSection } from '@pintora/blocks';
&lt;/script&gt;

&lt;template&gt;
  &lt;HeroSection&gt;
    &lt;template #title&gt;Mi título personalizado&lt;/template&gt;
    &lt;template #description&gt;Mi descripción personalizada&lt;/template&gt;
  &lt;/HeroSection&gt;
&lt;/template&gt;</code></pre>
        </div>
        <p>
          Cada bloque de componente tiene diferentes slots y props que puedes personalizar. Consulta la documentación específica de cada bloque para más detalles.
        </p>
      </div>
    </section>

    <section id="personalizacion" class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Personalización</h2>
      <div class="bg-card text-card-foreground rounded-lg border p-6">
        <p class="mb-4">
          Los bloques de componentes están diseñados para ser altamente personalizables. Puedes personalizar el contenido utilizando slots y modificar el estilo utilizando props:
        </p>
        <div class="bg-muted p-4 rounded-lg mb-4">
          <pre class="text-sm overflow-x-auto"><code>&lt;HeroSection variant="centered"&gt;
  &lt;template #title&gt;Mi título personalizado&lt;/template&gt;
  &lt;template #description&gt;Mi descripción personalizada&lt;/template&gt;
  &lt;template #actions&gt;
    &lt;button class="mi-clase-personalizada"&gt;Mi botón personalizado&lt;/button&gt;
  &lt;/template&gt;
  &lt;template #image&gt;
    &lt;img src="/mi-imagen.jpg" alt="Mi imagen" /&gt;
  &lt;/template&gt;
&lt;/HeroSection&gt;</code></pre>
        </div>
        <p class="mb-4">
          También puedes aplicar clases personalizadas a los bloques para modificar su apariencia:
        </p>
        <div class="bg-muted p-4 rounded-lg">
          <pre class="text-sm overflow-x-auto"><code>&lt;HeroSection class="mi-clase-personalizada"&gt;
  &lt;!-- Contenido --&gt;
&lt;/HeroSection&gt;</code></pre>
        </div>
      </div>
    </section>
  </div>
</template> 