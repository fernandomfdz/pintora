import { defineStore } from 'pinia'
import { ref, watch, watchEffect } from 'vue'
import { useRefHistory, useMagicKeys } from '@vueuse/core'
import type { IconCollection, IconMetadata } from '@/types/icon'

export type IconProject = {
  id: string
  name: string
  collections: IconCollection[]
  selectedIcons: IconMetadata[]
}

export const useIconStore = defineStore('icons', () => {
  const currentProject = ref<IconProject>({
    id: 'default',
    name: 'Untitled Project',
    collections: [],
    selectedIcons: []
  })

  const { history, undo, redo } = useRefHistory(currentProject, {
    capacity: 100 // Mantener hasta 100 estados en el historial
  })

  const { ctrl_z, ctrl_shift_z } = useMagicKeys()

  // Escuchar las combinaciones de teclas
  watchEffect(() => {
    if (ctrl_z.value && !ctrl_shift_z.value) undo()
    if (ctrl_z.value && ctrl_shift_z.value) redo()
  })

  // Cargar desde localStorage al iniciar
  const initializeFromStorage = () => {
    const stored = localStorage.getItem('pintora-icons-project')
    if (stored) {
      currentProject.value = JSON.parse(stored)
    }
  }

  // Guardar en localStorage cuando haya cambios
  const saveToStorage = () => {
    localStorage.setItem('pintora-icons-project', JSON.stringify(currentProject.value))
  }

  // Observar cambios para guardar en localStorage
  watch(currentProject, saveToStorage, { deep: true })

  // Acciones
  const addCollection = (collection: IconCollection) => {
    currentProject.value.collections.push(collection)
  }

  const removeCollection = (collectionId: string) => {
    currentProject.value.collections = currentProject.value.collections.filter(
      (c: IconCollection) => c.id !== collectionId
    )
  }

  const removeIcon = (iconId: string) => {
    // Eliminar el icono de todas las colecciones
    currentProject.value.collections = currentProject.value.collections.map(collection => ({
      ...collection,
      icons: collection.icons.filter(icon => icon.id !== iconId)
    })).filter(collection => collection.icons.length > 0) // Eliminar colecciones vacías

    // Eliminar el icono de la selección si estaba seleccionado
    currentProject.value.selectedIcons = currentProject.value.selectedIcons.filter(
      icon => icon.id !== iconId
    )
  }

  const toggleIconSelection = (icon: IconMetadata) => {
    const index = currentProject.value.selectedIcons.findIndex(
      (i: IconMetadata) => i.id === icon.id
    )
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
    removeIcon,
    toggleIconSelection,
    clearSelection,
    updateProjectName,
    undo,
    redo
  }
}) 