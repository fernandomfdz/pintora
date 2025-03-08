<template>
  <div class="rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div class="p-4">
      <h2 class="text-lg font-semibold mb-4">Categorías</h2>
      <ul class="space-y-1">
        <li v-for="group in tokenSystem.groups" :key="group.id">
          <button
            @click="setActiveGroup(group.id)"
            class="w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="activeGroupId === group.id ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : ' hover:bg-gray-100 dark:hover:bg-gray-700'"
          >
            {{ group.name }}
          </button>
        </li>
      </ul>
    </div>
    
    <div class="p-4 border-t border-gray-200 dark:border-gray-700">
      <button
        @click="$emit('add-group')"
        class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        Añadir Categoría
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TokenSystem } from '~/types/tokens';

defineProps<{
  tokenSystem: TokenSystem;
  activeGroupId: string | null;
}>();

const emit = defineEmits<{
  (e: 'set-active-group', groupId: string): void;
  (e: 'add-group'): void;
}>();

const setActiveGroup = (groupId: string) => {
  emit('set-active-group', groupId);
};
</script> 