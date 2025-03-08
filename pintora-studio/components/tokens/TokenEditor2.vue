<script setup lang="ts">
import { ref, watch } from 'vue'
import { Token, TokenType } from '@/types/tokens'
import Button from '@/components/ui/button.vue'

const props = defineProps<{
  token: Token | null
}>()

const emit = defineEmits<{
  (e: 'save', token: Token): void
  (e: 'cancel'): void
}>()

const editedToken = ref<Token>({
  id: '',
  name: '',
  value: '',
  type: 'color',
  description: '',
})

watch(
  () => props.token,
  (newToken) => {
    if (newToken) {
      editedToken.value = { ...newToken }
    } else {
      editedToken.value = {
        id: '',
        name: '',
        value: '',
        type: 'color',
        description: '',
      }
    }
  },
  { immediate: true }
)

function handleSave() {
  emit('save', editedToken.value)
}

function handleCancel() {
  emit('cancel')
}

const tokenTypes: { value: TokenType; label: string }[] = [
  { value: 'color', label: 'Color' },
  { value: 'typography', label: 'Tipografía' },
  { value: 'spacing', label: 'Espaciado' },
  { value: 'shadow', label: 'Sombra' },
  { value: 'radius', label: 'Radio de borde' },
  { value: 'opacity', label: 'Opacidad' },
  { value: 'z-index', label: 'Z-Index' },
  { value: 'breakpoint', label: 'Breakpoint' },
  { value: 'custom', label: 'Personalizado' },
]
</script>

<template>
  <div class="border rounded-md p-4">
    <h3 class="font-semibold mb-4">
      {{ props.token ? 'Editar Token' : 'Nuevo Token' }}
    </h3>
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Nombre</label>
        <input
          v-model="editedToken.name"
          type="text"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">Tipo</label>
        <select
          v-model="editedToken.type"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option v-for="type in tokenTypes" :key="type.value" :value="type.value">
            {{ type.label }}
          </option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">Valor</label>
        <div class="flex gap-2">
          <input
            v-if="editedToken.type === 'color'"
            v-model="editedToken.value"
            type="color"
            class="w-12 h-10 border rounded-md"
          />
          <input
            v-model="editedToken.value"
            type="text"
            class="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">Descripción</label>
        <textarea
          v-model="editedToken.description"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          rows="3"
        ></textarea>
      </div>
      
      <div class="flex justify-end gap-2 mt-6">
        <Button @click="handleCancel" variant="outline">Cancelar</Button>
        <Button @click="handleSave">Guardar</Button>
      </div>
    </div>
  </div>
</template> 