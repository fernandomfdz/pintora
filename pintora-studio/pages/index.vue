<template>
  <div class="m-auto">
    <div class="w-full px-4 sm:px-6 lg:px-8 py-8">
      
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <Sidebar
            :token-system="tokenSystem"
            :active-group-id="activeGroupId"
            @set-active-group="setActiveGroup"
            @add-group="showAddGroupModal = true"
          />
          
        </div>
        
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <div v-if="activeGroup">
            <TokenList
              :group="activeGroup"
              @add-token="showAddTokenModal = true"
              @edit-token="editToken"
              @delete-token="deleteToken"
            />
          </div>
          <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <p class="text-gray-600 dark:text-gray-400">
              Selecciona una categoría de tokens para comenzar.
            </p>
          </div>
        </div>

        <div class="lg:col-span-1">
          <ExportPanel :export-tokens="exportTokens" />
        </div>
      </div>
    </div>
    
    <!-- Modal para añadir/editar token -->
    <div v-if="showAddTokenModal && activeGroup" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="w-full max-w-md">
        <TokenEditor
          :group-id="activeGroup.id"
          :group-type="activeGroup.type"
          :token="editingToken"
          @save="saveToken"
          @cancel="cancelTokenEdit"
        />
      </div>
    </div>
    
    <!-- Modal para añadir grupo -->
    <div v-if="showAddGroupModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Nueva Categoría
          </h3>
        </div>
        
        <div class="p-4">
          <form @submit.prevent="saveGroup">
            <div class="space-y-4">
              <div>
                <label for="group-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nombre
                </label>
                <input
                  id="group-name"
                  v-model="newGroup.name"
                  type="text"
                  class="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label for="group-type" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tipo
                </label>
                <select
                  id="group-type"
                  v-model="newGroup.type"
                  class="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="color">Colores</option>
                  <option value="typography">Tipografía</option>
                  <option value="spacing">Espaciado</option>
                  <option value="shadow">Sombras</option>
                  <option value="radius">Bordes</option>
                  <option value="breakpoint">Puntos de ruptura</option>
                </select>
              </div>
              
              <div class="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  @click="showAddGroupModal = false"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Crear
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { Token, TokenGroup, TokenType, TokenExportOptions } from '@/types/tokens'
import TokenList from '@/components/tokens/TokenList.vue'
import TokenEditor from '@/components/tokens/TokenEditor.vue'
import TokenExport from '@/components/tokens/token-export.vue'
import Sidebar from '~/components/ui/Sidebar.vue';
import ExportPanel from '~/components/tokens/ExportPanel.vue';

// Usar el composable de tokens
const {
  tokenSystem,
  activeGroupId,
  activeGroup,
  setActiveGroup,
  addToken,
  updateToken,
  deleteToken,
  addGroup,
  exportTokens
} = useTokens();

// Estado para modales
const showAddTokenModal = ref(false);
const showAddGroupModal = ref(false);
const editingToken = ref<Token | undefined>(undefined);

// Estado para nuevo grupo
const newGroup = ref<{
  name: string;
  type: TokenType;
}>({
  name: '',
  type: 'color'
});

// Estado
const groups = ref<TokenGroup[]>([])
const selectedGroup = ref<TokenGroup | null>(null)
const selectedToken = ref<Token | null>(null)
const isEditing = ref(false)
const showExport = ref(false)
const exportedCode = ref('')

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

function handleExport(options: TokenExportOptions) {
  // Filtrar grupos por tipos seleccionados
  const filteredGroups = groups.value.filter(group => 
    options.includeTypes.includes(group.type)
  )
  
  // Generar código según el formato
  let code = ''
  
  if (options.format === 'css') {
    code = generateCSSVariables(filteredGroups, options.prefix || '')
  } else if (options.format === 'scss') {
    code = generateSCSSVariables(filteredGroups, options.prefix || '')
  } else if (options.format === 'json') {
    code = generateJSON(filteredGroups, options.prefix || '')
  } else if (options.format === 'tailwind') {
    code = generateTailwindConfig(filteredGroups, options.prefix || '')
  }
  
  exportedCode.value = code
}

// Funciones de generación de código
function generateCSSVariables(groups: TokenGroup[], prefix: string): string {
  let css = ':root {\n'
  
  groups.forEach(group => {
    css += `  /* ${group.name} */\n`
    
    group.tokens.forEach(token => {
      css += `  --${prefix}${token.name}: ${token.value};\n`
    })
    
    css += '\n'
  })
  
  css += '}'
  
  return css
}

function generateSCSSVariables(groups: TokenGroup[], prefix: string): string {
  let scss = '// Design Tokens\n\n'
  
  groups.forEach(group => {
    scss += `// ${group.name}\n`
    
    group.tokens.forEach(token => {
      scss += `$${prefix}${token.name}: ${token.value};\n`
    })
    
    scss += '\n'
  })
  
  return scss
}

function generateJSON(groups: TokenGroup[], prefix: string): string {
  const json: Record<string, any> = {}
  
  groups.forEach(group => {
    json[group.name] = {}
    
    group.tokens.forEach(token => {
      json[group.name][`${prefix}${token.name}`] = token.value
    })
  })
  
  return JSON.stringify(json, null, 2)
}

function generateTailwindConfig(groups: TokenGroup[], prefix: string): string {
  let config = 'module.exports = {\n'
  config += '  theme: {\n'
  config += '    extend: {\n'
  
  // Agrupar por tipo
  const colorTokens = groups
    .filter(g => g.type === 'color')
    .flatMap(g => g.tokens)
  
  const spacingTokens = groups
    .filter(g => g.type === 'spacing')
    .flatMap(g => g.tokens)
  
  const typographyTokens = groups
    .filter(g => g.type === 'typography')
    .flatMap(g => g.tokens)
  
  // Colores
  if (colorTokens.length > 0) {
    config += '      colors: {\n'
    
    colorTokens.forEach(token => {
      config += `        '${prefix}${token.name}': '${token.value}',\n`
    })
    
    config += '      },\n'
  }
  
  // Espaciado
  if (spacingTokens.length > 0) {
    config += '      spacing: {\n'
    
    spacingTokens.forEach(token => {
      config += `        '${prefix}${token.name}': '${token.value}',\n`
    })
    
    config += '      },\n'
  }
  
  // Tipografía
  if (typographyTokens.length > 0) {
    config += '      fontSize: {\n'
    
    typographyTokens.forEach(token => {
      config += `        '${prefix}${token.name}': '${token.value}',\n`
    })
    
    config += '      },\n'
  }
  
  config += '    },\n'
  config += '  },\n'
  config += '}'
  
  return config
}

// Métodos para gestionar tokens
const saveToken = (groupId: string, token: Token) => {
  if (editingToken.value) {
    updateToken(groupId, token.id, token);
  } else {
    addToken(groupId, token);
  }
  cancelTokenEdit();
};

const editToken = (tokenId: string) => {
  if (!activeGroup.value) return;
  
  const token = activeGroup.value.tokens.find(t => t.id === tokenId);
  if (token) {
    editingToken.value = { ...token };
    showAddTokenModal.value = true;
  }
};

const cancelTokenEdit = () => {
  showAddTokenModal.value = false;
  editingToken.value = undefined;
};

// Métodos para gestionar grupos
const saveGroup = () => {
  const groupId = `${newGroup.value.type}-${Date.now()}`;
  
  addGroup({
    id: groupId,
    name: newGroup.value.name,
    type: newGroup.value.type,
    tokens: []
  });
  
  setActiveGroup(groupId);
  showAddGroupModal.value = false;
  newGroup.value = { name: '', type: 'color' };
};

// Configuración de la página
useHead({
  title: 'Pintora/Studio - Gestión de Tokens de Diseño',
  meta: [
    { name: 'description', content: 'Gestiona y exporta tokens de diseño para tu sistema de diseño con Pintora/Studio.' }
  ]
});
</script> 