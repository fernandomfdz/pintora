<template>
  <div class="rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-semibold">Exportar Tokens</h3>
    </div>
    
    <div class="p-4">
      <div class="space-y-4">
        <div>
          <label for="export-format" class="block text-sm font-medium">
            Formato
          </label>
          <select
            id="export-format"
            v-model="exportOptions.format"
            class="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
          >
            <option value="css">CSS Variables</option>
            <option value="scss">SCSS Variables</option>
            <option value="json">JSON</option>
            <option value="tailwind">Tailwind Config</option>
          </select>
        </div>
        
        <div>
          <label for="export-prefix" class="block text-sm font-medium">
            Prefijo (opcional)
          </label>
          <input
            id="export-prefix"
            v-model="exportOptions.prefix"
            type="text"
            class="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            placeholder="Ej: my-project-"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-2">
            Tipos de tokens a incluir
          </label>
          <div class="space-y-2">
            <div v-for="type in tokenTypes" :key="type" class="flex items-center">
              <input
                :id="`type-${type}`"
                v-model="selectedTypes"
                :value="type"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <label :for="`type-${type}`" class="ml-2 block text-sm">
                {{ typeLabels[type] }}
              </label>
            </div>
          </div>
        </div>
        
        <div class="pt-4">
          <button
            @click="generateExport"
            class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Generar Exportación
          </button>
        </div>
        
        <div v-if="exportedCode" class="pt-4">
          <label for="export-result" class="block text-sm font-medium mb-2">
            Resultado
          </label>
          <div class="relative">
            <pre id="export-result" class="p-4 bg-gray-50 dark:bg-gray-900 rounded-md text-sm text-gray-800 dark:text-gray-200 overflow-auto max-h-96">{{ exportedCode }}</pre>
            <button
              @click="copyToClipboard"
              class="absolute top-2 right-2 p-1.5 bg-white dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              title="Copiar al portapapeles"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            </button>
          </div>
          <div v-if="copied" class="mt-2 text-sm text-green-600 dark:text-green-400">
            ¡Copiado al portapapeles!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { TokenType, ExportFormat, ExportOptions } from '~/types/tokens';

const props = defineProps<{
  exportTokens: (options: ExportOptions) => string;
}>();

const tokenTypes: TokenType[] = ['color', 'typography', 'spacing', 'shadow', 'radius', 'breakpoint'];

const typeLabels: Record<TokenType, string> = {
  color: 'Colores',
  typography: 'Tipografía',
  spacing: 'Espaciado',
  shadow: 'Sombras',
  radius: 'Bordes',
  breakpoint: 'Puntos de ruptura'
};

const exportOptions = ref<ExportOptions>({
  format: 'css',
  prefix: '',
  includeTypes: undefined
});

const selectedTypes = ref<TokenType[]>([...tokenTypes]);

const exportedCode = ref<string>('');
const copied = ref<boolean>(false);

const generateExport = () => {
  // Si todos los tipos están seleccionados, no especificamos includeTypes
  exportOptions.value.includeTypes = selectedTypes.value.length === tokenTypes.length
    ? undefined
    : selectedTypes.value;
  
  exportedCode.value = props.exportTokens(exportOptions.value);
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(exportedCode.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Error al copiar al portapapeles:', err);
  }
};
</script> 