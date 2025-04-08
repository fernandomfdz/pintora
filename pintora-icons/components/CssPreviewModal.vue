<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      @click="$emit('close')"
    >
      <div
        class="relative w-[90vw] h-[90vh] bg-card border rounded-lg shadow-lg"
        @click.stop
      >
        <button
          class="absolute top-4 right-4 p-2 rounded hover:bg-accent"
          @click="$emit('close')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
          </svg>
        </button>

        <div class="h-full">
          <CssPreview :icons="icons" :size="800" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { Icon } from '@/types/icon'
import CssPreview from './CssPreview.vue'

defineProps<{
  isOpen: boolean
  icons: Icon[]
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script> 