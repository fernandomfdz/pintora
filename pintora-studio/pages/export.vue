<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { Token, TokenGroup, TokenType, TokenExportOptions } from '@/types/tokens'
import TokenExport from '@/components/tokens/token-export.vue'

// Estado
const groups = ref<TokenGroup[]>([])
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
</script>

<template>
  <div class="container py-8">
    <h1 class="text-3xl font-bold mb-8">Exportar Tokens</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Panel de Exportación -->
      <TokenExport
        :groups="groups"
        @export="handleExport"
      />
      
      <!-- Vista previa del código -->
      <div v-if="exportedCode" class="border rounded-md p-4">
        <h3 class="font-semibold mb-4">Código Generado</h3>
        <pre class="bg-muted p-4 rounded-md overflow-auto max-h-96 text-sm">{{ exportedCode }}</pre>
        
        <div class="mt-4 flex justify-end">
          <button
            @click="() => navigator.clipboard.writeText(exportedCode)"
            class="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Copiar al Portapapeles
          </button>
        </div>
      </div>
      <div v-else class="border rounded-md p-4 flex items-center justify-center text-muted-foreground">
        Configura las opciones de exportación y haz clic en "Exportar" para generar el código.
      </div>
    </div>
  </div>
</template> 