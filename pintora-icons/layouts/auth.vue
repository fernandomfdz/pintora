<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const getTitle = () => {
  switch (route.name) {
    case 'auth-login':
      return 'Iniciar Sesión'
    case 'auth-register':
      return 'Crear Cuenta'
    case 'auth-verify-email':
      return 'Verificar Email'
    default:
      return 'Autenticación'
  }
}
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Panel lateral con imagen y branding -->
    <div class="hidden lg:flex lg:w-1/2 bg-indigo-600 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-600/90 to-indigo-900/90 z-10"></div>
      <div 
        class="absolute inset-0 bg-[url('/auth-bg.jpg')] bg-cover bg-center"
        style="background-image: url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2940')"
      ></div>
      <div class="relative z-20 flex flex-col justify-between h-full p-12 text-white">
        <div>
          <h1 class="text-4xl font-bold">Pintora Icons</h1>
          <p class="mt-2 text-indigo-200">Tu plataforma de gestión de iconos</p>
        </div>
        <div class="space-y-6">
          <h2 class="text-3xl font-medium">
            Gestiona tus bibliotecas de iconos de forma colaborativa
          </h2>
          <ul class="space-y-4 text-indigo-100">
            <li class="flex items-center space-x-3">
              <svg class="h-6 w-6 flex-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Crea y gestiona organizaciones</span>
            </li>
            <li class="flex items-center space-x-3">
              <svg class="h-6 w-6 flex-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Comparte bibliotecas de iconos</span>
            </li>
            <li class="flex items-center space-x-3">
              <svg class="h-6 w-6 flex-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Colabora en tiempo real</span>
            </li>
          </ul>
        </div>
        <div class="text-sm text-indigo-200">
          © {{ new Date().getFullYear() }} Pintora Icons. Todos los derechos reservados.
        </div>
      </div>
    </div>

    <!-- Panel de contenido -->
    <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-6 xl:px-6 bg-gray-50">
      <div class="mx-auto w-full">
        <div class="text-center lg:text-left">
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 lg:text-3xl">
            {{ getTitle() }}
          </h1>
        </div>

        <div class="mt-10">
          <slot />
        </div>

        <div class="mt-6 text-center text-sm text-gray-600 lg:hidden">
          © {{ new Date().getFullYear() }} Pintora Icons
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-gradient-to-br {
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
</style> 