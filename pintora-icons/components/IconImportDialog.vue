<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      @click="$emit('close')"
    >
      <div
        class="relative w-[600px] bg-card border rounded-lg shadow-lg"
        @click.stop
      >
        <!-- Cabecera -->
        <div class="flex items-center justify-between p-4 border-b">
          <h2 class="text-lg font-medium">Importar iconos</h2>
          <button
            class="p-2 rounded hover:bg-accent"
            @click="$emit('close')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

        <!-- Contenido -->
        <div class="p-6 space-y-6">
          <!-- Área de arrastrar y soltar -->
          <div
            class="border-2 border-dashed rounded-lg p-8 text-center"
            :class="{ 'border-primary': isDragging }"
            @dragenter.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @dragover.prevent
            @drop.prevent="handleDrop"
          >
            <div class="space-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-4">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
                <path d="M12 12v9"/>
                <path d="m8 17 4 4 4-4"/>
              </svg>
              <p class="text-lg font-medium">
                Arrastra y suelta archivos SVG aquí
              </p>
              <p class="text-sm text-muted-foreground">
                O pega el código SVG directamente
              </p>
            </div>
          </div>

          <!-- Lista de archivos -->
          <div v-if="files.length > 0" class="space-y-2">
            <h3 class="text-sm font-medium">Archivos seleccionados</h3>
            <div class="space-y-1">
              <div
                v-for="file in files"
                :key="file.name"
                class="flex items-center justify-between p-2 rounded bg-muted/50"
              >
                <span class="text-sm">{{ file.name }}</span>
                <button
                  class="p-1 rounded hover:bg-accent"
                  @click="removeFile(file)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Pie -->
        <div class="flex justify-end gap-2 p-4 border-t">
          <button
            class="px-4 py-2 rounded-md border hover:bg-accent"
            @click="$emit('close')"
          >
            Cancelar
          </button>
          <button
            class="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
            @click="handleImport"
            :disabled="files.length === 0"
          >
            Importar
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useIconImport } from '@/composables/useIconImport'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'paste', event: ClipboardEvent): void
}>()

const { importSvgFiles } = useIconImport()

const isDragging = ref(false)
const files = ref<File[]>([])

// Manejar el evento de soltar archivos
const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  const droppedFiles = Array.from(event.dataTransfer?.files || [])
  
  // Filtrar solo archivos SVG
  const svgFiles = droppedFiles.filter(file => file.type === 'image/svg+xml')
  files.value.push(...svgFiles)
}

// Remover un archivo de la lista
const removeFile = (file: File) => {
  const index = files.value.indexOf(file)
  if (index > -1) {
    files.value.splice(index, 1)
  }
}

// Importar los archivos
const handleImport = async () => {
  if (files.value.length === 0) return
  
  try {
    await importSvgFiles(files.value)
    emit('close')
  } catch (error) {
    console.error('Error al importar archivos:', error)
  }
}

// Manejar pegado de SVG
const handlePaste = (event: ClipboardEvent) => {
  emit('paste', event)
}

// Escuchar eventos de pegado
onMounted(() => {
  document.addEventListener('paste', handlePaste)
})

onUnmounted(() => {
  document.removeEventListener('paste', handlePaste)
})
</script> 