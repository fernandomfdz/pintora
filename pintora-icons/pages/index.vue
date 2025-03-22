<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Barra de navegación -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-bold text-gray-900">Pintora Icons</h1>
          </div>
          
          <div v-if="user" class="flex items-center space-x-4">
            <button
              @click="showOrganizations = true"
              class="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              Organizaciones
            </button>
            <button
              @click="showProfile = true"
              class="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <img
                :src="profile?.avatar_url || 'https://via.placeholder.com/32'"
                alt="Avatar"
                class="w-8 h-8 rounded-full"
              />
              <span>{{ profile?.name || 'Mi Perfil' }}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Contenido principal -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Autenticación -->
      <AuthForm v-if="!user" />

      <!-- Panel principal -->
      <template v-else>
        <!-- Lista de librerías si no hay una seleccionada -->
        <LibraryList
          v-if="!currentLibrary"
          @select="handleLibrarySelect"
        />

        <!-- Editor de iconos si hay una librería seleccionada -->
        <template v-else>
          <div class="mb-6 flex justify-between items-center">
            <h2 class="text-xl font-semibold">{{ currentLibrary.name }}</h2>
            <button
              @click="currentLibrary = null"
              class="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              Volver a librerías
            </button>
      </div>

          <!-- Componentes existentes con nuevas props -->
          <IconGrid
            :icons="currentLibrary.data.collections"
            :selected-icons="currentLibrary.data.selectedIcons"
            @update:icons="handleLibraryChange"
          />
        </template>
      </template>
    </main>

    <!-- Modales -->
    <div
      v-if="showProfile"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 class="text-xl font-semibold">Mi Perfil</h2>
          <button
            @click="showProfile = false"
            class="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            Cerrar
          </button>
        </div>
        <div class="p-4">
          <UserProfile @close="showProfile = false" />
        </div>
      </div>
    </div>

    <div 
      v-if="showOrganizations"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 class="text-xl font-semibold">Organizaciones</h2>
          <button
            @click="showOrganizations = false"
            class="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            Cerrar
          </button>
        </div>
        <div class="p-4">
          <OrganizationManager @close="showOrganizations = false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useIconLibraries } from '@/composables/useIconLibraries'
import type { IconLibrary } from '@/types/supabase'

const { user, profile, loadUser } = useAuth()
const { currentLibrary, loadLibrary, saveLibraryData } = useIconLibraries()

const showProfile = ref(false)
const showOrganizations = ref(false)

// Cargar usuario al montar el componente
onMounted(async () => {
  await loadUser()
})

// Manejar la selección de una librería
const handleLibrarySelect = async (library: IconLibrary) => {
  await loadLibrary(library.id)
  }

// Guardar cambios en la librería actual
const handleLibraryChange = async (data: any) => {
  if (currentLibrary.value) {
    await saveLibraryData(currentLibrary.value.id, data)
  }
}
</script>