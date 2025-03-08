<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { Token, TokenGroup, TokenType } from '@/types/tokens'
  import TokenSidebar from '@/components/tokens/token-sidebar.vue';
import TokenList from '@/components/tokens/TokenList2.vue'
import TokenEditor from '@/components/tokens/TokenEditor2.vue'

// Estado
const groups = ref<TokenGroup[]>([])
const selectedGroup = ref<TokenGroup | null>(null)
const selectedToken = ref<Token | null>(null)
const isEditing = ref(false)

// Cargar datos de ejemplo
onMounted(() => {
  // En una aplicación real, cargaríamos desde localStorage o una API
  const sampleGroups: TokenGroup[] = [
    {
      id: uuidv4(),
      name: 'Colores Primarios',
      type: 'color',
      tokens: [
        {
          id: uuidv4(),
          name: 'primary',
          value: '#0284c7',
          type: 'color',
          description: 'Color primario de la marca',
        },
        {
          id: uuidv4(),
          name: 'secondary',
          value: '#7dd3fc',
          type: 'color',
          description: 'Color secundario de la marca',
        },
      ],
    },
    {
      id: uuidv4(),
      name: 'Tipografía',
      type: 'typography',
      tokens: [
        {
          id: uuidv4(),
          name: 'heading-1',
          value: '2.5rem',
          type: 'typography',
          description: 'Tamaño para títulos principales',
        },
        {
          id: uuidv4(),
          name: 'body',
          value: '1rem',
          type: 'typography',
          description: 'Tamaño para texto de cuerpo',
        },
      ],
    },
  ]
  
  groups.value = sampleGroups
})

// Métodos
function handleSelectGroup(group: TokenGroup) {
  selectedGroup.value = group
  selectedToken.value = null
  isEditing.value = false
}

function handleSelectToken(token: Token) {
  selectedToken.value = token
  isEditing.value = true
}

function handleAddGroup() {
  const newGroup: TokenGroup = {
    id: uuidv4(),
    name: 'Nuevo Grupo',
    type: 'color',
    tokens: [],
  }
  
  groups.value.push(newGroup)
  selectedGroup.value = newGroup
  selectedToken.value = null
  isEditing.value = false
}

function handleAddToken() {
  if (!selectedGroup.value) return
  
  isEditing.value = true
  selectedToken.value = null
}

function handleSaveToken(token: Token) {
  if (!selectedGroup.value) return
  
  if (!token.id) {
    // Nuevo token
    const newToken: Token = {
      ...token,
      id: uuidv4(),
    }
    
    selectedGroup.value.tokens.push(newToken)
    selectedToken.value = newToken
  } else {
    // Actualizar token existente
    const index = selectedGroup.value.tokens.findIndex(t => t.id === token.id)
    if (index !== -1) {
      selectedGroup.value.tokens[index] = token
      selectedToken.value = token
    }
  }
  
  isEditing.value = false
}

function handleDeleteToken(token: Token) {
  if (!selectedGroup.value) return
  
  const index = selectedGroup.value.tokens.findIndex(t => t.id === token.id)
  if (index !== -1) {
    selectedGroup.value.tokens.splice(index, 1)
    
    if (selectedToken.value?.id === token.id) {
      selectedToken.value = null
      isEditing.value = false
    }
  }
}
</script>

<template>
  <div class="flex flex-col h-[calc(100vh-8rem)]">
    <div class="flex-1 flex">
      <!-- Sidebar -->
      <TokenSidebar
        :groups="groups"
        :selected-group="selectedGroup"
        @select-group="handleSelectGroup"
        @add-group="handleAddGroup"
      />
      
      <!-- Main Content -->
      <div class="flex-1 p-4 overflow-auto">
        <div class="mb-4">
          <h2 class="text-2xl font-bold">
            {{ selectedGroup ? selectedGroup.name : 'Gestor de Tokens' }}
          </h2>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Lista de Tokens -->
          <TokenList
            :group="selectedGroup"
            :selected-token="selectedToken"
            @select-token="handleSelectToken"
            @add-token="handleAddToken"
            @delete-token="handleDeleteToken"
          />
          
          <!-- Editor de Token -->
          <TokenEditor
            v-if="isEditing || selectedToken"
            :token="selectedToken"
            @save="handleSaveToken"
            @cancel="isEditing = false"
          />
        </div>
      </div>
    </div>
  </div>
</template> 