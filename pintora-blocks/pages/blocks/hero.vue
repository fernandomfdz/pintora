<script setup lang="ts">
import HeroSection from '@pintora-shared/components/blocks/HeroSection.vue';
import ExportBlock from '@/components/ExportBlock.vue';

const heroCode = `hola`;


</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Hero Section</h1>
      <p class="text-muted-foreground">
        Un bloque de sección de héroe para la página principal de tu sitio web.
      </p>
    </div>

    <div class="mb-12 border rounded-lg overflow-hidden">
      <HeroSection>
        <template #title>Construye interfaces modernas con Pintora</template>
        <template #description>
          Una biblioteca de componentes y bloques reutilizables para construir interfaces de usuario modernas y atractivas.
        </template>
      </HeroSection>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div class="md:col-span-2">
        <h2 class="text-2xl font-semibold mb-4">Uso</h2>
        <div class="bg-muted p-4 rounded-lg">
          <pre class="text-sm overflow-x-auto"><code>&lt;HeroSection&gt;
  &lt;template #title&gt;Construye interfaces modernas con Pintora&lt;/template&gt;
  &lt;template #description&gt;
    Una biblioteca de componentes y bloques reutilizables para construir interfaces de usuario modernas y atractivas.
  &lt;/template&gt;
  &lt;template #actions&gt;
    &lt;a href="#" class="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"&gt;
      Comenzar
    &lt;/a&gt;
    &lt;a href="#" class="px-6 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80"&gt;
      Documentación
    &lt;/a&gt;
  &lt;/template&gt;
  &lt;template #image&gt;
    &lt;img src="/path/to/image.jpg" alt="Imagen del producto" class="w-full max-w-md rounded-lg shadow-lg" /&gt;
  &lt;/template&gt;
&lt;/HeroSection&gt;</code></pre>
        </div>
      </div>
      
      <div>
        <ExportBlock blockName="HeroSection" :blockCode="heroCode" />
      </div>
    </div>

    <div class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Props</h2>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-muted">
              <th class="border p-2 text-left">Nombre</th>
              <th class="border p-2 text-left">Tipo</th>
              <th class="border p-2 text-left">Por defecto</th>
              <th class="border p-2 text-left">Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border p-2">variant</td>
              <td class="border p-2"><code>'default' | 'centered' | 'minimal'</code></td>
              <td class="border p-2"><code>'default'</code></td>
              <td class="border p-2">Variante de estilo del hero section</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Slots</h2>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-muted">
              <th class="border p-2 text-left">Nombre</th>
              <th class="border p-2 text-left">Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border p-2">title</td>
              <td class="border p-2">Título principal del hero section</td>
            </tr>
            <tr>
              <td class="border p-2">description</td>
              <td class="border p-2">Descripción o subtítulo del hero section</td>
            </tr>
            <tr>
              <td class="border p-2">actions</td>
              <td class="border p-2">Botones o enlaces de llamada a la acción</td>
            </tr>
            <tr>
              <td class="border p-2">image</td>
              <td class="border p-2">Imagen o ilustración del hero section</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template> 