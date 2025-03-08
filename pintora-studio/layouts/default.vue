<template>
  <div class="min-h-screen">
    <header class="border-b">
      <div class="container m-auto flex h-16 items-center justify-between">
        <div class="flex items-center gap-6">
          <NuxtLink to="/" class="font-bold text-xl">Pintora Studio</NuxtLink>
          <nav class="hidden md:flex gap-6">
            <NuxtLink to="/" class="text-foreground/60 hover:text-foreground">Inicio</NuxtLink>
            <NuxtLink to="/tokens" class="text-foreground/60 hover:text-foreground">Tokens</NuxtLink>
            <NuxtLink to="/export" class="text-foreground/60 hover:text-foreground">Exportar</NuxtLink>
          </nav>
        </div>
        <div class="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
    <main class="container m-auto py-6">
      <slot />
    </main>
    <footer class="border-t py-6">
      <div class="m-auto container flex justify-between">
        <p class="text-sm text-foreground/60">© 2025 Pintora/Studio. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import ThemeToggle from '@/components/ui/theme-toggle.vue'
</script> 