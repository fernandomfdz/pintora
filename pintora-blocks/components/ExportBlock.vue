<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  blockName: string;
  blockCode: string;
}>();

const formats = [
  { id: 'vue', name: 'Vue Component', extension: '.vue' },
  { id: 'html', name: 'HTML', extension: '.html' },
  { id: 'jsx', name: 'React JSX', extension: '.jsx' },
  { id: 'svelte', name: 'Svelte', extension: '.svelte' }
];

const selectedFormat = ref(formats[0].id);

function downloadBlock() {  
  return;
}

function copyToClipboard() {
  return;
}
</script>

<template>
  <div class="bg-card text-card-foreground rounded-lg border p-6">
    <h3 class="text-xl font-semibold mb-4">Exportar {{ blockName }}</h3>
    
    <div class="mb-4">
      <label class="block text-sm font-medium mb-2">Formato</label>
      <select 
        v-model="selectedFormat"
        class="w-full p-2 border rounded-md bg-background"
      >
        <option v-for="format in formats" :key="format.id" :value="format.id">
          {{ format.name }}
        </option>
      </select>
    </div>
    
    <div class="flex space-x-4">
      <button 
        @click="downloadBlock"
        class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Descargar
      </button>
      <button 
        @click="copyToClipboard"
        class="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80"
      >
        Copiar código
      </button>
    </div>
  </div>
</template> 