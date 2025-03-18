<template>
  <div class="relative">
    <!-- Contenedor del código con soporte para folding -->
    <div 
      ref="codeContainer"
      class="font-mono text-sm overflow-auto"
      :class="{ 'line-numbers': showLineNumbers }"
    >
      <div v-html="highlightedCode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { highlight, type Theme, getSystemTheme } from '@/utils/shiki'

const props = defineProps<{
  code: string
  lang?: string
  theme?: Theme
  showLineNumbers?: boolean
}>()

// Estado
const codeContainer = ref<HTMLElement | null>(null)
const highlightedCode = ref('')

// Computed
const effectiveTheme = computed(() => props.theme || getSystemTheme())
const effectiveLang = computed(() => props.lang || 'css')

// Inicializar Shiki
const updateHighlightedCode = async () => {
  try {
    const html = await highlight(props.code, {
      lang: effectiveLang.value,
      theme: effectiveTheme.value
    })

    highlightedCode.value = props.showLineNumbers ? addLineNumbers(html) : html
  } catch (error) {
    console.error('Error al resaltar el código:', error)
  }
}

// Añadir números de línea al código
const addLineNumbers = (html: string): string => {
  const lines = html.split('\n')
  return lines
    .map((line, index) => {
      const lineNumber = index + 1
      return `<div class="line" data-line="${lineNumber}">${line}</div>`
    })
    .join('\n')
}

// Watchers
watch(() => props.code, updateHighlightedCode)
watch(() => props.theme, updateHighlightedCode)

// Lifecycle
onMounted(() => {
  updateHighlightedCode()
})
</script>