<script setup lang="ts">
import { ref } from 'vue'
import { TokenGroup, TokenType, TokenExportOptions } from '@/types/tokens'
import Button from '@/components/ui/button.vue'

const props = defineProps<{
  groups: TokenGroup[]
}>()

const emit = defineEmits<{
  (e: 'export', options: TokenExportOptions): void
}>()

const exportOptions = ref<TokenExportOptions>({
  format: 'css',
  prefix: '',
  includeTypes: ['color', 'typography', 'spacing', 'shadow', 'radius', 'opacity', 'z-index', 'breakpoint', 'custom'],
})

const exportFormats = [
  { id: 'css', name: 'CSS Variables', extension: '.css' },
  { id: 'scss', name: 'SCSS Variables', extension: '.scss' },
  { id: 'json', name: 'JSON', extension: '.json' },
  { id: 'tailwind', name: 'Tailwind Config', extension: '.js' },
]

const tokenTypes: { value: TokenType; label: string }[] = [
  { value: 'color', label: 'Colores' },
  { value: 'typography', label: 'Tipografía' },
  { value: 'spacing', label: 'Espaciado' },
  { value: 'shadow', label: 'Sombras' },
  { value: 'radius', label: 'Bordes' },
  { value: 'opacity', label: 'Opacidad' },
  { value: 'z-index', label: 'Z-Index' },
  { value: 'breakpoint', label: 'Breakpoints' },
  { value: 'custom', label: 'Personalizado' },
]

function handleExport() {
  emit('export', exportOptions.value)
}

function toggleTokenType(type: TokenType) {
  const index = exportOptions.value.includeTypes.indexOf(type)
  if (index === -1) {
    exportOptions.value.includeTypes.push(type)
  } else {
    exportOptions.value.includeTypes.splice(index, 1)
  }
}
</script>

<template>
  <div class="border rounded-md p-4">
    <h3 class="font-semibold mb-4">Exportar Tokens</h3>
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Formato</label>
        <select
          v-model="exportOptions.format"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option v-for="format in exportFormats" :key="format.id" :value="format.id">
            {{ format.name }}
          </option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">Prefijo (opcional)</label>
        <input
          v-model="exportOptions.prefix"
          type="text"
          placeholder="ej: my-project-"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">Tipos de tokens a incluir</label>
        <div class="space-y-2">
          <div v-for="type in tokenTypes" :key="type.value" class="flex items-center">
            <input
              :id="type.value"
              type="checkbox"
              :checked="exportOptions.includeTypes.includes(type.value)"
              @change="toggleTokenType(type.value)"
              class="mr-2"
            />
            <label :for="type.value">{{ type.label }}</label>
          </div>
        </div>
      </div>
      
      <div class="flex justify-end mt-6">
        <Button @click="handleExport">Exportar</Button>
      </div>
    </div>
  </div>
</template> 