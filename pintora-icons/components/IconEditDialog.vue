<template>
  <div v-if="isOpen" class="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm">
    <div class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] flex flex-col">
      <div class="bg-card rounded-lg shadow-lg border flex flex-col h-full">
        <!-- Header -->
        <div class="p-6 border-b flex items-center justify-between">
          <h2 class="text-lg font-semibold">{{ isEditing ? 'Editar icono' : 'Nombrar icono' }}</h2>
          <button 
            class="p-2 hover:bg-accent rounded-md"
            @click="close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M8 6.586L14.293.293l1.414 1.414L9.414 8l6.293 6.293-1.414 1.414L8 9.414l-6.293 6.293-1.414-1.414L6.586 8 .293 1.707 1.707.293 8 6.586z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto max-h-[calc(90vh-8rem)]">
          <div class="p-6 space-y-6">
            <!-- Nombre -->
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

            <div class="flex gap-6">
              <!-- SVG Preview & Code -->
              <div class="flex-1 space-y-4">
                <!-- Preview -->
                <div class="border rounded-lg p-4 bg-background/50">
                  <div class="text-sm font-medium mb-2">Vista previa</div>
                  <div class="flex items-center justify-center p-8 bg-background">
                    <div class="w-32 h-32" v-html="localSvg"></div>
                  </div>
                </div>

                <!-- Code -->
                <div>
                  <label class="text-sm font-medium mb-1 block">
                    Código SVG
                  </label>
                  <div class="border rounded-md overflow-hidden">
                    <textarea
                      v-model="localSvg"
                      class="w-full h-[300px] overflow-auto font-mono text-sm"
                      @change="updatePreview"
                    />
                  </div>
                </div>
              </div>

              <!-- Layers Panel -->
              <div class="w-80">
                <div class="text-sm font-medium mb-4">Capas</div>
                
                <div class="space-y-2">
                  <!-- SVG Root Layer -->
                  <div 
                    class="border rounded-md p-3 bg-background/50" 
                    v-if="colorElements.length > 0"
                    :class="{'opacity-50': !colorElements[0].isVisible}"
                  >
                    <div class="flex items-center gap-2 mb-2">
                      <button 
                        class="p-1 hover:bg-accent rounded"
                        @click="toggleElement(0)"
                      >
                        <svg width="12" height="12" viewBox="0 0 16 16">
                          <path :d="colorElements[0].isExpanded ? 'M2 6l6 6 6-6H2z' : 'M6 2l6 6-6 6V2z'" fill="currentColor"/>
                        </svg>
                      </button>
                      <div class="flex-1 text-sm font-medium">SVG</div>
                      <button 
                        class="p-1 hover:bg-accent rounded"
                        @click="toggleVisibility(0)"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16">
                          <path :d="colorElements[0].isVisible ? 'M8 3C4.5 3 1.5 5.5 0 8c1.5 2.5 4.5 5 8 5s6.5-2.5 8-5c-1.5-2.5-4.5-5-8-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z' : 'M13.359 11.238L15.148 13l-1.411 1.411-1.789-1.762-1.789 1.762-1.411-1.411 1.789-1.762-1.789-1.762 1.411-1.411 1.789 1.762 1.789-1.762 1.411 1.411-1.789 1.762zM2 8c1.5 2.5 4.5 5 8 5 .788 0 1.55-.13 2.277-.375L10.85 11.2A3 3 0 0 1 5.2 5.55L3.777 4.125A10.953 10.953 0 0 0 2 8z'" fill="currentColor"/>
                        </svg>
                      </button>
                    </div>
                    
                    <div v-if="colorElements[0].isExpanded" class="space-y-2 pl-6">
                      <div class="space-y-1">
                        <label class="text-xs block">Fill</label>
                        <div class="flex items-center gap-2">
                          <select
                            v-model="colorElements[0].fillType"
                            class="flex-1 px-2 py-1 text-xs border rounded"
                            @change="handleFillTypeChange(0)"
                          >
                            <option value="none">none</option>
                            <option value="currentColor">currentColor</option>
                            <option value="custom">Color personalizado</option>
                          </select>
                          
                          <div class="w-6 h-6 border rounded flex items-center justify-center">
                            <template v-if="colorElements[0].fillType === 'none'">
                              <svg width="16" height="16" viewBox="0 0 16 16">
                                <path d="M2 2L14 14M2 14L14 2" stroke="currentColor" stroke-width="2"/>
                              </svg>
                            </template>
                            <template v-else-if="colorElements[0].fillType === 'currentColor'">
                              <svg width="16" height="16" viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="6" fill="currentColor"/>
                              </svg>
                            </template>
                            <template v-else>
                              <input 
                                type="color"
                                :value="colorElements[0].fill || '#000000'"
                                class="w-full h-full cursor-pointer"
                                @input="(e) => handleColorChange(0, 'fill', e.target.value)"
                              />
                            </template>
                          </div>
                        </div>
                      </div>

                      <div class="space-y-1">
                        <label class="text-xs block">Stroke</label>
                        <div class="flex items-center gap-2">
                          <select
                            v-model="colorElements[0].strokeType"
                            class="flex-1 px-2 py-1 text-xs border rounded"
                            @change="handleStrokeTypeChange(0)"
                          >
                            <option value="none">none</option>
                            <option value="currentColor">currentColor</option>
                            <option value="custom">Color personalizado</option>
                          </select>
                          
                          <div class="w-6 h-6 border rounded flex items-center justify-center">
                            <template v-if="colorElements[0].strokeType === 'none'">
                              <svg width="16" height="16" viewBox="0 0 16 16">
                                <path d="M2 2L14 14M2 14L14 2" stroke="currentColor" stroke-width="2"/>
                              </svg>
                            </template>
                            <template v-else-if="colorElements[0].strokeType === 'currentColor'">
                              <svg width="16" height="16" viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="6" stroke="currentColor" fill="none" stroke-width="2"/>
                              </svg>
                            </template>
                            <template v-else>
                              <input 
                                type="color"
                                :value="colorElements[0].stroke || '#000000'"
                                class="w-full h-full cursor-pointer"
                                @input="(e) => handleColorChange(0, 'stroke', e.target.value)"
                              />
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Child Elements -->
                  <div 
                    v-for="(element, index) in colorElements.slice(1)" 
                    :key="index"
                    class="border rounded-md p-3 bg-background/50 ml-4"
                    :class="{'opacity-50': !element.isVisible}"
                  >
                    <div class="flex items-center gap-2 mb-2">
                      <button 
                        class="p-1 hover:bg-accent rounded"
                        @click="toggleElement(index + 1)"
                      >
                        <svg width="12" height="12" viewBox="0 0 16 16">
                          <path :d="element.isExpanded ? 'M2 6l6 6 6-6H2z' : 'M6 2l6 6-6 6V2z'" fill="currentColor"/>
                        </svg>
                      </button>
                      <div class="w-8 h-8 border rounded bg-background flex items-center justify-center">
                        <div class="w-6 h-6" v-html="getElementPreview(element)"></div>
                      </div>
                      <div class="flex-1 text-sm">Elemento {{ index+1 }}</div>
                      <button 
                        class="p-1 hover:bg-accent rounded"
                        @click="toggleVisibility(index + 1)"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16">
                          <path :d="element.isVisible ? 'M8 3C4.5 3 1.5 5.5 0 8c1.5 2.5 4.5 5 8 5s6.5-2.5 8-5c-1.5-2.5-4.5-5-8-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z' : 'M13.359 11.238L15.148 13l-1.411 1.411-1.789-1.762-1.789 1.762-1.411-1.411 1.789-1.762-1.789-1.762 1.411-1.411 1.789 1.762 1.789-1.762 1.411 1.411-1.789 1.762zM2 8c1.5 2.5 4.5 5 8 5 .788 0 1.55-.13 2.277-.375L10.85 11.2A3 3 0 0 1 5.2 5.55L3.777 4.125A10.953 10.953 0 0 0 2 8z'" fill="currentColor"/>
                        </svg>
                      </button>
                    </div>

                    <div v-if="element.isExpanded" class="space-y-2 pl-6">
                      <div class="space-y-1">
                        <label class="text-xs block">Fill</label>
                        <div class="flex items-center gap-2">
                          <select
                            v-model="element.fillType"
                            class="flex-1 px-2 py-1 text-xs border rounded"
                            @change="handleFillTypeChange(index + 1)"
                          >
                            <option value="none">none</option>
                            <option value="currentColor">currentColor</option>
                            <option value="custom">Color personalizado</option>
                          </select>
                          
                          <div class="w-6 h-6 border rounded flex items-center justify-center">
                            <template v-if="element.fillType === 'none'">
                              <svg width="16" height="16" viewBox="0 0 16 16">
                                <path d="M2 2L14 14M2 14L14 2" stroke="currentColor" stroke-width="2"/>
                              </svg>
                            </template>
                            <template v-else-if="element.fillType === 'currentColor'">
                              <svg width="16" height="16" viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="6" fill="currentColor"/>
                              </svg>
                            </template>
                            <template v-else>
                              <input 
                                type="color"
                                :value="element.fill || '#000000'"
                                class="w-full h-full cursor-pointer"
                                @input="(e) => handleColorChange(index + 1, 'fill', e.target.value)"
                              />
                            </template>
                          </div>
                        </div>
                      </div>

                      <div class="space-y-1">
                        <label class="text-xs block">Stroke</label>
                        <div class="flex items-center gap-2">
                          <select
                            v-model="element.strokeType"
                            class="flex-1 px-2 py-1 text-xs border rounded"
                            @change="handleStrokeTypeChange(index + 1)"
                          >
                            <option value="none">none</option>
                            <option value="currentColor">currentColor</option>
                            <option value="custom">Color personalizado</option>
                          </select>
                          
                          <div class="w-6 h-6 border rounded flex items-center justify-center">
                            <template v-if="element.strokeType === 'none'">
                              <svg width="16" height="16" viewBox="0 0 16 16">
                                <path d="M2 2L14 14M2 14L14 2" stroke="currentColor" stroke-width="2"/>
                              </svg>
                            </template>
                            <template v-else-if="element.strokeType === 'currentColor'">
                              <svg width="16" height="16" viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="6" stroke="currentColor" fill="none" stroke-width="2"/>
                              </svg>
                            </template>
                            <template v-else>
                              <input 
                                type="color"
                                :value="element.stroke || '#000000'"
                                class="w-full h-full cursor-pointer"
                                @input="(e) => handleColorChange(index + 1, 'stroke', e.target.value)"
                              />
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-6 border-t flex justify-end gap-2">
          <button 
            class="px-4 py-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground"
            @click="close"
          >
            Cancelar
          </button>
          <button 
            v-if="!isEditing"
            class="px-4 py-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground"
            @click="useRandomName"
          >
            Usar nombre aleatorio
          </button>
          <button 
            class="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
            @click="confirm"
            :disabled="!isValid"
          >
            {{ isEditing ? 'Guardar cambios' : 'Guardar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { IconMetadata } from '@/types/icon'

interface Props {
  isOpen: boolean
  icon: IconMetadata | null
  svgText: string
}

interface ColorElement {
  element: Element
  fill: string | null
  stroke: string | null
  fillType: 'none' | 'currentColor' | 'custom'
  strokeType: 'none' | 'currentColor' | 'custom'
  outerHTML: string
  tagName: string
  index: number
  isExpanded: boolean
  isVisible: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm', data: { id: string, name: string, svgText: string }): void
  (e: 'random-name'): void
}>()

const isEditing = computed(() => !!props.icon)
const localName = ref(props.icon?.name || '')
const localSvg = ref(props.svgText || '')
const previewSvg = ref(props.svgText || '')
const isValid = ref(true)
const colorElements = ref<ColorElement[]>([])

watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    localName.value = props.icon?.name || ''
    localSvg.value = props.svgText || ''
    updatePreview()
  }
})

const getElementPreview = (element: ColorElement) => {
  if (!element.isVisible) return ''
  const parser = new DOMParser()
  const doc = parser.parseFromString(element.outerHTML, 'image/svg+xml')
  const svg = doc.querySelector('svg')
  if (!svg) return ''
  return svg.outerHTML
}

const extractColorElements = (svg: SVGElement) => {
  const colorElements: ColorElement[] = []
  let elementIndex = 0

  // Añadir el SVG padre primero
  const svgFill = svg.getAttribute('fill')
  const svgStroke = svg.getAttribute('stroke')
  
  const getFillType = (value: string | null): ColorElement['fillType'] => {
    if (!value || value === 'none') return 'none'
    if (value === 'currentColor') return 'currentColor'
    return 'custom'
  }

  const getStrokeType = (value: string | null): ColorElement['strokeType'] => {
    if (!value || value === 'none') return 'none'
    if (value === 'currentColor') return 'currentColor'
    return 'custom'
  }

  colorElements.push({
    element: svg,
    fill: svgFill?.startsWith('#') ? svgFill : null,
    stroke: svgStroke?.startsWith('#') ? svgStroke : null,
    fillType: getFillType(svgFill),
    strokeType: getStrokeType(svgStroke),
    outerHTML: svg.outerHTML,
    tagName: 'svg',
    index: elementIndex++,
    isExpanded: false,
    isVisible: true
  })

  // Añadir el resto de elementos que tengan fill o stroke
  const elements = Array.from(svg.getElementsByTagName('*'))
  elements.forEach(el => {
    const fill = el.getAttribute('fill')
    const stroke = el.getAttribute('stroke')
    
    if (fill !== null || stroke !== null) {
      // Crear un nuevo SVG contenedor para el elemento
      const container = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      container.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
      container.setAttribute('width', '100%')
      container.setAttribute('height', '100%')
      container.setAttribute('viewBox', '0 0 24 24')
      
      // Clonar el elemento y añadirlo al contenedor
      const clone = el.cloneNode(true) as Element
      container.appendChild(clone)

      colorElements.push({
        element: el,
        fill: fill?.startsWith('#') ? fill : null,
        stroke: stroke?.startsWith('#') ? stroke : null,
        fillType: getFillType(fill),
        strokeType: getStrokeType(stroke),
        outerHTML: container.outerHTML,
        tagName: el.tagName.toLowerCase(),
        index: elementIndex++,
        isExpanded: false,
        isVisible: true
      })
    }
  })

  return colorElements
}

const toggleElement = (index: number) => {
  colorElements.value[index].isExpanded = !colorElements.value[index].isExpanded
}

const toggleVisibility = (index: number) => {
  // Toggle the visibility in the colorElements array
  colorElements.value[index].isVisible = !colorElements.value[index].isVisible
  
  // Parse the current SVG
  const parser = new DOMParser()
  const doc = parser.parseFromString(localSvg.value, 'image/svg+xml')
  
  if (index === 0) {
    // If it's the root SVG
    const svg = doc.querySelector('svg')
    if (svg) {
      if (colorElements.value[index].isVisible) {
        svg.removeAttribute('style')
      } else {
        svg.setAttribute('style', 'visibility: hidden')
      }
    }
  } else {
    // If it's a child element
    const elements = Array.from(doc.querySelectorAll('*')).filter(el => 
      el.tagName.toLowerCase() === colorElements.value[index].tagName &&
      (el.getAttribute('fill') !== null || el.getAttribute('stroke') !== null)
    )

    let element = elements[index-1];

    if (element) {
      if (colorElements.value[index].isVisible) {
        element.removeAttribute('style');
      } else {
        element.setAttribute('style', 'visibility: hidden');
      }
    }
  }

  // Update the SVG and preview
  const svg = doc.querySelector('svg')
  if (svg) {
    localSvg.value = svg.outerHTML
    previewSvg.value = svg.outerHTML
  }
}

const handleFillTypeChange = (index: number) => {
  const element = colorElements.value[index]
  let newFillValue: string
  
  switch (element.fillType) {
    case 'none':
      newFillValue = 'none'
      element.fill = null
      break
    case 'currentColor':
      newFillValue = 'currentColor'
      element.fill = null
      break
    case 'custom':
      newFillValue = element.fill || '#000000'
      break
    default:
      newFillValue = 'none'
  }
  
  updateSvgAttribute(index, 'fill', newFillValue)
}

const handleStrokeTypeChange = (index: number) => {
  const element = colorElements.value[index]
  let newStrokeValue: string
  
  switch (element.strokeType) {
    case 'none':
      newStrokeValue = 'none'
      element.stroke = null
      break
    case 'currentColor':
      newStrokeValue = 'currentColor'
      element.stroke = null
      break
    case 'custom':
      newStrokeValue = element.stroke || '#000000'
      break
    default:
      newStrokeValue = 'none'
  }
  
  updateSvgAttribute(index, 'stroke', newStrokeValue)
}

const handleColorChange = (index: number, type: 'fill' | 'stroke', value: string) => {
  const element = colorElements.value[index]
  if (type === 'fill') {
    element.fill = value
  } else {
    element.stroke = value
  }
  updateSvgAttribute(index, type, value)
}

const updateSvgAttribute = (index: number, attribute: string, value: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(localSvg.value, 'image/svg+xml')
  
  if (index === 0) {
    // Si es el SVG padre
    const svg = doc.querySelector('svg')
    if (svg) {
      svg.setAttribute(attribute, value)
    }
  } else {
    // Si es un elemento hijo
    const elements = Array.from(doc.querySelectorAll('*')).filter(el => 
      el.tagName.toLowerCase() === colorElements.value[index].tagName &&
      (el.getAttribute('fill') !== null || el.getAttribute('stroke') !== null)
    )

    let element = elements[index-1];
    if (element) {
      element.setAttribute(attribute, value);
    }
  }

  const svg = doc.querySelector('svg')
  if (svg) {
    localSvg.value = svg.outerHTML
    previewSvg.value = svg.outerHTML
  }
}

const getElementSelector = (element: Element): string => {
  if (element.tagName.toLowerCase() === 'svg') {
    return 'svg'
  }

  const path: number[] = []
  let current = element
  while (current.parentElement && current.parentElement.tagName !== 'svg') {
    const siblings = Array.from(current.parentElement.children)
    path.unshift(siblings.indexOf(current))
    current = current.parentElement
  }
  
  return path.reduce((selector, index) => {
    return `${selector} > *:nth-child(${index + 1})`
  }, element.tagName.toLowerCase())
}

const updatePreview = () => {
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(localSvg.value, 'image/svg+xml')
    const svg = doc.querySelector('svg')
    
    if (svg) {
      if (!svg.hasAttribute('width')) svg.setAttribute('width', '100%')
      if (!svg.hasAttribute('height')) svg.setAttribute('height', '100%')
      if (!svg.hasAttribute('viewBox')) svg.setAttribute('viewBox', '0 0 24 24')
      
      colorElements.value = extractColorElements(svg)
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
      id: props.icon?.id || '',
      name: localName.value,
      svgText: localSvg.value
    })
  }
}

const useRandomName = () => {
  emit('random-name')
}

onMounted(() => {
  updatePreview()
})
</script>