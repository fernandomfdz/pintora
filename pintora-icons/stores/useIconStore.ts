import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRefHistory, useMagicKeys } from '@vueuse/core'
import type { IconCollection, IconMetadata } from '@/types/icon'

export interface IconProject {
  collections: IconCollection[]
  selectedIcons: IconMetadata[]
}

export const useIconStore = defineStore('icons', () => {
  const currentProject = ref<IconProject>({
    collections: [],
    selectedIcons: []
  })

  // Historial de cambios
  const { history, undo, redo } = useRefHistory(currentProject, {
    capacity: 100,
    deep: true
  })

  // Atajos de teclado
  const { Ctrl_z: isUndo, Ctrl_Shift_z: isRedo } = useMagicKeys()

  // Observar atajos de teclado
  watch(isUndo, (pressed) => {
    if (pressed) undo()
  })

  watch(isRedo, (pressed) => {
    if (pressed) redo()
  })

  // Observar cambios para guardar en localStorage
  watch(currentProject, (value) => {
    localStorage.setItem('pintora-icons-project', JSON.stringify(value))
  }, { deep: true })

  const initializeFromStorage = () => {
    const stored = localStorage.getItem('pintora-icons-project')
    if (stored) {
      currentProject.value = JSON.parse(stored)
    }
  }

  const addCollection = (collection: IconCollection) => {
    currentProject.value.collections.push(collection)
  }

  const removeCollection = (collectionId: string) => {
    currentProject.value.collections = currentProject.value.collections.filter(
      c => c.id !== collectionId
    )
  }

  const updateIcon = (iconId: string, newIcon: IconMetadata) => {
    // Actualizar el icono en todas las colecciones
    currentProject.value.collections = currentProject.value.collections.map(collection => ({
      ...collection,
      icons: collection.icons.map(icon => 
        icon.id === iconId ? { ...newIcon, id: iconId } : icon
      )
    }))

    // Actualizar el icono en la selección si está seleccionado
    currentProject.value.selectedIcons = currentProject.value.selectedIcons.map(icon =>
      icon.id === iconId ? { ...newIcon, id: iconId } : icon
    )

    // Eliminar colecciones vacías
    currentProject.value.collections = currentProject.value.collections.filter(c => c.icons.length > 0)
  }

  const removeIcon = (iconId: string) => {
    // Eliminar el icono de todas las colecciones
    currentProject.value.collections = currentProject.value.collections
      .map(collection => ({
        ...collection,
        icons: collection.icons.filter(icon => icon.id !== iconId)
      }))
      .filter(collection => collection.icons.length > 0)

    // Eliminar el icono de la selección si está seleccionado
    currentProject.value.selectedIcons = currentProject.value.selectedIcons
      .filter(icon => icon.id !== iconId)
  }

  const toggleIconSelection = (icon: IconMetadata) => {
    const index = currentProject.value.selectedIcons.findIndex(i => i.id === icon.id)
    if (index === -1) {
      currentProject.value.selectedIcons.push(icon)
    } else {
      currentProject.value.selectedIcons.splice(index, 1)
    }
  }

  const clearSelection = () => {
    currentProject.value.selectedIcons = []
  }

  const generateSvgString = (icon: IconMetadata): string => {
    const svgAttrs = {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '100%',
      height: '100%',
      viewBox: icon.viewBox,
      fill: icon.fill || 'none',
      stroke: icon.stroke || 'currentColor',
      'stroke-width': icon.strokeWidth || '1.5'
    }

    const svgAttrsString = Object.entries(svgAttrs)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ')

    const elementsString = icon.elements
      .map(element => {
        const attrs = Object.entries(element.attributes)
          .filter(([_, value]) => value !== undefined)
          .map(([key, value]) => `${key}="${value}"`)
          .join(' ')
        
        if (element.content) {
          return `<${element.type} ${attrs}>${element.content}</${element.type}>`
        }
        return `<${element.type} ${attrs}/>`
      })
      .join('\n  ')

    return `<svg ${svgAttrsString}>\n  ${elementsString}\n</svg>`
  }

  // Búsqueda de iconos
  const searchIcons = (query: string) => {
    if (!query.trim()) return []

    const searchTerms = query.toLowerCase().split(' ').filter(Boolean)
    const results: IconMetadata[] = []

    currentProject.value.collections.forEach(collection => {
      collection.icons.forEach(icon => {
        const iconName = icon.name.toLowerCase()
        if (searchTerms.every(term => iconName.includes(term))) {
          results.push(icon)
        }
      })
    })

    return results
  }

  return {
    currentProject,
    history,
    undo,
    redo,
    initializeFromStorage,
    addCollection,
    removeCollection,
    updateIcon,
    removeIcon,
    toggleIconSelection,
    clearSelection,
    generateSvgString,
    searchIcons
  }
}) 