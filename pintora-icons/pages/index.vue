<template>
  <main class="container mx-auto">
    <IconToolbar
      @import="handleImport"
      @search="handleSearch"
      @clear="handleClear"
      @export="handleExport"
    />

    <div v-if="isImporting || isExporting" class="p-4 text-center text-muted-foreground">
      {{ isImporting ? 'Importando iconos...' : 'Exportando iconos...' }}
    </div>

    <div v-if="iconStore.currentProject.collections.length === 0" class="p-12 text-center text-muted-foreground">
      <p class="text-lg mb-4">No hay colecciones de iconos</p>
      <div class="flex flex-col gap-4 items-center">
        <p>Haz clic en "Import Icons" para comenzar</p>
        <div class="flex items-center gap-2">
          <span>o</span>
          <div class="flex items-center gap-1 px-3 py-1.5 bg-muted rounded text-sm">
            <kbd class="px-2 py-0.5 text-xs bg-background rounded border">Ctrl</kbd>
            <span>+</span>
            <kbd class="px-2 py-0.5 text-xs bg-background rounded border">V</kbd>
          </div>
          <span>para pegar iconos desde el portapapeles</span>
        </div>
      </div>
    </div>

    <IconGrid
      v-else
      :icons="iconStore.currentProject.collections.flatMap(c => c.icons)"
      :selected-icons="iconStore.currentProject.selectedIcons"
      @select="handleIconSelect"
    />

    <div 
      v-if="iconStore.currentProject.selectedIcons.length > 0" 
      class="fixed bottom-0 left-0 right-0 bg-background border-t p-4"
    >
      <div class="container mx-auto flex items-center justify-between">
        <p class="text-sm text-muted-foreground">
          {{ iconStore.currentProject.selectedIcons.length }} iconos seleccionados
        </p>
        <div class="flex gap-2">
          <Button variant="outline" @click="handleClear">
            Limpiar selección
          </Button>
          <Button variant="default" @click="handleExport">
            Exportar seleccionados
          </Button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { onMounted, ref, onUnmounted } from 'vue';
  import { useIconStore } from '@/stores/useIconStore';
  import { useIconImport } from '@/composables/useIconImport';
  import { useIconExport } from '@/composables/useIconExport';
  import Button from '@pintora-shared/components/ui/Button.vue';
  import IconToolbar from '@pintora-shared/components/ui/IconToolbar.vue';
  import IconGrid from '@/components/IconGrid.vue';
  import ThemeToggle from '@pintora-shared/components/ui/ThemeToggle.vue';
  import type { IconMetadata } from '@/types/icon';

const iconStore = useIconStore()
const { importSvgFiles, isImporting } = useIconImport()
const { exportIcons, isExporting } = useIconExport()

onMounted(() => {
  iconStore.initializeFromStorage()
  window.addEventListener('paste', handlePaste)
})

onUnmounted(() => {
  window.removeEventListener('paste', handlePaste)
})

const handlePaste = async (e: ClipboardEvent) => {
  const clipboardData = e.clipboardData
  if (!clipboardData) return

  const svgText = clipboardData.getData('text/plain')
  if (!svgText.trim().startsWith('<svg')) return

  // Crear un archivo Blob a partir del texto SVG
  const blob = new Blob([svgText], { type: 'image/svg+xml' })
  const file = new File([blob], `icon-${Date.now()}.svg`, { type: 'image/svg+xml' })
  
  const collection = await importSvgFiles([file])
  iconStore.addCollection(collection)
}

const handleIconSelect = (icon: IconMetadata) => {
  iconStore.toggleIconSelection(icon)
}

const handleImport = async () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.multiple = true
  input.accept = '.svg'
  
  input.onchange = async (e) => {
    const files = (e.target as HTMLInputElement).files
    if (files) {
      const collection = await importSvgFiles(files)
      iconStore.addCollection(collection)
    }
  }
  
  input.click()
}

const handleSearch = (query: string) => {
  // TODO: Implementar búsqueda
}

const handleClear = () => {
  iconStore.clearSelection()
}

const handleExport = async () => {
  if (iconStore.currentProject.selectedIcons.length > 0) {
    await exportIcons(iconStore.currentProject.selectedIcons)
  }
}

useHead({
  title: 'Pintora/Icons - Gestión de Iconos SVG',
  meta: [
    { name: 'description', content: 'Pintora/Icons es una biblioteca para la organización y optimización de iconos SVG utilizando mask-image en CSS.' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' }
  ]
})
</script>