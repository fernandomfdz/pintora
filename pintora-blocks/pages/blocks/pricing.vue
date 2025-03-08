<script setup lang="ts">
import PricingTable from '@pintora-shared/components/blocks/PricingTable.vue';
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Pricing Table</h1>
      <p class="text-muted-foreground">
        Un bloque de tabla de precios para mostrar diferentes planes y características.
      </p>
    </div>

    <div class="mb-12 border rounded-lg overflow-hidden">
      <PricingTable />
    </div>

    <div class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Uso</h2>
      <div class="bg-muted p-4 rounded-lg">
        <pre class="text-sm overflow-x-auto"><code>&lt;PricingTable&gt;
  &lt;template #title&gt;Planes y precios&lt;/template&gt;
  &lt;template #description&gt;
    Elige el plan que mejor se adapte a tus necesidades. Todos los planes incluyen actualizaciones gratuitas.
  &lt;/template&gt;
  
  &lt;!-- Personalización del plan básico --&gt;
  &lt;template #basic-title&gt;Básico&lt;/template&gt;
  &lt;template #basic-description&gt;Para proyectos personales y pequeños equipos&lt;/template&gt;
  &lt;template #basic-price&gt;$9&lt;/template&gt;
  &lt;template #basic-period&gt;/mes&lt;/template&gt;
  &lt;template #basic-features&gt;
    &lt;!-- Lista de características del plan básico --&gt;
  &lt;/template&gt;
  &lt;template #basic-cta&gt;Comenzar gratis&lt;/template&gt;
  
  &lt;!-- Personalización del plan profesional --&gt;
  &lt;template #pro-title&gt;Profesional&lt;/template&gt;
  &lt;template #pro-description&gt;Para equipos en crecimiento y empresas&lt;/template&gt;
  &lt;template #pro-price&gt;$29&lt;/template&gt;
  &lt;template #pro-period&gt;/mes&lt;/template&gt;
  &lt;template #pro-features&gt;
    &lt;!-- Lista de características del plan profesional --&gt;
  &lt;/template&gt;
  &lt;template #pro-cta&gt;Comenzar prueba gratuita&lt;/template&gt;
  
  &lt;!-- Personalización del plan empresarial --&gt;
  &lt;template #enterprise-title&gt;Empresarial&lt;/template&gt;
  &lt;template #enterprise-description&gt;Para grandes empresas con necesidades específicas&lt;/template&gt;
  &lt;template #enterprise-price&gt;$99&lt;/template&gt;
  &lt;template #enterprise-period&gt;/mes&lt;/template&gt;
  &lt;template #enterprise-features&gt;
    &lt;!-- Lista de características del plan empresarial --&gt;
  &lt;/template&gt;
  &lt;template #enterprise-cta&gt;Contactar ventas&lt;/template&gt;
&lt;/PricingTable&gt;</code></pre>
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
              <td class="border p-2"><code>'default' | 'compact' | 'feature-rich'</code></td>
              <td class="border p-2"><code>'default'</code></td>
              <td class="border p-2">Variante de estilo de la tabla de precios</td>
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
              <td class="border p-2">Título principal de la tabla de precios</td>
            </tr>
            <tr>
              <td class="border p-2">description</td>
              <td class="border p-2">Descripción o subtítulo de la tabla de precios</td>
            </tr>
            <tr>
              <td class="border p-2">popular-badge</td>
              <td class="border p-2">Texto para la etiqueta del plan destacado</td>
            </tr>
            <tr>
              <td class="border p-2">basic-title</td>
              <td class="border p-2">Título del plan básico</td>
            </tr>
            <tr>
              <td class="border p-2">basic-description</td>
              <td class="border p-2">Descripción del plan básico</td>
            </tr>
            <tr>
              <td class="border p-2">basic-price</td>
              <td class="border p-2">Precio del plan básico</td>
            </tr>
            <tr>
              <td class="border p-2">basic-period</td>
              <td class="border p-2">Período de facturación del plan básico</td>
            </tr>
            <tr>
              <td class="border p-2">basic-features</td>
              <td class="border p-2">Lista de características del plan básico</td>
            </tr>
            <tr>
              <td class="border p-2">basic-cta</td>
              <td class="border p-2">Texto del botón de llamada a la acción del plan básico</td>
            </tr>
            <tr>
              <td class="border p-2">pro-title</td>
              <td class="border p-2">Título del plan profesional</td>
            </tr>
            <tr>
              <td class="border p-2">pro-description</td>
              <td class="border p-2">Descripción del plan profesional</td>
            </tr>
            <tr>
              <td class="border p-2">pro-price</td>
              <td class="border p-2">Precio del plan profesional</td>
            </tr>
            <tr>
              <td class="border p-2">pro-period</td>
              <td class="border p-2">Período de facturación del plan profesional</td>
            </tr>
            <tr>
              <td class="border p-2">pro-features</td>
              <td class="border p-2">Lista de características del plan profesional</td>
            </tr>
            <tr>
              <td class="border p-2">pro-cta</td>
              <td class="border p-2">Texto del botón de llamada a la acción del plan profesional</td>
            </tr>
            <tr>
              <td class="border p-2">enterprise-title</td>
              <td class="border p-2">Título del plan empresarial</td>
            </tr>
            <tr>
              <td class="border p-2">enterprise-description</td>
              <td class="border p-2">Descripción del plan empresarial</td>
            </tr>
            <tr>
              <td class="border p-2">enterprise-price</td>
              <td class="border p-2">Precio del plan empresarial</td>
            </tr>
            <tr>
              <td class="border p-2">enterprise-period</td>
              <td class="border p-2">Período de facturación del plan empresarial</td>
            </tr>
            <tr>
              <td class="border p-2">enterprise-features</td>
              <td class="border p-2">Lista de características del plan empresarial</td>
            </tr>
            <tr>
              <td class="border p-2">enterprise-cta</td>
              <td class="border p-2">Texto del botón de llamada a la acción del plan empresarial</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template> 