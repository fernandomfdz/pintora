<template>
  <div>
    <section class="py-16 bg-gradient-to-br from-primary-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div class="container-custom">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Pintora/Studio
          </h1>
          <p class="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Plataforma para la gestión y exportación de tokens de diseño.
          </p>
          <div class="flex justify-center">
            <a href="https://studio.pintora.dev" target="_blank" class="btn btn-primary">
              Ir a Pintora/Studio
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Gestiona tus tokens de diseño
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Pintora/Studio te permite definir y gestionar tokens de diseño, los cuales pueden ser exportados en diferentes formatos para su integración en proyectos.
            </p>
            <ul class="space-y-4">
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">Creación y gestión de tokens de diseño (colores, tipografías, espaciado, sombras, etc.)</span>
              </li>
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">Exportación en formatos JSON, CSS Variables, Tailwind Config y SCSS</span>
              </li>
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">Vista previa en tiempo real de los cambios aplicados</span>
              </li>
            </ul>
          </div>
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <pre class="text-sm text-gray-800 dark:text-gray-200 overflow-auto">
:root {
  --color-primary: #007bff;
  --font-size-base: 16px;
  --spacing-medium: 16px;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
}
            </pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Nueva sección con capturas de pantalla -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Interfaz intuitiva y potente
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Nuestra interfaz te permite gestionar fácilmente todos tus tokens de diseño en un solo lugar.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="font-semibold text-gray-900 dark:text-white">Gestión de tokens</h3>
            </div>
            <div class="p-4">
              <img src="/images/studio-tokens.png" alt="Gestión de tokens" class="rounded-md shadow-sm w-full" />
            </div>
          </div>
          
          <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="font-semibold text-gray-900 dark:text-white">Exportación de tokens</h3>
            </div>
            <div class="p-4">
              <img src="/images/studio-export.png" alt="Exportación de tokens" class="rounded-md shadow-sm w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary-600 dark:bg-primary-800">
      <div class="container-custom">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-white mb-6">
            Comienza a gestionar tus tokens de diseño hoy mismo
          </h2>
          <p class="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Simplifica tu flujo de trabajo y mantén la consistencia en todos tus proyectos con Pintora/Studio.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://studio.pintora.dev" target="_blank" class="btn bg-white text-primary-700 hover:bg-primary-50">
              Comenzar ahora
            </a>
            <a href="#" class="btn bg-primary-700 text-white hover:bg-primary-800">
              Ver documentación
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Pintora/Studio - Gestión de Tokens de Diseño',
  meta: [
    { name: 'description', content: 'Pintora/Studio es una plataforma para la gestión y exportación de tokens de diseño.' }
  ]
})
</script> 