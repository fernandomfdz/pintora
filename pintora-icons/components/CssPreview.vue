<template>
  <div class="h-full flex flex-col">
    <div class="flex items-center justify-between p-4 border-b">
      <h2 class="text-sm font-medium">Vista previa CSS</h2>
      <div class="flex items-center gap-2">
        <button
          class="p-1.5 rounded hover:bg-accent"
          @click="showSettings = true"
          title="Ajustes"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </button>
        <button
          class="p-1.5 rounded hover:bg-accent"
          @click="copyToClipboard"
          title="Copiar al portapapeles"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
        </button>
        <button
          class="p-1.5 rounded hover:bg-accent"
          @click="$emit('maximize')"
          title="Maximizar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 3h6v6"/>
            <path d="M9 21H3v-6"/>
            <path d="M21 3l-7 7"/>
            <path d="M3 21l7-7"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="flex-1 overflow-auto">
      <ShikiPreview
        :code="generatedCss"
        lang="css"
        :theme="settings.theme"
        :show-line-numbers="settings.showLineNumbers"
      />
    </div>

    <CssSettingsModal
      :is-open="showSettings"
      :settings="settings"
      @close="showSettings = false"
      @update="handleSettingsUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { IconMetadata } from '@/types/icon'
import type { Theme } from '@/utils/shiki'
import { getSystemTheme } from '@/utils/shiki'
import CssSettingsModal from './CssSettingsModal.vue'
import ShikiPreview from './ShikiPreview.vue'

interface CssSettings {
  componentName: string
  baseCss: string
  showLineNumbers: boolean
  theme: Theme
}

const props = defineProps<{
  icons: IconMetadata[]
  size?: number
}>()

const emit = defineEmits<{
  (e: 'maximize'): void
}>()

const showSettings = ref(false)
const settings = ref<CssSettings>({
  componentName: '.pintora-icon',
  baseCss: `:root {
  --icon-size: 24px;
}`,
  showLineNumbers: true,
  theme: getSystemTheme()
})

const handleSettingsUpdate = (newSettings: CssSettings) => {
  settings.value = newSettings
}

const generatedCss = computed(() => {
  return `/* Pintora Icons - Generado automáticamente */

${settings.value.baseCss}

${settings.value.componentName} {
  display: inline-block;
  width: var(--icon-size);
  height: var(--icon-size);
  color: currentColor;
}

${generateIconCss(props.icons)}`
})

const generateIconCss = (icons: IconMetadata[]): string => {
  return icons.map(icon => {
    const svgString = generateSvgString(icon)
    const encodedSvg = encodeURIComponent(svgString)
      .replace(/'/g, '%27')
      .replace(/"/g, '%22')

    return `/* ${icon.name} */
${settings.value.componentName}-${icon.name} {
  background-image: url('data:image/svg+xml,${encodedSvg}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}`
  }).join('\n\n')
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

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(generatedCss.value)
  } catch (error) {
    console.error('Error al copiar al portapapeles:', error)
  }
}
</script> 