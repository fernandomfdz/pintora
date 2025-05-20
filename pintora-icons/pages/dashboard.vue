<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore'

definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()
</script>

<template>
  <div class="flex-1 bg-gray-100 p-8">
    <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-2">Mis Organizaciones</h2>
        <p class="text-gray-600">Gestiona tus organizaciones y miembros</p>
        <NuxtLink 
          to="/organizations"
          class="mt-4 inline-block text-blue-500 hover:text-blue-600"
        >
          Ver organizaciones
        </NuxtLink>
      </div>
      <div class="p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-2">Mis Bibliotecas</h2>
        <p class="text-gray-600">Administra tus bibliotecas de iconos</p>
        <NuxtLink 
          to="/libraries"
          class="mt-4 inline-block text-blue-500 hover:text-blue-600"
        >
          Ver bibliotecas
        </NuxtLink>
      </div>
      <div class="p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-2">Mi Perfil</h2>
        <p class="text-gray-600">Actualiza tu información personal</p>
        <NuxtLink 
          to="/profile"
          class="mt-4 inline-block text-blue-500 hover:text-blue-600"
        >
          Ver perfil
        </NuxtLink>
      </div>
    </div>
  </div>
</template> 