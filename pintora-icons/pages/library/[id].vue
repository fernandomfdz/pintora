<template>
  <div class="container mx-auto py-6 space-y-6">
    <div class="flex items-center justify-between">
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

    <IconGrid
      :icons="gridIcons"
      :selected-icons="selectedIcons"
      @select="handleIconSelect"
      @edit="handleIconEdit"
      @clone="handleIconClone"
      @remove="handleIconRemove"
    />

    <IconImportDialog
      v-if="showImportDialog"
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useIconLibraries } from '@/composables/useIconLibraries'
import type { IconMetadata, Icon, IconLibrary } from '@/types/icon'
import { generateRandomIconName } from '@/utils/icons'
import { parseSvgFromClipboard } from '@/utils/svg'

const route = useRoute()
const libraryId = route.params.id as string

const { getLibrary, updateLibrary } = useIconLibraries()

const library = ref<IconLibrary | null>(null)
const selectedIcons = ref<IconMetadata[]>([])
const showImportDialog = ref(false)
const showEditDialog = ref(false)
const showCssPreview = ref(false)
const editingIcon = ref<IconMetadata | null>(null)
const editingSvgText = ref('')
const searchQuery = ref('')

// Cargar la librería
const loadLibrary = async () => {
  library.value = await getLibrary(libraryId)
}

// Convertir Icon a IconMetadata
const toIconMetadata = (icon: Icon): IconMetadata => {
  const { svg, ...metadata } = icon
  return metadata
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
      icon.name.toLowerCase().includes(query) ||
      icon.tags?.some(tag => tag.toLowerCase().includes(query))
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

const handleIconClone = async (icon: IconMetadata) => {
  if (!library.value) return

  const dbIcon = library.value.icons.find(i => i.id === icon.id)
  if (!dbIcon) return

  const newIcon: Icon = {
    ...toDbIcon(icon),
    id: crypto.randomUUID(),
    name: `${icon.name}-copy`
  }

  library.value.icons.push(newIcon)
  await updateLibrary(library.value)
}

const handleIconRemove = async (icon: IconMetadata) => {
  if (!library.value) return
  
  library.value.icons = library.value.icons.filter(i => i.id !== icon.id)
  await updateLibrary(library.value)
}

const handleIconsImport = async (icons: IconMetadata[]) => {
  if (!library.value) return

  const newIcons = icons.map(icon => toDbIcon(icon))
  library.value.icons.push(...newIcons)
  await updateLibrary(library.value)
  showImportDialog.value = false
}

const closeEditDialog = () => {
  showEditDialog.value = false
  editingIcon.value = null
  editingSvgText.value = ''
}

const handleIconUpdate = async (data: { name: string; svgText: string }) => {
  console.log('entra a handleIconUpdate')
  if (!library.value) return
  console.log('library.value', library.value)
  const baseIcon = editingIcon.value || {
    id: crypto.randomUUID(),
    width: '24',
    height: '24',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    elements: []
  }

  const updatedIcon: Icon = {
    ...baseIcon,
    name: data.name,
    svg: data.svgText,
    viewBox: baseIcon.viewBox || '0 0 24 24'
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

const { exportAsFont, exportAsSvg } = useIconExport()

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
  const svgData = await parseSvgFromClipboard(event)
  if (svgData) {
    const newIcon: IconMetadata = {
      id: crypto.randomUUID(),
      name: generateRandomIconName(),
      width: svgData.width || '24',
      height: svgData.height || '24',
      viewBox: svgData.viewBox || '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      elements: []
    }
    editingIcon.value = newIcon
    editingSvgText.value = svgData.svg
    showEditDialog.value = true
  }
}

// Escuchar eventos de pegado
onMounted(() => {
  document.addEventListener('paste', handlePaste)
  loadLibrary()
})

onUnmounted(() => {
  document.removeEventListener('paste', handlePaste)
})
</script> 