<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b">
      <div class="px-6 flex h-16 items-center justify-between">
        <div class="flex items-center gap-6">
          <NuxtLink to="/" class="font-bold text-xl">Pintora Icons</NuxtLink>
          <nav class="hidden md:flex gap-6">
            <NuxtLink to="/dashboard" class="text-foreground/60 hover:text-foreground">Dashboard</NuxtLink>
            <NuxtLink to="/organizations" class="text-foreground/60 hover:text-foreground">Organizaciones</NuxtLink>
            <NuxtLink to="/libraries" class="text-foreground/60 hover:text-foreground">Bibliotecas</NuxtLink>
          </nav>
        </div>
        <div class="flex items-center gap-4">
          <ThemeToggle />
          <button
            v-if="authStore.user"
            @click="handleLogout"
            class="text-foreground/60 hover:text-foreground"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
    <main class="flex-1">
      <slot />
    </main>
    <footer class="mt-auto border-t py-6">
      <div class="m-auto container flex justify-between">
        <p class="text-sm text-foreground/60">© 2025 Pintora/Icons. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useSupabaseClient, navigateTo } from '#imports'

const authStore = useAuthStore()
const supabase = useSupabaseClient()

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut()
  if (!error) {
    authStore.$reset()
    navigateTo('/auth/login')
  }
}
</script> 