<!-- Modal de exportación -->
<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      @click="$emit('close')"
    >
      <div
        class="relative w-[500px] bg-card border rounded-lg shadow-lg"
        @click.stop
      >
        <!-- Cabecera -->
        <div class="flex items-center justify-between p-6 border-b">
          <h2 class="text-lg font-semibold">Exportar iconos</h2>
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

        <!-- Contenido -->
        <div class="p-6 space-y-6">
          <!-- Opciones de exportación -->
          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <div class="flex-1">
                <label class="flex items-center gap-2">
                  <input
                    type="radio"
                    v-model="exportType"
                    value="css"
                    class="rounded-full border-muted"
                  />
                  <span class="font-medium">Solo CSS</span>
                </label>
                <p class="mt-1 text-sm text-muted-foreground">
                  Archivo CSS con las clases para usar los iconos como máscaras SVG.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="flex-1">
                <label class="flex items-center gap-2">
                  <input
                    type="radio"
                    v-model="exportType"
                    value="font"
                    class="rounded-full border-muted"
                  />
                  <span class="font-medium">Paquete completo</span>
                </label>
                <p class="mt-1 text-sm text-muted-foreground">
                  Archivo ZIP que incluye:
                </p>
                <ul class="mt-2 ml-4 text-sm text-muted-foreground list-disc">
                  <li>Fuentes en formatos TTF, WOFF2 y OTF</li>
                  <li>Archivo CSS con las clases y configuración</li>
                  <li>Página HTML de demostración</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Barra de progreso -->
          <div v-if="isExporting" class="space-y-2">
            <div class="h-2 bg-muted rounded overflow-hidden">
              <div
                class="h-full bg-primary transition-all duration-300 ease-in-out"
                :style="{ width: `${progress}%` }"
              ></div>
            </div>
            <p class="text-sm text-muted-foreground text-center">
              {{ progressText }}
            </p>
          </div>
        </div>

        <!-- Pie -->
        <div class="flex justify-end gap-2 p-6 border-t">
          <button
            class="px-4 py-2 rounded bg-muted hover:bg-muted/80 transition-colors"
            @click="$emit('close')"
            :disabled="isExporting"
          >
            Cancelar
          </button>
          <button
            class="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            @click="handleExport"
            :disabled="isExporting"
          >
            {{ isExporting ? 'Exportando...' : 'Exportar' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { IconMetadata } from '@/types/icon'

const props = defineProps<{
  isOpen: boolean
  icons: IconMetadata[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'export-complete'): void
}>()

const exportType = ref<'css' | 'font'>('font')
const isExporting = ref(false)
const progress = ref(0)
const currentStep = ref('')

const progressText = computed(() => {
  if (!isExporting.value) return ''
  
  switch (currentStep.value) {
    case 'svg':
      return 'Generando fuente SVG...'
    case 'fonts':
      return 'Convirtiendo a formatos TTF, WOFF2 y OTF...'
    case 'templates':
      return 'Generando archivos CSS y HTML...'
    case 'zip':
      return 'Creando archivo ZIP...'
    default:
      return 'Preparando exportación...'
  }
})

const updateProgress = (step: string, value: number) => {
  currentStep.value = step
  progress.value = value
}

const handleExport = async () => {
  isExporting.value = true
  progress.value = 0

  try {
    if (exportType.value === 'css') {
      await exportCss()
    } else {
      await exportFontPackage()
    }
    emit('export-complete')
    emit('close')
  } catch (error) {
    console.error('Error al exportar:', error)
  } finally {
    isExporting.value = false
    progress.value = 0
    currentStep.value = ''
  }
}

const exportCss = async () => {
  updateProgress('templates', 50)
  
  // Generar solo el CSS
  const worker = new Worker(new URL('@/workers/css-generator.worker.ts', import.meta.url))
  
  return new Promise((resolve, reject) => {
    worker.onmessage = (e) => {
      const { type, data, error } = e.data
      
      if (type === 'success') {
        // Descargar el archivo CSS
        const url = URL.createObjectURL(new Blob([data], { type: 'text/css' }))
        const link = document.createElement('a')
        link.href = url
        link.download = 'pintora-icons.css'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        updateProgress('templates', 100)
        resolve(undefined)
      } else {
        reject(new Error(error))
      }
    }

    worker.postMessage({
      icons: props.icons,
      settings: {
        componentName: '.pintora-icon',
        baseCss: `:root {
  --icon-size: 24px;
}`
      }
    })
  })
}

const exportFontPackage = async () => {
  // Generar el paquete completo con fuentes
  const worker = new Worker(new URL('@/workers/font-generator.worker.ts', import.meta.url))
  
  return new Promise((resolve, reject) => {
    worker.onmessage = (e) => {
      const { type, data, error, progress: workerProgress } = e.data
      
      if (type === 'progress') {
        updateProgress(workerProgress.step, workerProgress.value)
      } else if (type === 'success') {
        // Descargar el archivo ZIP
        const url = URL.createObjectURL(data)
        const link = document.createElement('a')
        link.href = url
        link.download = 'pintora-icons.zip'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        resolve(undefined)
      } else {
        reject(new Error(error))
      }
    }

    worker.postMessage({
      icons: props.icons,
      settings: {
        componentName: '.pintora-icon',
        baseCss: `:root {
  --icon-size: 24px;
}`
      }
    })
  })
}
</script> 