<template>
  <div 
    class="relative grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4 p-4"
    @mousedown="startSelection"
    @mousemove="updateSelection"
    @mouseup="endSelection"
  >
    <!-- Rectángulo de selección -->
    <div
      v-if="isSelecting"
      class="absolute bg-primary/10 border border-primary/30"
      :style="{
        left: `${Math.min(selectionStart.x, selectionEnd.x)}px`,
        top: `${Math.min(selectionStart.y, selectionEnd.y)}px`,
        width: `${Math.abs(selectionEnd.x - selectionStart.x)}px`,
        height: `${Math.abs(selectionEnd.y - selectionStart.y)}px`,
      }"
    ></div>

    <div
      v-for="icon in icons"
      :key="icon.id"
      :ref="el => iconRefs[icon.id] = el"
      class="group relative aspect-square flex flex-col items-center justify-center gap-2 p-4 rounded-lg border bg-card hover:bg-accent/10 transition-colors"
      :class="{ 'ring-2 ring-primary': selectedIcons.filter((f:any) => f.id === icon.id).length > 0 }"
      @click="$emit('select', icon)"
    >
      <div class="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          class="p-1 rounded hover:bg-accent"
          @click.stop="$emit('edit', icon)"
          title="Editar icono"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button
          class="p-1 rounded hover:bg-accent"
          @click.stop="$emit('clone', icon)"
          title="Clonar icono"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
        </button>
        <button
          class="p-1 rounded hover:bg-accent"
          @click.stop="$emit('remove', icon)"
          title="Eliminar icono"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 6h18"/>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
          </svg>
        </button>
      </div>

      <div class="size-12 flex items-center justify-center bg-muted/30 rounded">
        <div class="size-8" v-html="generateSvgString(icon)"></div>
      </div>
      <span class="text-xs text-center truncate w-full" :title="icon.name">
        {{ icon.name }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { IconMetadata } from '@/types/icon'

const props = defineProps<{
  icons: IconMetadata[]
  selectedIcons: string[]
}>()

const emit = defineEmits<{
  (e: 'select', icon: IconMetadata): void
  (e: 'edit', icon: IconMetadata): void
  (e: 'clone', icon: IconMetadata): void
  (e: 'remove', icon: IconMetadata): void
}>()

// Referencias a los elementos del grid
const iconRefs = ref<Record<string, HTMLElement | null>>({})

// Estado de selección
const isSelecting = ref(false)
const selectionStart = ref({ x: 0, y: 0 })
const selectionEnd = ref({ x: 0, y: 0 })

const startSelection = (e: MouseEvent) => {
  // Solo iniciar selección si se hace click directamente en el grid
  if ((e.target as HTMLElement).closest('.group')) return

  isSelecting.value = true
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  selectionStart.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
  selectionEnd.value = { ...selectionStart.value }
}

const updateSelection = (e: MouseEvent) => {
  if (!isSelecting.value) return

  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  selectionEnd.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }

  // Calcular qué iconos están dentro del área de selección
  const selectedIds = Object.entries(iconRefs.value).reduce((acc, [id, el]) => {
    if (!el) return acc

    const iconRect = el.getBoundingClientRect()
    const gridRect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    
    const iconX = iconRect.left - gridRect.left + iconRect.width / 2
    const iconY = iconRect.top - gridRect.top + iconRect.height / 2

    const inSelectionArea = isPointInSelection(
      iconX,
      iconY,
      selectionStart.value,
      selectionEnd.value
    )

    if (inSelectionArea) {
      acc.push(id)
    }

    return acc
  }, [] as string[])

  // Emitir selección
  const icon = props.icons.find(i => i.id === selectedIds[0])
  if (icon) {
    emit('select', icon)
  }
}

const endSelection = () => {
  isSelecting.value = false
}

const isPointInSelection = (
  x: number,
  y: number,
  start: { x: number; y: number },
  end: { x: number; y: number }
) => {
  const left = Math.min(start.x, end.x)
  const right = Math.max(start.x, end.x)
  const top = Math.min(start.y, end.y)
  const bottom = Math.max(start.y, end.y)

  return x >= left && x <= right && y >= top && y <= bottom
}

const generateSvgString = (icon: IconMetadata): string => {
  const svgAttrs = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '100%',
    height: '100%',
    viewBox: icon.viewBox,
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': icon.strokeWidth || '2'
  }

  const svgAttrsString = Object.entries(svgAttrs)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ')

  const elementsString = icon.elements
    .map(element => {
      const attrs = Object.entries(element.attributes)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ')
      
      if (element.content) {
        return `<${element.type} ${attrs}>${element.content}</${element.type}>`
      }
      return `<${element.type} ${attrs}/>`
    })
    .join('\n  ')

  return `<svg ${svgAttrsString}>\n  ${elementsString}\n</svg>`
}

// Limpiar referencias al desmontar
onUnmounted(() => {
  iconRefs.value = {}
})
</script>

<style scoped>
.grid {
  user-select: none;
}
</style> 