<script setup lang="ts">
import FooterSection from '@pintora-shared/components/blocks/FooterSection.vue';
import ExportBlock from '~/components/ExportBlock.vue';

const footerCode = ``;
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Footer Section</h1>
      <p class="text-muted-foreground">
        Un bloque para crear pies de página completos y personalizables.
      </p>
    </div>

    <div class="mb-12 border rounded-lg overflow-hidden">
      <FooterSection />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div class="md:col-span-2">
        <h2 class="text-2xl font-semibold mb-4">Uso</h2>
        <div class="bg-muted p-4 rounded-lg">
          <pre class="text-sm overflow-x-auto"><code>&lt;FooterSection&gt;
  &lt;template #logo&gt;
    &lt;h2 class="text-2xl font-bold mb-4"&gt;Mi Empresa&lt;/h2&gt;
  &lt;/template&gt;
  &lt;template #description&gt;
    Descripción personalizada de tu empresa o proyecto.
  &lt;/template&gt;
  &lt;template #social&gt;
    &lt;!-- Iconos de redes sociales personalizados --&gt;
  &lt;/template&gt;
  &lt;template #products&gt;
    &lt;li&gt;&lt;a href="#" class="text-muted-foreground hover:text-primary"&gt;Producto 1&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#" class="text-muted-foreground hover:text-primary"&gt;Producto 2&lt;/a&gt;&lt;/li&gt;
  &lt;/template&gt;
  &lt;template #copyright&gt;
    © 2024 Mi Empresa. Todos los derechos reservados.
  &lt;/template&gt;
&lt;/FooterSection&gt;</code></pre>
        </div>
      </div>
      
      <div>
        <ExportBlock blockName="FooterSection" :blockCode="footerCode" />
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
              <td class="border p-2"><code>'default' | 'simple' | 'complex'</code></td>
              <td class="border p-2"><code>'default'</code></td>
              <td class="border p-2">Variante de estilo del pie de página</td>
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
              <td class="border p-2">logo</td>
              <td class="border p-2">Logo o nombre de la empresa</td>
            </tr>
            <tr>
              <td class="border p-2">description</td>
              <td class="border p-2">Descripción de la empresa o proyecto</td>
            </tr>
            <tr>
              <td class="border p-2">social</td>
              <td class="border p-2">Iconos de redes sociales</td>
            </tr>
            <tr>
              <td class="border p-2">products</td>
              <td class="border p-2">Lista de productos</td>
            </tr>
            <tr>
              <td class="border p-2">resources</td>
              <td class="border p-2">Lista de recursos</td>
            </tr>
            <tr>
              <td class="border p-2">company</td>
              <td class="border p-2">Lista de enlaces de empresa</td>
            </tr>
            <tr>
              <td class="border p-2">copyright</td>
              <td class="border p-2">Texto de copyright</td>
            </tr>
            <tr>
              <td class="border p-2">language</td>
              <td class="border p-2">Selector de idioma</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template> 