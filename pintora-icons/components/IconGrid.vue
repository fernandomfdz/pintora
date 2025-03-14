<script setup lang="ts">
import type { IconMetadata, SvgElement } from '@/types/icon'
import { computed } from 'vue'
import { useIconStore } from '@/stores/useIconStore'

const props = defineProps<{
  icons: IconMetadata[]
  selectedIcons?: IconMetadata[]
}>()

const emit = defineEmits<{
  (e: 'select', icon: IconMetadata): void
}>()

const iconStore = useIconStore()

const isSelected = computed(() => (icon: IconMetadata) => {
  return props.selectedIcons?.some(i => i.id === icon.id) ?? false
})

const renderElement = (element: SvgElement) => {
  const { type, attributes, content } = element
  const attrs = { ...attributes }
  
  // Si el elemento es un path y no tiene fill/stroke, usar los del icono padre
  if (type === 'path' && !attrs.fill && !attrs.stroke) {
    attrs.fill = 'currentColor'
  }

  return h(type, attrs, content)
}
</script>

<template>
  <div class="grid grid-cols-8 gap-4 p-4">
    <div
      v-for="icon in icons"
      :key="icon.id"
      class="group relative aspect-square p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      :class="{ 'bg-gray-100 dark:bg-gray-800': isSelected(icon) }"
    >
      <button
        class="w-full h-full"
        @click="emit('select', icon)"
      >
        <div class="w-full h-full flex items-center justify-center">
          <svg
            :viewBox="icon.viewBox || '0 0 24 24'"
            :width="icon.width || 24"
            :height="icon.height || 24"
            class="w-6 h-6"
            :fill="icon.fill || 'none'"
            :stroke="icon.stroke || 'currentColor'"
            :stroke-width="icon.strokeWidth || '2'"
          >
            <component
              v-for="element in icon.elements"
              :key="element.type + JSON.stringify(element.attributes)"
              :is="element.type"
              v-bind="element.attributes"
            >
              {{ element.content }}
            </component>
          </svg>
        </div>
      </button>
      <button
        class="absolute top-1 right-1 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
        @click="iconStore.removeIcon(icon.id)"
        title="Eliminar icono"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18"/>
          <path d="m6 6 12 12"/>
        </svg>
      </button>
    </div>
  </div>
</template> 