<template>
  <div class="flex items-center gap-4 p-4 border-b">
    <Button variant="default" @click="emit('import')">
      Import Icons
    </Button>
    
    <div class="flex-1">
      <input
        v-model="searchQuery"
        placeholder="Search icons..."
        @input="handleSearch"
      />
    </div>

    <div class="relative">
      <Button variant="default" @click="showExportMenu = !showExportMenu">
        Descargar
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </Button>

      <div
        v-if="showExportMenu"
        class="absolute right-0 mt-2 w-48 bg-card rounded-md border shadow-lg z-50"
      >
        <div class="py-1">
          <button
            class="w-full px-4 py-2 text-left hover:bg-accent"
            @click="handleExportClick('svg')"
          >
            Exportar como CSS/SVG
          </button>
          <button
            class="w-full px-4 py-2 text-left hover:bg-accent"
            @click="handleExportClick('font')"
          >
            Exportar como Fuente
          </button>
        </div>
      </div>
    </div>
  </div>
</template> 

<script setup lang="ts">
// @ts-ignore
import Button from '@pintora-shared/components/ui/Button.vue'
import { ref, onUnmounted, onMounted } from 'vue'

const searchQuery = ref('')
const showExportMenu = ref(false)

const emit = defineEmits<{
  (e: 'import'): void
  (e: 'search', query: string): void
  (e: 'clear'): void
  (e: 'export', type: 'svg' | 'font'): void
}>()

const handleSearch = () => {
  emit('search', searchQuery.value)
}

const handleExportClick = (type: 'svg' | 'font') => {
  showExportMenu.value = false
  emit('export', type)
}

// Cerrar el menú al hacer clic fuera
const handleClickOutside = (event: MouseEvent) => {
  if (showExportMenu.value) {
    const target = event.target as HTMLElement
    if (!target.closest('.relative')) {
      showExportMenu.value = false
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>