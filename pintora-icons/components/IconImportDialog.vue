<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      @click="$emit('close')"
    >
      <div
        class="relative w-[800px] max-h-[80vh] bg-card border rounded-lg shadow-lg flex flex-col"
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
        <div class="flex-1 overflow-auto p-6 space-y-6">
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

          <!-- Grid de previsualización -->
          <div v-if="previewIcons.length > 0" class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-medium">Iconos a importar ({{ previewIcons.length }})</h3>
              <button
                class="text-sm text-destructive hover:text-destructive/80"
                @click="clearFiles"
              >
                Limpiar todo
              </button>
            </div>
            
            <div class="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4">
              <div
                v-for="icon in previewIcons"
                :key="icon.id"
                class="group relative aspect-square flex flex-col items-center justify-center gap-2 p-4 rounded-lg border bg-card hover:bg-accent/10 transition-colors"
              >
                <div class="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    class="p-1 rounded hover:bg-accent"
                    @click="handleEdit(icon)"
                    title="Editar icono"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button
                    class="p-1 rounded hover:bg-destructive hover:text-destructive-foreground"
                    @click="removeFile(icon.file)"
                    title="Eliminar icono"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 6 6 18"/>
                      <path d="m6 6 12 12"/>
                    </svg>
                  </button>
                </div>

                <div class="size-10 flex items-center justify-center">
                  <div class="size-8" v-html="icon.svg"></div>
                </div>
                <span class="text-xs text-center truncate w-full" :title="icon.name">
                  {{ icon.name }}
                </span>
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
            class="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            @click="handleImport"
            :disabled="previewIcons.length === 0"
          >
            Importar {{ previewIcons.length }} {{ previewIcons.length === 1 ? 'icono' : 'iconos' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Diálogo de edición -->
    <IconEditDialog
      v-if="showEditDialog"
      :is-open="showEditDialog"
      :icon="editingIcon"
      :svg-text="editingSvgText"
      @close="closeEditDialog"
      @confirm="handleIconUpdate"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useIconImport } from '@/composables/useIconImport'
import { parseSvgFromClipboard } from '@/utils/svg'
import type { IconPreview, IconMetadata } from '@/types/icon'
import IconEditDialog from './IconEditDialog.vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm', icons: IconPreview[]): void
}>()

const { importSvgFiles, parseSvgFile } = useIconImport()

const isDragging = ref(false)
const files = ref<File[]>([])
const previewData = ref<Map<File, IconPreview>>(new Map())
const showEditDialog = ref(false)
const editingIcon = ref<IconMetadata | null>(null)
const editingSvgText = ref('')

// Iconos para previsualización
const previewIcons = computed(() => {
  return Array.from(previewData.value.entries()).map(([file, preview]) => ({
    ...preview,
    file
  }))
})

// Manejar el evento de soltar archivos
const handleDrop = async (event: DragEvent) => {
  isDragging.value = false
  const droppedFiles = Array.from(event.dataTransfer?.files || [])
  
  // Filtrar solo archivos SVG
  const svgFiles = droppedFiles.filter(file => file.type === 'image/svg+xml')
  
  // Procesar cada archivo para obtener la previsualización
  for (const file of svgFiles) {
    try {
      const text = await file.text()
      const parser = new DOMParser()
      const doc = parser.parseFromString(text, 'image/svg+xml')
      const svg = doc.querySelector('svg')
      
      if (svg) {
        // Guardar el viewBox original o crear uno por defecto
        const viewBox = svg.getAttribute('viewBox') || '0 0 24 24'
        // Guardar width/height originales para el preview
        const originalWidth = svg.getAttribute('width') || '24'
        const originalHeight = svg.getAttribute('height') || '24'
        
        // Establecer width y height al 100%
        svg.setAttribute('width', '100%')
        svg.setAttribute('height', '100%')

        const preview: IconPreview = {
          id: crypto.randomUUID(),
          name: file.name.replace(/\.svg$/, ''),
          svg: svg.outerHTML,
          viewBox: viewBox,
          width: originalWidth,
          height: originalHeight
        }
        
        // Crear un nuevo archivo con el SVG modificado
        const modifiedFile = new File([svg.outerHTML], file.name, { type: 'image/svg+xml' })
        
        previewData.value.set(modifiedFile, preview)
        files.value.push(modifiedFile)
      }
    } catch (error) {
      console.error(`Error al procesar ${file.name}:`, error)
    }
  }
}

// Remover un archivo de la lista
const removeFile = (file: File) => {
  const index = files.value.indexOf(file)
  if (index > -1) {
    files.value.splice(index, 1)
    previewData.value.delete(file)
  }
}

// Limpiar todos los archivos
const clearFiles = () => {
  files.value = []
  previewData.value.clear()
}

// Importar los archivos
const handleImport = async () => {
  if (files.value.length === 0) return
  
  try {
    // En lugar de procesar los archivos de nuevo, usamos directamente los datos de previewData
    const icons = Array.from(previewData.value.values()).map(preview => ({
      id: preview.id,
      name: preview.name,
      svg: preview.svg,
      viewBox: preview.viewBox,
      width: preview.width,
      height: preview.height
    }))
    
    emit('confirm', icons)
  } catch (error) {
    console.error('Error al importar archivos:', error)
  }
}

// Manejar pegado de SVG
const handlePaste = async (event: ClipboardEvent) => {
  // Primero intentamos procesar archivos del portapapeles
  const clipboardFiles = Array.from(event.clipboardData?.files || [])
  const svgFiles = clipboardFiles.filter(file => file.type === 'image/svg+xml')
  
  if (svgFiles.length > 0) {
    // Si hay archivos SVG, los procesamos como en handleDrop
    for (const file of svgFiles) {
      try {
        const text = await file.text()
        const parser = new DOMParser()
        const doc = parser.parseFromString(text, 'image/svg+xml')
        const svg = doc.querySelector('svg')
        
        if (svg) {
          // Guardar el viewBox original o crear uno por defecto
          const viewBox = svg.getAttribute('viewBox') || '0 0 24 24'
          // Guardar width/height originales para el preview
          const originalWidth = svg.getAttribute('width') || '24'
          const originalHeight = svg.getAttribute('height') || '24'
          
          // Establecer width y height al 100%
          svg.setAttribute('width', '100%')
          svg.setAttribute('height', '100%')

          // Crear el archivo con el SVG modificado
          const file = new File([svg.outerHTML], 'pasted-icon.svg', { type: 'image/svg+xml' })
          
          const preview: IconPreview = {
            id: crypto.randomUUID(),
            name: file.name.replace(/\.svg$/, ''),
            svg: svg.outerHTML,
            viewBox: viewBox,
            width: originalWidth,
            height: originalHeight
          }
          
          previewData.value.set(file, preview)
          files.value.push(file)
        }
      } catch (error) {
        console.error(`Error al procesar ${file.name}:`, error)
      }
    }
  } else {
    // Si no hay archivos, intentamos procesar como texto SVG
    const clipboardText = event.clipboardData?.getData('text/plain') || ''
    
    // Extraer todos los SVGs del texto
    const svgRegex = /<svg[^>]*>[\s\S]*?<\/svg>/gi
    const svgMatches = clipboardText.match(svgRegex)

    if (svgMatches) {
      // Procesar cada SVG encontrado
      svgMatches.forEach((svgText, index) => {
        try {
          const parser = new DOMParser()
          const doc = parser.parseFromString(svgText, 'image/svg+xml')
          const svg = doc.querySelector('svg')
          
          if (svg) {
            // Guardar el viewBox original o crear uno por defecto
            const viewBox = svg.getAttribute('viewBox') || '0 0 24 24'
            // Guardar width/height originales para el preview
            const originalWidth = svg.getAttribute('width') || '24'
            const originalHeight = svg.getAttribute('height') || '24'
            
            // Establecer width y height al 100%
            svg.setAttribute('width', '100%')
            svg.setAttribute('height', '100%')

            // Crear el archivo con el SVG modificado
            const file = new File([svg.outerHTML], `pasted-icon-${index + 1}.svg`, { type: 'image/svg+xml' })
            
            const preview: IconPreview = {
              id: crypto.randomUUID(),
              name: `pasted-icon-${index + 1}`,
              svg: svg.outerHTML,
              viewBox: viewBox,
              width: originalWidth,
              height: originalHeight
            }

            previewData.value.set(file, preview)
            files.value.push(file)
          }
        } catch (error) {
          console.error(`Error al procesar SVG #${index + 1}:`, error)
        }
      })
    }
  }
}

// Editar icono
const handleEdit = (icon: IconPreview & { file: File }) => {
  const iconMetadata: IconMetadata = {
    id: icon.id,
    name: icon.name,
    width: icon.width || '24',
    height: icon.height || '24',
    viewBox: icon.viewBox || '0 0 24 24'
  }
  editingIcon.value = iconMetadata
  editingSvgText.value = icon.svg
  showEditDialog.value = true
}

// Actualizar icono editado
const handleIconUpdate = (data: { id: string, name: string, svgText: string }) => {
  if (!editingIcon.value) return

  const file = files.value.find(f => previewData.value.get(f)?.id === data.id)
  if (!file) return

  // Crear un nuevo archivo con el contenido SVG actualizado
  const newFile = new File([data.svgText], file.name, { type: 'image/svg+xml' })
  
  // Actualizar la lista de archivos
  const fileIndex = files.value.indexOf(file)
  if (fileIndex !== -1) {
    files.value[fileIndex] = newFile
  }

  const updatedPreview: IconPreview = {
    id: data.id,
    name: data.name,
    svg: data.svgText,
    viewBox: editingIcon.value.viewBox,
    width: editingIcon.value.width,
    height: editingIcon.value.height
  }

  // Eliminar la entrada antigua y añadir la nueva
  previewData.value.delete(file)
  previewData.value.set(newFile, updatedPreview)

  showEditDialog.value = false
  editingIcon.value = null
  editingSvgText.value = ''
}

// Cerrar diálogo de edición
const closeEditDialog = () => {
  showEditDialog.value = false
  editingIcon.value = null
  editingSvgText.value = ''
}

// Método para añadir un icono pegado
const addPastedIcon = async (svgData: { svg: string, viewBox: string, width?: string, height?: string }) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgData.svg, 'image/svg+xml')
  const svg = doc.querySelector('svg')
  
  if (svg) {
    // Guardar el viewBox original o usar el proporcionado
    const viewBox = svg.getAttribute('viewBox') || svgData.viewBox
    // Guardar width/height originales para el preview
    const originalWidth = svg.getAttribute('width') || svgData.width || '24'
    const originalHeight = svg.getAttribute('height') || svgData.height || '24'
    
    // Establecer width y height al 100%
    svg.setAttribute('width', '100%')
    svg.setAttribute('height', '100%')

    // Crear el archivo con el SVG modificado
    const file = new File([svg.outerHTML], 'pasted-icon.svg', { type: 'image/svg+xml' })
    
    const preview: IconPreview = {
      id: crypto.randomUUID(),
      name: 'pasted-icon',
      svg: svg.outerHTML,
      viewBox: viewBox,
      width: originalWidth,
      height: originalHeight
    }

    previewData.value.set(file, preview)
    files.value.push(file)
  }
}

// Escuchar eventos de pegado
onMounted(() => {
  if (props.isOpen) {
    document.addEventListener('paste', handlePaste)
  }
})

onUnmounted(() => {
  document.removeEventListener('paste', handlePaste)
})

watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    document.addEventListener('paste', handlePaste)
  } else {
    document.removeEventListener('paste', handlePaste)
  }
})

defineExpose({
  addPastedIcon
})
</script> 