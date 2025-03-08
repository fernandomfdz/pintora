<script setup lang="ts">
import FeatureSection from '@pintora-shared/components/blocks/FeatureSection.vue';
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Feature Section</h1>
      <p class="text-muted-foreground">
        Un bloque para mostrar las características principales de tu producto o servicio.
      </p>
    </div>

    <div class="mb-12 border rounded-lg overflow-hidden">
      <FeatureSection />
    </div>

    <div class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Uso</h2>
      <div class="bg-muted p-4 rounded-lg">
        <pre class="text-sm overflow-x-auto"><code>&lt;FeatureSection&gt;
  &lt;template #title&gt;Características principales&lt;/template&gt;
  &lt;template #description&gt;
    Descubre todas las características que hacen que nuestro producto sea único y potente.
  &lt;/template&gt;
  &lt;template #features&gt;
    &lt;div class="bg-card text-card-foreground rounded-lg border p-6"&gt;
      &lt;div class="mb-4 text-primary"&gt;
        &lt;!-- Icono personalizado --&gt;
      &lt;/div&gt;
      &lt;h3 class="text-xl font-semibold mb-2"&gt;Característica personalizada&lt;/h3&gt;
      &lt;p class="text-muted-foreground"&gt;
        Descripción de la característica personalizada.
      &lt;/p&gt;
    &lt;/div&gt;
    &lt;!-- Más características... --&gt;
  &lt;/template&gt;
&lt;/FeatureSection&gt;</code></pre>
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
              <td class="border p-2"><code>'default' | 'grid' | 'list'</code></td>
              <td class="border p-2"><code>'default'</code></td>
              <td class="border p-2">Variante de estilo de la sección de características</td>
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
              <td class="border p-2">Título principal de la sección de características</td>
            </tr>
            <tr>
              <td class="border p-2">description</td>
              <td class="border p-2">Descripción o subtítulo de la sección de características</td>
            </tr>
            <tr>
              <td class="border p-2">features</td>
              <td class="border p-2">Contenido personalizado para las características</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template> 