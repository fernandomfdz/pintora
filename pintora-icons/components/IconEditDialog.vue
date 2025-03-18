<template>
  <div v-if="isOpen" class="fixed inset-0 bg-background/80 backdrop-blur-sm">
    <div class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl">
      <div class="bg-card p-6 rounded-lg shadow-lg border">
        <h2 class="text-lg font-semibold mb-4">{{ isEditing ? 'Editar icono' : 'Nombrar icono' }}</h2>
        <div class="grid grid-cols-2 gap-6">
          <!-- Previsualización del icono -->
          <div class="space-y-4">
            <div>
              <label class="text-sm font-medium mb-1 block">
                Nombre del icono
              </label>
              <input
                v-model="localName"
                type="text"
                class="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="awesome-icon"
                @keyup.enter="confirm"
              />
            </div>
            <div class="border rounded-lg p-4 bg-background/50">
              <div class="text-sm font-medium mb-2">Vista previa</div>
              <div class="flex items-center justify-center p-4 border rounded bg-background">
                <div 
                  class="w-24 h-24"
                  v-html="previewSvg"
                ></div>
              </div>
            </div>
          </div>

          <!-- Editor SVG -->
          <div>
            <label class="text-sm font-medium mb-1 block">
              Código SVG
            </label>
            <textarea
              v-model="localSvg"
              class="w-full h-[250px] px-3 py-2 font-mono text-sm border rounded-md bg-background resize-none"
              spellcheck="false"
              @input="updatePreview"
            ></textarea>
          </div>
        </div>

        <div class="flex justify-end gap-2 mt-6">
          <Button variant="outline" @click="close">
            Cancelar
          </Button>
          <Button variant="outline" @click="useRandomName" v-if="!isEditing">
            Usar nombre aleatorio
          </Button>
          <Button @click="confirm" :disabled="!isValid">
            {{ isEditing ? 'Guardar cambios' : 'Guardar' }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Button from '@pintora-shared/components/ui/Button.vue'
import type { IconMetadata } from '@/types/icon'

const props = defineProps<{
  isOpen: boolean
  icon?: IconMetadata
  svgText?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm', data: { name: string, svgText: string }): void
  (e: 'random-name'): void
}>()

const isEditing = computed(() => !!props.icon)
const localName = ref('')
const localSvg = ref('')
const previewSvg = ref('')
const isValid = ref(true)

watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    localName.value = props.icon?.name || ''
    localSvg.value = props.svgText || ''
    updatePreview()
  }
})

const updatePreview = () => {
  try {
    // Validar que el SVG sea correcto
    const parser = new DOMParser()
    const doc = parser.parseFromString(localSvg.value, 'image/svg+xml')
    const svg = doc.querySelector('svg')
    
    if (svg) {
      // Asegurarnos de que tenga los atributos necesarios
      if (!svg.hasAttribute('width')) svg.setAttribute('width', '100%')
      if (!svg.hasAttribute('height')) svg.setAttribute('height', '100%')
      if (!svg.hasAttribute('viewBox')) svg.setAttribute('viewBox', '0 0 24 24')
      
      // Reemplazar fill y stroke por currentColor
      const elements = [svg, ...Array.from(svg.getElementsByTagName('*'))]
      elements.forEach(el => {
        if (el.hasAttribute('fill')) el.setAttribute('fill', 'currentColor')
        if (el.hasAttribute('stroke')) el.setAttribute('stroke', 'currentColor')
      })

      previewSvg.value = svg.outerHTML
      isValid.value = true
    } else {
      isValid.value = false
    }
  } catch (error) {
    console.error('Error al validar SVG:', error)
    isValid.value = false
  }
}

const close = () => {
  emit('close')
}

const confirm = () => {
  if (isValid.value && localName.value) {
    emit('confirm', {
      name: localName.value,
      svgText: localSvg.value
    })
  }
}

const useRandomName = () => {
  emit('random-name')
}
</script> 