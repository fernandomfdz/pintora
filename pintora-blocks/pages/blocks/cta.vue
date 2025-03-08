<script setup lang="ts">
import CallToAction from '@pintora-shared/components/blocks/CallToAction.vue';
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Call to Action</h1>
      <p class="text-muted-foreground">
        Un bloque para crear secciones de llamada a la acción efectivas.
      </p>
    </div>

    <div class="mb-12 border rounded-lg overflow-hidden">
      <CallToAction />
    </div>

    <div class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Uso</h2>
      <div class="bg-muted p-4 rounded-lg">
        <pre class="text-sm overflow-x-auto"><code>&lt;CallToAction variant="centered" background="primary"&gt;
  &lt;template #title&gt;¿Listo para empezar?&lt;/template&gt;
  &lt;template #description&gt;
    Únete a miles de usuarios satisfechos y lleva tu negocio al siguiente nivel.
  &lt;/template&gt;
  &lt;template #actions&gt;
    &lt;a href="#" class="px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-white/90"&gt;
      Comenzar ahora
    &lt;/a&gt;
    &lt;a href="#" class="px-6 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground font-medium rounded-md hover:bg-primary-foreground/20"&gt;
      Saber más
    &lt;/a&gt;
  &lt;/template&gt;
&lt;/CallToAction&gt;</code></pre>
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
              <td class="border p-2"><code>'default' | 'centered' | 'split'</code></td>
              <td class="border p-2"><code>'default'</code></td>
              <td class="border p-2">Variante de estilo de la sección de llamada a la acción</td>
            </tr>
            <tr>
              <td class="border p-2">background</td>
              <td class="border p-2"><code>'primary' | 'secondary' | 'accent' | 'muted'</code></td>
              <td class="border p-2"><code>'primary'</code></td>
              <td class="border p-2">Color de fondo de la sección</td>
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
              <td class="border p-2">Título principal de la sección de llamada a la acción</td>
            </tr>
            <tr>
              <td class="border p-2">description</td>
              <td class="border p-2">Descripción o subtítulo de la sección de llamada a la acción</td>
            </tr>
            <tr>
              <td class="border p-2">actions</td>
              <td class="border p-2">Botones o enlaces de llamada a la acción</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>