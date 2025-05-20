<template>
  <NuxtLayout name="default">
    <template #title>
      {{ library?.name }}
      <p class="text-sm text-muted-foreground">{{ library?.icons?.length || 0 }} iconos</p>
    </template>
    <template #buttons>
      <button 
        class="px-4 py-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground flex items-center"
        @click="showImportDialog = true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
      <button 
        class="px-4 py-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground flex items-center"
        @click="showCssPreview = true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
        </svg>
      </button>
      <div class="relative">
        <button 
          class="px-4 py-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground flex items-center"
          @click="showExportMenu = !showExportMenu"
        >
          Descargar
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>

        <div
          v-if="showExportMenu"
          class="absolute right-0 mt-2 w-48 bg-card rounded-md border shadow-lg z-50"
        >
          <div class="py-1">
            <button
              class="w-full px-4 py-2 text-left hover:bg-accent"
              @click="handleExport('svg')"
            >
              Exportar como CSS/SVG
            </button>
            <button
              class="w-full px-4 py-2 text-left hover:bg-accent"
              @click="handleExport('font')"
            >
              Exportar como Fuente
            </button>
            <button
              class="w-full px-4 py-2 text-left hover:bg-accent border-t"
              @click="handleExport('font-beta')"
            >
              Exportar como Fuente (Beta)
            </button>
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <div 
        class="container mx-auto py-6"
        @dragenter.prevent="handleDragEnter"
        @dragleave.prevent="handleDragLeave"
        @dragover.prevent
      >

        <IconToolbar
          @import="showImportDialog = true"
          @search="handleSearch"
          @export="handleExport"
        />

        <div class="flex w-full">
          <!-- Panel izquierdo con el grid -->
          <div 
            class="overflow-auto flex-1"
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
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useIconLibraries } from '@/composables/useIconLibraries'
import { useIconExport } from '@/composables/useIconExport'
import { useIconImport } from '@/composables/useIconImport'
import type { IconMetadata, Icon, IconLibrary, IconPreview } from '@/types/icon'
import { generateRandomIconName, generateSvgString } from '@/utils/icons'
import { parseSvgFromClipboard } from '@/utils/svg'

const route = useRoute()
const libraryId = route.params.id as string

const showExportMenu = ref(false)

const { getLibrary, updateLibrary } = useIconLibraries()
const { exportAsFont, exportAsSvg, exportAsFontBeta } = useIconExport()
const { importSvgFiles, parseSvgFile } = useIconImport()


definePageMeta({
  title: 'Librería',
  layout: false
})

const library = ref<IconLibrary | null>(null)
const selectedIcons = ref<IconMetadata[]>([])
const showImportDialog = ref(false)
const showEditDialog = ref(false)
const showCssPreview = ref(false)
const editingIcon = ref<IconMetadata | null>(null)
const editingSvgText = ref('')
const searchQuery = ref('')
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

const handleExport = async (type: 'svg' | 'font' | 'font-beta') => {
  if (!selectedIcons.value) return

  try {
    if (type === 'svg') {
      await exportAsSvg(selectedIcons.value)
    } else if (type === 'font') {
      await exportAsFont(selectedIcons.value)
    } else if (type === 'font-beta') {
      await exportAsFontBeta(selectedIcons.value)
    }
  } catch (error) {
    console.error('Error exportando iconos:', error)
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
   document.addEventListener('click', handleClickOutside)
  if (!showImportDialog.value) {
    document.addEventListener('paste', handlePaste)
  }
  loadLibrary()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('paste', handlePaste)
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

// Cerrar el menú al hacer clic fuera
const handleClickOutside = (event: MouseEvent) => {
  if (showExportMenu.value) {
    const target = event.target as HTMLElement
    if (!target.closest('.relative')) {
      showExportMenu.value = false
    }
  }
}
</script>

<style scoped>
/* Prevenir selección de texto en el divisor */
.cursor-col-resize {
  touch-action: none;
}
</style> 