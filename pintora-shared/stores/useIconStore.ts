import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { IconProject, IconCollection, IconMetadata } from '../types/icon'

export const useIconStore = defineStore('icons', () => {
  const currentProject = ref<IconProject>({
    id: 'default',
    name: 'Untitled Project',
    collections: [],
    selectedIcons: []
  })

  // Cargar desde localStorage al iniciar
  const initializeFromStorage = () => {
    const stored = localStorage.getItem('pintora-icons-project')
    if (stored) {
      currentProject.value = JSON.parse(stored)
    }
  }

  // Guardar en localStorage cuando haya cambios
  watch(
    () => currentProject.value,
    (newValue) => {
      localStorage.setItem('pintora-icons-project', JSON.stringify(newValue))
    },
    { deep: true }
  )

  // Acciones
  const addCollection = (collection: IconCollection) => {
    currentProject.value.collections.push(collection)
  }

  const removeCollection = (collectionId: string) => {
    currentProject.value.collections = currentProject.value.collections.filter(
      c => c.id !== collectionId
    )
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

  const updateProjectName = (name: string) => {
    currentProject.value.name = name
  }

  return {
    currentProject,
    initializeFromStorage,
    addCollection,
    removeCollection,
    toggleIconSelection,
    clearSelection,
    updateProjectName
  }
}) 