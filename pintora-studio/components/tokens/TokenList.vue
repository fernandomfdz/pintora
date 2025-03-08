<template>
  <div class=" rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
      <h3 class="text-lg font-semibold ">{{ group.name }}</h3>
      <button
        @click="$emit('add-token')"
        class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        Añadir Token
      </button>
    </div>
    
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Nombre
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Valor
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Vista Previa
            </th>
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class=" divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="token in group.tokens" :key="token.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium ">
              {{ token.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {{ token.value }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div v-if="token.type === 'color'" class="h-6 w-12 rounded" :style="{ backgroundColor: token.value }"></div>
              <div v-else-if="token.type === 'typography'" class="" :style="{ fontSize: token.value }">Aa</div>
              <div v-else-if="token.type === 'spacing'" class="h-6 bg-blue-200 dark:bg-blue-800" :style="{ width: token.value }"></div>
              <div v-else-if="token.type === 'shadow'" class="h-6 w-12 bg-white dark:bg-gray-600" :style="{ boxShadow: token.value }"></div>
              <div v-else-if="token.type === 'radius'" class="h-6 w-12 bg-blue-200 dark:bg-blue-800" :style="{ borderRadius: token.value }"></div>
              <div v-else class="text-gray-500 dark:text-gray-400">-</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                @click="$emit('edit-token', token.id)"
                class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
              >
                Editar
              </button>
              <button
                @click="$emit('delete-token', token.id)"
                class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
              >
                Eliminar
              </button>
            </td>
          </tr>
          <tr v-if="group.tokens.length === 0">
            <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
              No hay tokens en esta categoría. Haz clic en "Añadir Token" para crear uno.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TokenGroup } from '~/types/tokens';

defineProps<{
  group: TokenGroup;
}>();

defineEmits<{
  (e: 'add-token'): void;
  (e: 'edit-token', tokenId: string): void;
  (e: 'delete-token', tokenId: string): void;
}>();
</script> 