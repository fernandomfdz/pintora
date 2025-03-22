<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useIconLibraries } from '@/composables/useIconLibraries'
import type { IconLibrary } from '@/types/supabase'

const authStore = useAuthStore()
const { libraries, loading, error, loadLibraries, createLibrary, deleteLibrary } = useIconLibraries()

const showNewLibraryForm = ref(false)
const newLibraryName = ref('')
const selectedLibrary = ref<IconLibrary | null>(null)

onMounted(async () => {
  if (authStore.user) {
    await loadLibraries(authStore.user.id)
  }
})

const handleCreateLibrary = async () => {
  if (!authStore.user || !newLibraryName.value.trim()) return
  
  await createLibrary(newLibraryName.value, authStore.user.id)
  newLibraryName.value = ''
  showNewLibraryForm.value = false
}

const handleDeleteLibrary = async (library: IconLibrary) => {
  if (!authStore.user || !confirm('¿Estás seguro de que quieres eliminar esta librería?')) return
  
  await deleteLibrary(library.id, authStore.user.id)
}

defineEmits(['select'])
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold">Mis Bibliotecas</h2>
      <button
        @click="showNewLibraryForm = true"
        class="text-blue-500 hover:text-blue-600 focus:outline-none"
      >
        Nueva Biblioteca
      </button>
    </div>

    <div v-if="error" class="text-red-500 text-sm">
      {{ error }}
    </div>

    <div v-if="loading" class="text-center py-4">
      Cargando...
    </div>

    <div v-else-if="libraries.length === 0" class="text-center py-4 text-gray-500">
      No tienes bibliotecas. ¡Crea una nueva!
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="library in libraries"
        :key="library.id"
        class="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex justify-between items-start mb-2">
          <h3 class="font-medium">{{ library.name }}</h3>
          <button
            @click="handleDeleteLibrary(library)"
            class="text-red-500 hover:text-red-600 focus:outline-none"
          >
            Eliminar
          </button>
        </div>
        <button
          @click="$emit('select', library)"
          class="mt-2 text-blue-500 hover:text-blue-600 focus:outline-none"
        >
          Ver biblioteca
        </button>
      </div>
    </div>

    <!-- Modal para nueva biblioteca -->
    <div
      v-if="showNewLibraryForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <h3 class="text-lg font-medium mb-4">Nueva Biblioteca</h3>
        <form @submit.prevent="handleCreateLibrary">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              v-model="newLibraryName"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="showNewLibraryForm = false"
              class="px-4 py-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template> 