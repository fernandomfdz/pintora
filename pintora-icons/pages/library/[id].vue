<template>
  <div 
    class="container mx-auto py-6"
    @dragenter.prevent="handleDragEnter"
    @dragleave.prevent="handleDragLeave"
    @dragover.prevent
  >
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold">{{ library?.name }}</h1>
        <p class="text-sm text-muted-foreground">{{ library?.icons?.length || 0 }} iconos</p>
      </div>
      <NuxtLink 
        to="/libraries"
        class="px-4 py-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground"
      >
        Volver a librerías
      </NuxtLink>
    </div>

    <IconToolbar
      @import="showImportDialog = true"
      @search="handleSearch"
      @export="handleExport"
    />

    <div class="flex h-[calc(100vh-200px)]">
      <!-- Panel izquierdo con el grid -->
      <div 
        class="overflow-auto"
        :style="{ width: `${leftPanelWidth}%` }"
      >
        <IconGrid
          :icons="gridIcons"
          :selected-icons="selectedIcons"
          @select="handleIconSelect"
          @edit="handleIconEdit"
          @clone="handleIconClone"
          @remove="handleIconRemove"
        />
      </div>

      <!-- Divisor arrastrable -->
      <div
        class="w-[2px] bg-border hover:bg-accent cursor-col-resize transition-all select-none touch-none"
        @mousedown="startResize"
        @touchstart.prevent="startResize"
      ></div>

      <!-- Panel derecho con la vista previa CSS -->
      <div 
        class="overflow-auto"
        :style="{ width: `${100 - leftPanelWidth}%` }"
      >
        <CssPreview
          :icons="library?.icons || []"
          :size="800"
        />
      </div>
    </div>

    <IconImportDialog
      v-if="showImportDialog"
      ref="importDialogRef"
      :is-open="showImportDialog"
      @close="showImportDialog = false"
      @confirm="handleIconsImport"
    />

    <IconEditDialog
      v-if="showEditDialog"
      :is-open="showEditDialog"
      :icon="editingIcon"
      :svg-text="editingSvgText"
      @close="closeEditDialog"
      @confirm="handleIconUpdate"
      @random-name="generateRandomName"
    />

    <CssPreviewModal
      v-if="showCssPreview"
      :is-open="showCssPreview"
      :icons="library?.icons || []"
      :css-settings="library?.css_settings"
      @close="showCssPreview = false"
      @update:css-settings="handleCssSettingsUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useIconLibraries } from '@/composables/useIconLibraries'
import { useIconExport } from '@/composables/useIconExport'
import { useIconImport } from '@/composables/useIconImport'
import type { IconMetadata, Icon, IconLibrary, IconPreview } from '@/types/icon'
import { generateRandomIconName } from '@/utils/icons'
import { parseSvgFromClipboard } from '@/utils/svg'

const route = useRoute()
const libraryId = route.params.id as string

const { getLibrary, updateLibrary } = useIconLibraries()
const { exportAsFont, exportAsSvg } = useIconExport()
const { importSvgFiles, parseSvgFile } = useIconImport()

const library = ref<IconLibrary | null>(null)
const selectedIcons = ref<IconMetadata[]>([])
const showImportDialog = ref(false)
const showEditDialog = ref(false)
const showCssPreview = ref(false)
const editingIcon = ref<IconMetadata | null>(null)
const editingSvgText = ref('')
const searchQuery = ref('')
const leftPanelWidth = ref(50)
const isResizing = ref(false)
let startX = 0
let startWidth = 0
const importDialogRef = ref<{ addPastedIcon: (svgData: { svg: string, viewBox: string, width?: string, height?: string }) => Promise<void> } | null>(null)

// Estado para el arrastre global
const isDraggingOverWindow = ref(false)
let dragCounter = 0

// Cargar la librería
const loadLibrary = async () => {
  library.value = await getLibrary(libraryId)
}

// Convertir Icon a IconMetadata
const toIconMetadata = (icon: Icon): IconMetadata => {
  return {
    ...icon,
    width: '24',
    height: '24',
    viewBox: '0 0 24 24'
  }
}

// Convertir IconMetadata a Icon
const toDbIcon = (metadata: IconMetadata, svg?: string): Icon => {
  return {
    ...metadata,
    svg: svg || generateSvgString(metadata)
  }
}

// Iconos filtrados para el grid
const gridIcons = computed(() => {
  if (!library.value?.icons) return []
  
  let icons = library.value.icons.map(toIconMetadata)
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    icons = icons.filter(icon => 
      icon.name.toLowerCase().includes(query)
    )
  }
  
  return icons
})

const handleSearch = (query: string) => {
  searchQuery.value = query
}

const handleIconSelect = (icon: IconMetadata) => {
  const index = selectedIcons.value.findIndex(i => i.id === icon.id)
  if (index === -1) {
    selectedIcons.value.push(icon)
  } else {
    selectedIcons.value.splice(index, 1)
  }
}

const handleIconEdit = (icon: IconMetadata) => {
  const dbIcon = library.value?.icons.find(i => i.id === icon.id)
  if (dbIcon) {
    editingIcon.value = icon
    editingSvgText.value = dbIcon.svg
    showEditDialog.value = true
  }
}

const handleIconClone = async (icon: Icon) => {
  if (!library.value) return

  const dbIcon = library.value.icons.find(i => i.id === icon.id)
  if (!dbIcon) return

  const newIcon: Icon = {
    id: crypto.randomUUID(),
    name: `${icon.name}-copy`,
    svg: icon.svg
  }

  library.value.icons.push(newIcon)
  await updateLibrary(library.value)
}

const handleIconRemove = async (icon: IconMetadata) => {
  if (!library.value) return
  
  library.value.icons = library.value.icons.filter(i => i.id !== icon.id)
  await updateLibrary(library.value)
}

const handleIconsImport = async (icons: IconPreview[]) => {
  if (!library.value) return

  const newIcons = icons.map(icon => ({
    id: icon.id,
    name: icon.name,
    svg: icon.svg
  }))

  library.value.icons.push(...newIcons)
  await updateLibrary(library.value)
  showImportDialog.value = false
}

const closeEditDialog = () => {
  showEditDialog.value = false
  editingIcon.value = null
  editingSvgText.value = ''
}

const handleIconUpdate = async (data: { id: string, name: string; svgText: string }) => {
  console.log('entra a handleIconUpdate')
  if (!library.value) return
  console.log('library.value', library.value, data)

  const updatedIcon: Icon = {
    id: data.id || crypto.randomUUID(),
    name: data.name,
    svg: data.svgText,
  }

  if (editingIcon.value) {
    // Actualizar icono existente
    const index = library.value.icons.findIndex(i => i.id === updatedIcon.id)
    console.log('index', index)
    if (index !== -1) {
      library.value.icons[index] = updatedIcon
      console.log('library.value.icons', library.value.icons)
    } else {
      console.log('no se encuentra el icono')
      library.value.icons.push(updatedIcon)
    }
  } else {
    // Añadir nuevo icono
    library.value.icons.push(updatedIcon)
    console.log('library.value.icons', library.value.icons)
  }

  await updateLibrary(library.value)
  closeEditDialog()
}

const generateRandomName = () => {
  if (!editingIcon.value) return
  editingIcon.value.name = generateRandomIconName()
}

const handleExport = async (type: 'svg' | 'font') => {
  if (!library.value?.icons) return

  try {
    if (type === 'svg') {
      await exportAsSvg(library.value.icons)
    } else if (type === 'font') {
      await exportAsFont(library.value.icons)
    }
  } catch (error) {
    console.error('Error al exportar:', error)
  }
}

const handleCssSettingsUpdate = async (settings: any) => {
  if (!library.value) return
  
  library.value.css_settings = settings
  await updateLibrary(library.value)
}

// Manejar pegado de SVG
const handlePaste = async (event: ClipboardEvent) => {
  // Primero intentamos procesar archivos del portapapeles
  const clipboardFiles = Array.from(event.clipboardData?.files || [])
  const svgFiles = clipboardFiles.filter(file => file.type === 'image/svg+xml')
  
  if (svgFiles.length > 0) {
    // Si hay archivos SVG, abrimos el modal y esperamos a que se monte
    showImportDialog.value = true
    await nextTick()

    // Procesamos cada archivo
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

          await importDialogRef.value?.addPastedIcon({
            svg: svg.outerHTML,
            viewBox: viewBox,
            width: originalWidth,
            height: originalHeight
          })
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
      // Abrimos el modal y esperamos a que se monte
      showImportDialog.value = true
      await nextTick()

      // Procesar cada SVG encontrado
      for (const svgText of svgMatches) {
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

            await importDialogRef.value?.addPastedIcon({
              svg: svg.outerHTML,
              viewBox: viewBox,
              width: originalWidth,
              height: originalHeight
            })
          }
        } catch (error) {
          console.error('Error al procesar SVG:', error)
        }
      }
    }
  }
}

// Funcionalidad del divisor arrastrable
const startResize = (event: MouseEvent | TouchEvent) => {
  isResizing.value = true
  startX = 'touches' in event ? event.touches[0].pageX : event.pageX
  startWidth = leftPanelWidth.value

  // Prevenir selección de texto durante el arrastre
  document.body.style.userSelect = 'none'
  document.body.style.cursor = 'col-resize'

  // Añadir eventos para arrastre y finalización
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
  document.addEventListener('touchmove', handleResize)
  document.addEventListener('touchend', stopResize)
}

const handleResize = (event: MouseEvent | TouchEvent) => {
  if (!isResizing.value) return

  // Obtener la posición actual del cursor/touch
  const currentX = 'touches' in event ? event.touches[0].pageX : event.pageX
  const deltaX = currentX - startX

  // Calcular el nuevo ancho como porcentaje del contenedor
  const containerWidth = window.innerWidth
  const deltaPercentage = (deltaX / containerWidth) * 100
  let newWidth = startWidth + deltaPercentage

  // Limitar el ancho entre 20% y 80%
  newWidth = Math.max(20, Math.min(80, newWidth))
  
  // Actualizar el ancho del panel
  leftPanelWidth.value = newWidth

  // Prevenir eventos por defecto para evitar problemas
  event.preventDefault()
}

const stopResize = () => {
  isResizing.value = false
  startX = 0
  startWidth = 0

  // Restaurar estilos del documento
  document.body.style.userSelect = ''
  document.body.style.cursor = ''

  // Limpiar event listeners
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
  document.removeEventListener('touchmove', handleResize)
  document.removeEventListener('touchend', stopResize)
}

// Manejar entrada de arrastre
const handleDragEnter = (event: DragEvent) => {
  event.preventDefault()
  dragCounter++
  
  // Solo abrir el modal si hay archivos SVG siendo arrastrados
  if (dragCounter === 1 && event.dataTransfer?.items) {
    const hasFiles = Array.from(event.dataTransfer.items).some(
      item => item.kind === 'file' && item.type === 'image/svg+xml'
    )
    
    if (hasFiles && !showImportDialog.value) {
      showImportDialog.value = true
    }
  }
}

// Manejar salida de arrastre
const handleDragLeave = (event: DragEvent) => {
  event.preventDefault()
  dragCounter--
  
  // Si el contador llega a 0, significa que el arrastre ha salido completamente de la ventana
  if (dragCounter === 0) {
    isDraggingOverWindow.value = false
  }
}

// Escuchar eventos de pegado
onMounted(() => {
  if (!showImportDialog.value) {
    document.addEventListener('paste', handlePaste)
  }
  loadLibrary()
})

onUnmounted(() => {
  document.removeEventListener('paste', handlePaste)
  if (isResizing.value) {
    stopResize()
  }
  dragCounter = 0
  isDraggingOverWindow.value = false
})

watch(() => showImportDialog.value, (newValue) => {
  if (newValue) {
    document.removeEventListener('paste', handlePaste)
  } else {
    document.addEventListener('paste', handlePaste)
  }
})
</script>

<style scoped>
/* Prevenir selección de texto en el divisor */
.cursor-col-resize {
  touch-action: none;
}
</style> 