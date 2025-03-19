<template>
  <main class="min-h-screen flex flex-col">
    <!-- Barra de herramientas superior -->
    <div class="z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <IconToolbar
        @import="handleImport"
        @search="handleSearch"
        @clear="handleClear"
        @export="handleExport"
      />
    </div>

    <!-- Contenido principal -->
    <div class="flex-1 flex">
      <!-- Estado de carga -->
      <div v-if="isImporting || isExporting" class="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur z-50">
        <div class="flex flex-col items-center gap-4 p-8 rounded-lg bg-card border shadow-lg">
          <div v-if="!exportError" class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <div v-else class="flex items-center justify-center h-8 w-8 rounded-full bg-destructive text-destructive-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
          </div>
          <div class="flex flex-col items-center gap-2">
            <p v-if="!exportError" class="text-muted-foreground">
              {{ isImporting ? 'Importando iconos...' : exportProgress?.step || 'Exportando iconos...' }}
              {{ exportProgress ? `(${exportProgress.value}%)` : '' }}
            </p>
            <template v-else>
              <p class="text-destructive font-medium">Error en {{ exportError.context }}</p>
              <p class="text-sm text-muted-foreground text-center">{{ exportError.message }}</p>
            </template>
          </div>
        </div>
      </div>

      <!-- Estado vacío -->
      <div v-if="iconStore.currentProject.collections.length === 0" class="flex-1 flex justify-center">
        <div class="p-12 text-center text-muted-foreground max-w-md">
          <div class="w-full flex items-center justify-center mb-8 opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2"/>
              <path d="M7 7h.01"/>
              <path d="M17 7h.01"/>
              <path d="M7 17h.01"/>
              <path d="M17 17h.01"/>
            </svg>
          </div>
          <h3 class="text-lg font-medium mb-4">No hay colecciones de iconos</h3>
          <div class="flex flex-col gap-4 items-center">
            <p>Haz clic en "Import Icons" para comenzar o</p>
            <div class="flex flex-col items-center gap-2">
              <div class="flex items-center gap-1 px-3 py-1.5 bg-muted rounded text-sm">
                <kbd class="px-2 py-0.5 text-xs bg-background rounded border">Ctrl</kbd>
                <span>+</span>
                <kbd class="px-2 py-0.5 text-xs bg-background rounded border">V</kbd>
              </div>
              <span>para pegar iconos desde el portapapeles</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Grid y Previsualizador -->
      <div v-else class="flex-1 flex min-h-0">
        <!-- Grid de iconos -->
        <div class="flex-1 min-h-0 overflow-auto">
          <IconGrid
            :icons="filteredIcons.length > 0 ? filteredIcons : iconStore.currentProject.collections.flatMap(c => c.icons)"
            :selected-icons="iconStore.currentProject.selectedIcons"
            @select="handleIconSelect"
            @edit="handleIconEdit"
            @clone="handleIconClone"
            @remove="handleIconRemove"
          />
        </div>

        <!-- Separador y CSS Preview -->
        <div class="relative border-l">
          <!-- Barra de redimensionamiento -->
          <div
            class="absolute -left-1 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-primary/10 transition-colors"
            @mousedown="startResizing"
          ></div>

          <div :style="{ width: `${previewSize}px` }">
            <CssPreview 
              :icons="iconStore.currentProject.collections.flatMap(c => c.icons)"
              :size="previewSize"
              @maximize="handleCssPreviewMaximize"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Panel inferior de selección -->
    <div 
      v-if="iconStore.currentProject.selectedIcons.length > 0" 
      class="fixed bottom-0 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div class="container mx-auto flex items-center justify-between py-4">
        <p class="text-sm text-muted-foreground">
          {{ iconStore.currentProject.selectedIcons.length }} iconos seleccionados
        </p>
        <div class="flex gap-2">
          <Button variant="default" @click="handleExport('svg')">
            Exportar seleccionados
          </Button>
        </div>
      </div>
    </div>

    <!-- Diálogo de edición -->
    <IconEditDialog
      :is-open="showEditDialog"
      :icon="editingIcon"
      :svg-text="editingSvgText"
      @close="closeEditDialog"
      @confirm="handleEditConfirm"
      @random-name="handleRandomName"
    />

    <!-- Modal de CSS Preview -->
    <CssPreviewModal
      :is-open="showCssPreviewModal"
      :icons="iconStore.currentProject.collections.flatMap(c => c.icons)"
      @close="showCssPreviewModal = false"
    />
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { useIconStore } from '@/stores/useIconStore'
import { useIconImport } from '@/composables/useIconImport'
import { useIconExport } from '@/composables/useIconExport'
// @ts-ignore
import Button from '@pintora-shared/components/ui/Button.vue'
// @ts-ignore
import IconToolbar from '@/components/IconToolbar.vue'
import IconGrid from '@/components/IconGrid.vue'
import CssPreview from '@/components/CssPreview.vue'
import IconEditDialog from '@/components/IconEditDialog.vue'
import CssPreviewModal from '@/components/CssPreviewModal.vue'
// @ts-ignore
import ThemeToggle from '@pintora-shared/components/ui/ThemeToggle.vue'
import type { IconMetadata } from '@/types/icon'

const iconStore = useIconStore()
const { importSvgFiles, isImporting } = useIconImport()
const { exportAsSvg, exportAsFont, isExporting, exportProgress, exportError } = useIconExport()

// Estado para el diálogo de edición
const showEditDialog = ref(false)
const editingIcon = ref<IconMetadata | undefined>()
const editingSvgText = ref('')
const filteredIcons = ref<IconMetadata[]>([])

// Estado para el redimensionamiento
const previewSize = ref(400)
const isResizing = ref(false)
const startPos = ref(0)
const startSize = ref(0)

// Estado para el modal de CSS Preview
const showCssPreviewModal = ref(false)

const generateRandomName = () => {
  return `icon-${Math.random().toString(36).substring(2, 8)}`
}

const transformSvg = (svgText: string): string => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgText, 'image/svg+xml')
  const svg = doc.documentElement

  // Siempre establecer width y height al 100%
  svg.setAttribute('width', '100%')
  svg.setAttribute('height', '100%')

  // Preservar viewBox si existe o crear uno basado en las dimensiones originales
  const viewBox = svg.getAttribute('viewBox')
  if (!viewBox) {
    const width = parseFloat(svg.getAttribute('width') || '24')
    const height = parseFloat(svg.getAttribute('height') || '24')
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
  }

  // Reemplazar fill y stroke con currentColor
  const elementsWithColor = [svg, ...svg.querySelectorAll('[fill], [stroke]')]
  elementsWithColor.forEach(el => {
    if (el.getAttribute('fill') && el.getAttribute('fill') !== 'none') {
      el.setAttribute('fill', 'currentColor')
    }
    if (el.getAttribute('stroke') && el.getAttribute('stroke') !== 'none') {
      el.setAttribute('stroke', 'currentColor')
    }
  })

  // Preservar stroke-width si existe
  const strokeWidth = svg.getAttribute('stroke-width')
  if (strokeWidth) {
    svg.setAttribute('stroke-width', strokeWidth)
  }

  return svg.outerHTML
}

const openEditDialog = (icon?: IconMetadata, svgText?: string) => {
  editingIcon.value = icon
  editingSvgText.value = svgText ? transformSvg(svgText) : ''
  showEditDialog.value = true
}

const closeEditDialog = () => {
  showEditDialog.value = false
  editingIcon.value = undefined
  editingSvgText.value = ''
}

const handleEditConfirm = async ({ name, svgText }: { name: string, svgText: string }) => {
  // Aplicar la transformación solo cuando se confirma la edición
  const transformedSvg = transformSvg(svgText)
  
  if (editingIcon.value) {
    // Editar icono existente
    const collection = await importSvgFiles([new Blob([transformedSvg], { type: 'image/svg+xml' })], [name])
    iconStore.updateIcon(editingIcon.value.id, collection.icons[0])
  } else {
    // Crear nuevo icono
    const collection = await importSvgFiles([new Blob([transformedSvg], { type: 'image/svg+xml' })], [name])
    iconStore.addCollection(collection)
  }
  closeEditDialog()
}

const handleRandomName = () => {
  handleEditConfirm({
    name: generateRandomName(),
    svgText: editingSvgText.value
  })
}

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

  // 1. Intentar como SVG directo
  const items = Array.from(clipboardData.items)
  const svgItem = items.find(item => item.type === 'image/svg+xml')
  
  if (svgItem) {
    const svgFile = svgItem.getAsFile()
    if (svgFile) {
      const svgText = await svgFile.text()
      openEditDialog(undefined, svgText)
      return
    }
  }

  // 2. Intentar como texto plano
  const text = clipboardData.getData('text/plain')
  if (text?.trim().toLowerCase().startsWith('<svg')) {
    openEditDialog(undefined, text)
    return
  }

  // 3. Intentar como HTML
  const html = clipboardData.getData('text/html')
  if (html) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const svg = doc.querySelector('svg')
    if (svg) {
      openEditDialog(undefined, svg.outerHTML)
      return
    }
  }
}

const handleFileSelect = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  
  if (file?.type === 'image/svg+xml') {
    const svgText = await file.text()
    openEditDialog(undefined, svgText)
  }
}

const handleIconSelect = (icon: IconMetadata) => {
  iconStore.toggleIconSelection(icon)
}

const handleIconEdit = (icon: IconMetadata) => {
  const svgString = iconStore.generateSvgString(icon)
  openEditDialog(icon, svgString)
}

const handleIconRemove = (icon: IconMetadata) => {
  iconStore.removeIcon(icon.id)
}

const handleIconClone = (icon: IconMetadata) => {
  const svgString = iconStore.generateSvgString(icon)
  openEditDialog(undefined, svgString) // Al clonar, tratamos como nuevo icono
}

const handleImport = async () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.multiple = true
  input.accept = '.svg'
  
  input.onchange = handleFileSelect
  
  input.click()
}

const handleSearch = (query: string) => {
  if (!query.trim()) {
    filteredIcons.value = []
    return
  }
  
  filteredIcons.value = iconStore.searchIcons(query)
}

const handleClear = () => {
  iconStore.clearSelection()
}
const handleExport = async (type: 'svg' | 'font') => {
  if (iconStore.currentProject.selectedIcons.length > 0) {
    try {
      if (type === 'svg') {
        await exportAsSvg(iconStore.currentProject.selectedIcons)
      } else {
        await exportAsFont(iconStore.currentProject.selectedIcons)
      }
    } catch (error) {
      console.error('Error al exportar:', error)
    }
  }
}

const startResizing = (e: MouseEvent) => {
  e.preventDefault()
  isResizing.value = true
  startPos.value = e.clientX
  startSize.value = previewSize.value
  
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResizing)
}

const handleResize = (e: MouseEvent) => {
  if (!isResizing.value) return
  
  const currentPos = e.clientX
  const delta = startPos.value - currentPos
  
  const newSize = Math.min(
    Math.max(200, startSize.value + delta),
    window.innerWidth * 0.6
  )
  
  previewSize.value = newSize
}

const stopResizing = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResizing)
}

// Actualizar el CssPreview para que maneje el evento maximize
const handleCssPreviewMaximize = () => {
  showCssPreviewModal.value = true
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