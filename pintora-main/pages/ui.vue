<template>
  <div>
    <section class="py-16 bg-gradient-to-br from-primary-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div class="container-custom">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Pintora/UI
          </h1>
          <p class="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Kit de Web Components basados en los tokens generados en Studio.
          </p>
          <div class="flex justify-center">
            <a href="https://ui.pintora.dev" target="_blank" class="btn btn-primary">
              Ir a Pintora/UI
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
              Componentes web personalizables
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Pintora/UI proporciona una librería de Web Components completamente estilizados con los tokens generados en Pintora/Studio, permitiendo una integración sencilla en cualquier stack de frontend.
            </p>
            <ul class="space-y-4">
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">Componentes modulares y accesibles</span>
              </li>
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">Uso de tokens de diseño de Pintora/Studio para personalización automática</span>
              </li>
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">Compatible con cualquier framework (React, Vue, Svelte, etc.)</span>
              </li>
            </ul>
          </div>
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <pre class="text-sm text-gray-800 dark:text-gray-200 overflow-auto">
&lt;!-- Ejemplo de uso en HTML -->
&lt;pui-button variant="primary">Click me&lt;/pui-button>
&lt;pui-icon name="home" color="blue" size="32">&lt;/pui-icon>

&lt;!-- Ejemplo de uso en React -->
import { PuiButton, PuiIcon } from 'pintora-ui/react';

function App() {
  return (
    &lt;div>
      &lt;PuiButton variant="primary">Click me&lt;/PuiButton>
      &lt;PuiIcon name="home" color="blue" size={32} />
    &lt;/div>
  );
}
            </pre>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Componentes disponibles
          </h2>
          <p class="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Explora algunos de los componentes incluidos en Pintora/UI.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Buttons -->
          <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Botones</h3>
            <div class="space-y-4">
              <div class="flex flex-wrap gap-2">
                <button class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                  Primary
                </button>
                <button class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                  Secondary
                </button>
                <button class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                  Danger
                </button>
              </div>
              <div class="flex flex-wrap gap-2">
                <button class="px-4 py-2 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50 dark:text-primary-400 dark:border-primary-400 dark:hover:bg-gray-800">
                  Outline
                </button>
                <button class="px-4 py-2 text-primary-600 rounded-md hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-gray-800">
                  Text
                </button>
              </div>
            </div>
          </div>
          
          <!-- Form Controls -->
          <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Controles de formulario</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre
                </label>
                <input type="text" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" placeholder="Escribe tu nombre">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Opciones
                </label>
                <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  <option>Opción 1</option>
                  <option>Opción 2</option>
                  <option>Opción 3</option>
                </select>
              </div>
            </div>
          </div>
          
          <!-- Cards -->
          <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Tarjetas</h3>
            <div class="space-y-4">
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="h-32 bg-primary-200 dark:bg-primary-900"></div>
                <div class="p-4">
                  <h4 class="font-bold text-gray-900 dark:text-white">Título de la tarjeta</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Descripción breve de la tarjeta con información adicional.</p>
                  <div class="mt-4 flex justify-end">
                    <button class="text-sm text-primary-600 dark:text-primary-400 font-medium">Ver más</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Pintora/UI - Kit de Web Components',
  meta: [
    { name: 'description', content: 'Pintora/UI es un kit de Web Components basados en los tokens generados en Studio.' }
  ]
})
</script> 