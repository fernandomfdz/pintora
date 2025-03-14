<script setup lang="ts">
import type { IconMetadata } from '../../../types/icon'
import { computed } from 'vue'

const props = defineProps<{
  icons: IconMetadata[]
  selectedIcons?: IconMetadata[]
}>()

const emit = defineEmits<{
  (e: 'select', icon: IconMetadata): void
}>()

const isSelected = computed(() => (icon: IconMetadata) => {
  return props.selectedIcons?.some(i => i.id === icon.id) ?? false
})
</script>

<template>
  <div class="grid grid-cols-8 gap-4 p-4">
    <button
      v-for="icon in icons"
      :key="icon.id"
      class="aspect-square p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      :class="{ 'bg-gray-100 dark:bg-gray-800': isSelected(icon) }"
      @click="emit('select', icon)"
    >
      <div class="w-full h-full flex items-center justify-center">
        <svg
          :viewBox="icon.viewBox || '0 0 24 24'"
          :width="icon.width || 24"
          :height="icon.height || 24"
          class="w-6 h-6"
        >
          <path :d="icon.path" />
        </svg>
      </div>
    </button>
  </div>
</template> 