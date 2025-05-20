<template>
  <div v-if="showCreateDialog" class="fixed z-50 inset-0 bg-background/80 backdrop-blur-sm">
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
  <div class="flex flex-1 bg-gray-900 w-full">
    <!-- Sidebar -->
    <aside :class="['bg-gray-900 sticky top-0 text-white flex flex-col overflow-hidden transition-all duration-300', sidebarCollapsed ? 'w-0' : 'w-54 m-2']">
      <!-- Logo y Enterprise -->
      <div @click="toggleOrgSelector" class="relative min-w-full min-w-full p-3 flex items-center rounded-lg hover:bg-gray-900">
        <div class="min-w-10 w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
        </div>
        <div v-if="!sidebarCollapsed" class="flex-1">
          <div v-if="organizations && Array.isArray(organizations) && organizations[0]" class="font-sm">{{ organizations[0].name }}</div>
        </div>
        <svg v-if="!sidebarCollapsed" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
        </svg>

        <!-- Popup para seleccionar organización -->
        <div v-if="showOrgSelector" class="absolute left-3 top-14 right-1 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
          <div class="max-h-60 overflow-y-auto">
            <div v-for="org in organizations" :key="org.id" class="p-2 hover:bg-gray-800 flex items-center">
              <div class="w-6 h-6 rounded mr-2 bg-gray-700 flex items-center justify-center text-xs">
                {{ org.name.charAt(0) }}
              </div>
              <span>{{ org.name }}</span>
            </div>
          </div>
          <div class="p-2 border-t border-gray-700">
            <NuxtLink to="/organizations" class="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-gray-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
              </svg>
              Mis equipos
            </NuxtLink>
            <NuxtLink to="/profile" class="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-gray-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none"  width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              Perfil
            </NuxtLink>
            <button @click="handleLogout" class="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-gray-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
              Log out
            </button>
          </div>
        </div>
      </div>


      <!-- Título de sección Projects -->
      <div class="min-w-full px-3 py-2 text-sm font-medium text-gray-400">Librerías</div>

      <!-- Bibliotecas -->
      <nav class="min-w-full px-3 py-2 flex-1 space-y-1">
        <div v-for="library in libraries" :key="library.id">
          <NuxtLink :to="`/library/${library.id}`" class="block p-2 rounded-md hover:bg-gray-800">{{ library.name }}</NuxtLink>
        </div>
        <button 
          class="mt-20 w-full block p-2 border border-gray-600 bg-gray-900 rounded-md text-primary-foreground hover:bg-gray-600 cursor-pointer"
          @click="showCreateDialog = true"
        >
          Nueva librería
        </button>
      </nav>
    </aside>

    <!-- Main content -->
    <div class="flex-1 bg-gray-900 max-w-screen overflow-y-auto" :class="{'p-0': sidebarCollapsed, 'p-2': !sidebarCollapsed}">
      <div class="bg-gray-950 h-full flex flex-col" :class="{'': sidebarCollapsed, 'rounded-xl': !sidebarCollapsed}">
        <!-- Breadcrumbs/Header section -->
        <div class="flex items-center justify-between border-b border-gray-800 p-4">
          <div class="flex items-center">
            <!-- Toggle sidebar button -->
            <button @click="toggleSidebar" class="mr-4 p-1 rounded-md hover:bg-gray-800 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M9 3v18"></path></svg>
            </button>
            <div class="flex items-center">
              <NuxtLink to="/" class="font-medium text-white mr-2"><slot name="title"></slot></NuxtLink>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <slot name="buttons"></slot>
          </div>
        </div>
        
        <!-- Content -->
        <main class="flex-1 p-6 overflow-auto max-h-screen">
      <slot />
    </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useIconLibraries } from '@/composables/useIconLibraries'
import { useOrganizations } from '@/composables/useOrganizations'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import type { IconLibrary } from '@/types/icon'

const { user, loadUser } = useAuth()
const { libraries, loadLibraries, createLibrary, deleteLibrary } = useIconLibraries()
  const { organizations, loadOrganizations } = useOrganizations()

  definePageMeta({
    middleware: ['auth']
  })

const showUserMenu = ref(false)
const showOrgSelector = ref(false)
const sidebarCollapsed = ref(false)

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  if (showUserMenu.value) showOrgSelector.value = false
}

const toggleOrgSelector = () => {
  showOrgSelector.value = !showOrgSelector.value
  if (showOrgSelector.value) showUserMenu.value = false
}

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const handleLogout = async () => {
  const { signOut } = useAuth()
  await signOut()
}

onMounted(async () => {
  await loadUser()
  if (user.value) {
    await loadLibraries(user.value.id)
    await loadOrganizations(user.value.id)
  }
})

const route = useRoute()
const authStore = useAuthStore()
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

<style>
details > summary::-webkit-details-marker {
  display: none;
}

aside {
  min-width: 0px;
}

aside.w-0 {
  width: 0px;
  min-width: 0px;
}

aside.w-74 {
  width: 296px;
  min-width: 296px;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style> 