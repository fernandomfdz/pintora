<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { useIconLibraries } from '@/composables/useIconLibraries'
import type { IconLibrary } from '@/types/icon'
import { useOrganizations } from '@/composables/useOrganizations'

definePageMeta({
  middleware: ['auth']
})

const route = useRoute()
const authStore = useAuthStore()
const { libraries, loadLibraries, createLibrary, deleteLibrary } = useIconLibraries()
const { organizations, loadOrganizations } = useOrganizations()
const showCreateDialog = ref(false)
const editingLibrary = ref<IconLibrary | null>(null)
const libraryName = ref('')
const isLoading = ref(true)

// Cargar datos al montar
onMounted(async () => {
  if (authStore.user) {
    await Promise.all([
      loadLibraries(authStore.user.id),
      loadOrganizations(authStore.user.id)
    ])
    isLoading.value = false
  }
})

const handleLibraryEdit = (library: IconLibrary) => {
  editingLibrary.value = library
  libraryName.value = library.name
  showCreateDialog.value = true
}

const handleLibraryDelete = async (library: IconLibrary) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta librería?')) {
    await deleteLibrary(library.id)
  }
}

const closeCreateDialog = () => {
  showCreateDialog.value = false
  editingLibrary.value = null
  libraryName.value = ''
}

const handleLibrarySave = async () => {
  if (!libraryName.value || !authStore.user) return

  const userOrganization = organizations.value[0]
  if (!userOrganization) {
    alert('Necesitas pertenecer a una organización para crear una librería')
    return
  }

  const newLibrary: Partial<IconLibrary> = {
    name: libraryName.value,
    owner_id: authStore.user.id,
    organization_id: userOrganization.id,
    icons: [],
    css_settings: {
      prefix: 'icon',
      fontFamily: 'icons',
      baseSelector: '.icon',
      fontSize: '16',
      cssUnit: 'px',
      defaultWidth: '16',
      defaultHeight: '16'
    }
  }

  await createLibrary(newLibrary)
  showCreateDialog.value = false
  libraryName.value = ''
}
</script>

<template>
  <div class="container mx-auto py-6 space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Mis librerías</h1>
      <button 
        class="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
        @click="showCreateDialog = true"
      >
        Nueva librería
      </button>
    </div>

    <!-- Estado de carga -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
    </div>

    <!-- Estado vacío -->
    <div 
      v-else-if="libraries.length === 0" 
      class="flex flex-col items-center justify-center py-12 text-center"
    >
      <div class="rounded-full bg-muted p-4 mb-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
          class="text-muted-foreground"
        >
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
        </svg>
      </div>
      <h3 class="text-lg font-semibold mb-2">No hay librerías</h3>
      <p class="text-sm text-muted-foreground mb-4">
        Crea tu primera librería de iconos para empezar
      </p>
      <button 
        class="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
        @click="showCreateDialog = true"
      >
        Crear librería
      </button>
    </div>

    <!-- Grid de librerías -->
    <div 
      v-else 
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="library in libraries"
        :key="library.id"
        class="group relative p-6 rounded-lg border bg-card hover:bg-accent/10 transition-colors"
      >
        <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            class="p-1 rounded hover:bg-accent"
            @click="handleLibraryEdit(library)"
            title="Editar librería"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button
            class="p-1 rounded hover:bg-accent"
            @click="handleLibraryDelete(library)"
            title="Eliminar librería"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 6h18"/>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
            </svg>
          </button>
        </div>

        <NuxtLink :to="`/library/${library.id}`" class="block">
          <h3 class="text-lg font-semibold mb-2">{{ library.name }}</h3>
          <p class="text-sm text-muted-foreground">{{ library.icons?.length || 0 }} iconos</p>
        </NuxtLink>
      </div>
    </div>

    <!-- Modal para crear librería -->
    <div v-if="showCreateDialog" class="fixed inset-0 bg-background/80 backdrop-blur-sm">
      <div class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
        <div class="bg-card p-6 rounded-lg shadow-lg border">
          <h2 class="text-lg font-semibold mb-4">Nueva librería</h2>
          
          <div class="space-y-4">
            <div>
              <label class="text-sm font-medium mb-1 block">
                Nombre de la librería
              </label>
              <input
                v-model="libraryName"
                type="text"
                class="w-full px-3 py-2 border rounded-md bg-background"
                placeholder="Mi librería de iconos"
              />
            </div>
          </div>

          <div class="flex justify-end gap-2 mt-6">
            <button 
              class="px-4 py-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground"
              @click="closeCreateDialog"
            >
              Cancelar
            </button>
            <button 
              class="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              @click="handleLibrarySave"
            >
              Crear librería
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>