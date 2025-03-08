<script setup lang="ts">
import FormSection from '@pintora-shared/components/blocks/FormSection.vue';
import ExportBlock from '~/components/ExportBlock.vue';

const formCode = ``;
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Form Section</h1>
      <p class="text-muted-foreground">
        Un bloque para crear formularios de contacto y otros tipos de formularios.
      </p>
    </div>

    <div class="mb-12 border rounded-lg overflow-hidden">
      <FormSection />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div class="md:col-span-2">
        <h2 class="text-2xl font-semibold mb-4">Uso</h2>
        <div class="bg-muted p-4 rounded-lg">
          <pre class="text-sm overflow-x-auto"><code>&lt;FormSection&gt;
  &lt;template #title&gt;Contacta con nosotros&lt;/template&gt;
  &lt;template #description&gt;
    Completa el formulario a continuación y nos pondremos en contacto contigo lo antes posible.
  &lt;/template&gt;
  &lt;template #form&gt;
    &lt;form class="space-y-6"&gt;
      &lt;!-- Campos personalizados del formulario --&gt;
    &lt;/form&gt;
  &lt;/template&gt;
  &lt;template #footer&gt;
    &lt;p&gt;También puedes contactarnos directamente en &lt;a href="mailto:info@ejemplo.com" class="text-primary hover:underline"&gt;info@ejemplo.com&lt;/a&gt;&lt;/p&gt;
  &lt;/template&gt;
&lt;/FormSection&gt;</code></pre>
        </div>
      </div>
      
      <div>
        <ExportBlock blockName="FormSection" :blockCode="formCode" />
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
              <td class="border p-2"><code>'default' | 'compact' | 'split'</code></td>
              <td class="border p-2"><code>'default'</code></td>
              <td class="border p-2">Variante de estilo del formulario</td>
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
              <td class="border p-2">Título principal del formulario</td>
            </tr>
            <tr>
              <td class="border p-2">description</td>
              <td class="border p-2">Descripción o subtítulo del formulario</td>
            </tr>
            <tr>
              <td class="border p-2">form</td>
              <td class="border p-2">Contenido personalizado para el formulario</td>
            </tr>
            <tr>
              <td class="border p-2">footer</td>
              <td class="border p-2">Contenido para el pie del formulario</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template> 