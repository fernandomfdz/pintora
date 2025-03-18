<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      @click="$emit('close')"
    >
      <div
        class="relative w-[600px] bg-card border rounded-lg shadow-lg"
        @click.stop
      >
        <div class="flex items-center justify-between p-4 border-b">
          <h2 class="text-lg font-medium">Ajustes CSS</h2>
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

        <div class="p-6 space-y-6">
          <!-- Ajustes del editor -->
          <div class="space-y-4 pb-4 border-b">
            <h3 class="text-sm font-medium text-muted-foreground">Ajustes del editor</h3>
            <div class="space-y-2">
              <label class="flex items-center gap-2">
                <input
                  v-model="localSettings.showLineNumbers"
                  type="checkbox"
                  class="rounded border-input"
                />
                <span class="text-sm">Mostrar números de línea</span>
              </label>
            </div>
            <div class="space-y-2">
              <label class="text-sm">Tema del editor</label>
              <select
                v-model="localSettings.theme"
                class="w-full px-3 py-2 rounded-md border bg-background"
              >
                <option 
                  v-for="theme in availableThemes" 
                  :key="theme" 
                  :value="theme"
                >
                  {{ themeLabels[theme] }}
                </option>
              </select>
            </div>
          </div>

          <!-- Ajustes CSS -->
          <div class="space-y-2">
            <label class="text-sm font-medium">
              Nombre del componente CSS
            </label>
            <input
              v-model="localSettings.componentName"
              type="text"
              class="w-full px-3 py-2 rounded-md border bg-background"
              placeholder=".pintora-icon"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">
              CSS Base
            </label>
            <textarea
              v-model="localSettings.baseCss"
              class="w-full h-[200px] px-3 py-2 font-mono text-sm border rounded-md bg-background resize-none"
              spellcheck="false"
            ></textarea>
          </div>
        </div>

        <div class="flex items-center justify-end gap-2 p-4 border-t">
          <button
            class="px-4 py-2 rounded-md border hover:bg-accent"
            @click="$emit('close')"
          >
            Cancelar
          </button>
          <button
            class="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
            @click="handleSave"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { themes, type Theme, getSystemTheme } from '@/utils/shiki'

interface CssSettings {
  componentName: string
  baseCss: string
  showLineNumbers: boolean
  theme: Theme
}

const props = defineProps<{
  isOpen: boolean
  settings: CssSettings
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update', settings: CssSettings): void
}>()

const localSettings = ref<CssSettings>({
  componentName: props.settings.componentName,
  baseCss: props.settings.baseCss,
  showLineNumbers: props.settings.showLineNumbers ?? true,
  theme: props.settings.theme ?? getSystemTheme()
})

// Actualizar settings locales cuando cambian las props
watch(() => props.settings, (newSettings) => {
  localSettings.value = { 
    ...newSettings,
    showLineNumbers: newSettings.showLineNumbers ?? localSettings.value.showLineNumbers,
    theme: newSettings.theme ?? localSettings.value.theme
  }
}, { deep: true })

const handleSave = () => {
  emit('update', localSettings.value)
  emit('close')
}

const themeLabels: Record<Theme, string> = {
  'github-dark': 'GitHub Oscuro',
  'github-light': 'GitHub Claro',
  'nord': 'Nord',
  'solarized-light': 'Solarized Claro'
}

const availableThemes = themes
</script> 