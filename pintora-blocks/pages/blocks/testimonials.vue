<script setup lang="ts">
import TestimonialSection from '@pintora-shared/components/blocks/TestimonialSection.vue';
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Testimonial Section</h1>
      <p class="text-muted-foreground">
        Un bloque para mostrar testimonios de clientes satisfechos.
      </p>
    </div>

    <div class="mb-12 border rounded-lg overflow-hidden">
      <TestimonialSection />
    </div>

    <div class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Uso</h2>
      <div class="bg-muted p-4 rounded-lg">
        <pre class="text-sm overflow-x-auto"><code>&lt;TestimonialSection&gt;
  &lt;template #title&gt;Lo que dicen nuestros clientes&lt;/template&gt;
  &lt;template #description&gt;
    Descubre por qué nuestros clientes confían en nosotros y en nuestros productos.
  &lt;/template&gt;
  &lt;template #testimonials&gt;
    &lt;div class="bg-card text-card-foreground rounded-lg border p-6"&gt;
      &lt;!-- Estrellas de valoración --&gt;
      &lt;p class="text-muted-foreground mb-6 italic"&gt;
        "Testimonio personalizado del cliente."
      &lt;/p&gt;
      &lt;div class="flex items-center"&gt;
        &lt;!-- Avatar o iniciales --&gt;
        &lt;div&gt;
          &lt;h4 class="font-semibold"&gt;Nombre del Cliente&lt;/h4&gt;
          &lt;p class="text-sm text-muted-foreground"&gt;Cargo, Empresa&lt;/p&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;!-- Más testimonios... --&gt;
  &lt;/template&gt;
&lt;/TestimonialSection&gt;</code></pre>
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
              <td class="border p-2"><code>'default' | 'carousel' | 'grid'</code></td>
              <td class="border p-2"><code>'default'</code></td>
              <td class="border p-2">Variante de estilo de la sección de testimonios</td>
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
              <td class="border p-2">Título principal de la sección de testimonios</td>
            </tr>
            <tr>
              <td class="border p-2">description</td>
              <td class="border p-2">Descripción o subtítulo de la sección de testimonios</td>
            </tr>
            <tr>
              <td class="border p-2">testimonials</td>
              <td class="border p-2">Contenido personalizado para los testimonios</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template> 