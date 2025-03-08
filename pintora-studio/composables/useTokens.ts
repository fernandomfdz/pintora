import { ref, computed } from 'vue';
import type { TokenSystem, TokenGroup, AnyToken, TokenType, ExportFormat, ExportOptions } from '~/types/tokens';

// Datos de ejemplo para tokens predefinidos
const defaultTokenSystem: TokenSystem = {
  id: 'default',
  name: 'Sistema de Tokens por Defecto',
  description: 'Un sistema de tokens de diseño predefinido para comenzar',
  groups: [
    {
      id: 'colors',
      name: 'Colores',
      type: 'color',
      tokens: [
        { id: 'color-primary', name: 'Primary', type: 'color', value: '#007bff', description: 'Color primario' },
        { id: 'color-secondary', name: 'Secondary', type: 'color', value: '#6c757d', description: 'Color secundario' },
        { id: 'color-success', name: 'Success', type: 'color', value: '#28a745', description: 'Color de éxito' },
        { id: 'color-danger', name: 'Danger', type: 'color', value: '#dc3545', description: 'Color de peligro' },
        { id: 'color-warning', name: 'Warning', type: 'color', value: '#ffc107', description: 'Color de advertencia' },
        { id: 'color-info', name: 'Info', type: 'color', value: '#17a2b8', description: 'Color de información' },
      ],
    },
    {
      id: 'typography',
      name: 'Tipografía',
      type: 'typography',
      tokens: [
        { id: 'font-size-base', name: 'Base', type: 'typography', value: '16px', description: 'Tamaño de fuente base' },
        { id: 'font-size-lg', name: 'Large', type: 'typography', value: '18px', description: 'Tamaño de fuente grande' },
        { id: 'font-size-sm', name: 'Small', type: 'typography', value: '14px', description: 'Tamaño de fuente pequeño' },
        { id: 'font-size-xs', name: 'Extra Small', type: 'typography', value: '12px', description: 'Tamaño de fuente extra pequeño' },
      ],
    },
    {
      id: 'spacing',
      name: 'Espaciado',
      type: 'spacing',
      tokens: [
        { id: 'spacing-xs', name: 'Extra Small', type: 'spacing', value: '4px', description: 'Espaciado extra pequeño' },
        { id: 'spacing-sm', name: 'Small', type: 'spacing', value: '8px', description: 'Espaciado pequeño' },
        { id: 'spacing-md', name: 'Medium', type: 'spacing', value: '16px', description: 'Espaciado medio' },
        { id: 'spacing-lg', name: 'Large', type: 'spacing', value: '24px', description: 'Espaciado grande' },
        { id: 'spacing-xl', name: 'Extra Large', type: 'spacing', value: '32px', description: 'Espaciado extra grande' },
      ],
    },
    {
      id: 'shadows',
      name: 'Sombras',
      type: 'shadow',
      tokens: [
        { id: 'shadow-sm', name: 'Small', type: 'shadow', value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', description: 'Sombra pequeña' },
        { id: 'shadow-md', name: 'Medium', type: 'shadow', value: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', description: 'Sombra media' },
        { id: 'shadow-lg', name: 'Large', type: 'shadow', value: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', description: 'Sombra grande' },
      ],
    },
    {
      id: 'radius',
      name: 'Bordes',
      type: 'radius',
      tokens: [
        { id: 'radius-sm', name: 'Small', type: 'radius', value: '0.25rem', description: 'Radio pequeño' },
        { id: 'radius-md', name: 'Medium', type: 'radius', value: '0.375rem', description: 'Radio medio' },
        { id: 'radius-lg', name: 'Large', type: 'radius', value: '0.5rem', description: 'Radio grande' },
        { id: 'radius-full', name: 'Full', type: 'radius', value: '9999px', description: 'Radio completo' },
      ],
    },
  ],
};

export function useTokens() {
  const tokenSystem = ref<TokenSystem>(defaultTokenSystem);
  const activeGroupId = ref<string | null>(tokenSystem.value.groups[0]?.id || null);

  const activeGroup = computed(() => {
    return tokenSystem.value.groups.find(group => group.id === activeGroupId.value) || null;
  });

  const setActiveGroup = (groupId: string) => {
    activeGroupId.value = groupId;
  };

  const addToken = (groupId: string, token: AnyToken) => {
    const group = tokenSystem.value.groups.find(g => g.id === groupId);
    if (group) {
      group.tokens.push(token);
    }
  };

  const updateToken = (groupId: string, tokenId: string, updates: Partial<AnyToken>) => {
    const group = tokenSystem.value.groups.find(g => g.id === groupId);
    if (group) {
      const tokenIndex = group.tokens.findIndex(t => t.id === tokenId);
      if (tokenIndex !== -1) {
        group.tokens[tokenIndex] = { ...group.tokens[tokenIndex], ...updates };
      }
    }
  };

  const deleteToken = (groupId: string, tokenId: string) => {
    const group = tokenSystem.value.groups.find(g => g.id === groupId);
    if (group) {
      group.tokens = group.tokens.filter(t => t.id !== tokenId);
    }
  };

  const addGroup = (group: TokenGroup) => {
    tokenSystem.value.groups.push(group);
  };

  const updateGroup = (groupId: string, updates: Partial<TokenGroup>) => {
    const groupIndex = tokenSystem.value.groups.findIndex(g => g.id === groupId);
    if (groupIndex !== -1) {
      tokenSystem.value.groups[groupIndex] = { 
        ...tokenSystem.value.groups[groupIndex], 
        ...updates,
        tokens: tokenSystem.value.groups[groupIndex].tokens 
      };
    }
  };

  const deleteGroup = (groupId: string) => {
    tokenSystem.value.groups = tokenSystem.value.groups.filter(g => g.id !== groupId);
    if (activeGroupId.value === groupId) {
      activeGroupId.value = tokenSystem.value.groups[0]?.id || null;
    }
  };

  const exportTokens = (options: ExportOptions): string => {
    const { format, prefix = '', includeTypes } = options;
    
    // Filtrar los grupos por tipo si se especifica
    const filteredGroups = includeTypes 
      ? tokenSystem.value.groups.filter(group => includeTypes.includes(group.type))
      : tokenSystem.value.groups;
    
    switch (format) {
      case 'css':
        return exportToCSS(filteredGroups, prefix);
      case 'scss':
        return exportToSCSS(filteredGroups, prefix);
      case 'json':
        return exportToJSON(filteredGroups);
      case 'tailwind':
        return exportToTailwind(filteredGroups);
      default:
        return '';
    }
  };

  const exportToCSS = (groups: TokenGroup[], prefix: string): string => {
    let css = ':root {\n';
    
    groups.forEach(group => {
      css += `  /* ${group.name} */\n`;
      group.tokens.forEach(token => {
        css += `  --${prefix}${token.id}: ${token.value};\n`;
      });
      css += '\n';
    });
    
    css += '}';
    return css;
  };

  const exportToSCSS = (groups: TokenGroup[], prefix: string): string => {
    let scss = '// Variables SCSS\n\n';
    
    groups.forEach(group => {
      scss += `// ${group.name}\n`;
      group.tokens.forEach(token => {
        scss += `$${prefix}${token.id}: ${token.value};\n`;
      });
      scss += '\n';
    });
    
    return scss;
  };

  const exportToJSON = (groups: TokenGroup[]): string => {
    const result: Record<string, Record<string, string>> = {};
    
    groups.forEach(group => {
      result[group.id] = {};
      group.tokens.forEach(token => {
        result[group.id][token.id] = token.value;
      });
    });
    
    return JSON.stringify(result, null, 2);
  };

  const exportToTailwind = (groups: TokenGroup[]): string => {
    const result: {
      theme: {
        extend: {
          colors?: Record<string, string>;
          spacing?: Record<string, string>;
          boxShadow?: Record<string, string>;
          borderRadius?: Record<string, string>;
        }
      }
    } = {
      theme: {
        extend: {}
      }
    };
    
    groups.forEach(group => {
      switch (group.type) {
        case 'color':
          if (!result.theme.extend.colors) {
            result.theme.extend.colors = {};
          }
          group.tokens.forEach(token => {
            const name = token.name.toLowerCase();
            if (result.theme.extend.colors) {
              result.theme.extend.colors[name] = token.value;
            }
          });
          break;
        case 'spacing':
          if (!result.theme.extend.spacing) {
            result.theme.extend.spacing = {};
          }
          group.tokens.forEach(token => {
            const name = token.name.toLowerCase().replace(' ', '-');
            if (result.theme.extend.spacing) {
              result.theme.extend.spacing[name] = token.value;
            }
          });
          break;
        case 'shadow':
          if (!result.theme.extend.boxShadow) {
            result.theme.extend.boxShadow = {};
          }
          group.tokens.forEach(token => {
            const name = token.name.toLowerCase();
            if (result.theme.extend.boxShadow) {
              result.theme.extend.boxShadow[name] = token.value;
            }
          });
          break;
        case 'radius':
          if (!result.theme.extend.borderRadius) {
            result.theme.extend.borderRadius = {};
          }
          group.tokens.forEach(token => {
            const name = token.name.toLowerCase();
            if (result.theme.extend.borderRadius) {
              result.theme.extend.borderRadius[name] = token.value;
            }
          });
          break;
        // Otros tipos pueden ser añadidos según sea necesario
      }
    });
    
    return `/** @type {import('tailwindcss').Config} */\nmodule.exports = ${JSON.stringify(result, null, 2)}`;
  };

  return {
    tokenSystem,
    activeGroupId,
    activeGroup,
    setActiveGroup,
    addToken,
    updateToken,
    deleteToken,
    addGroup,
    updateGroup,
    deleteGroup,
    exportTokens
  };
} 