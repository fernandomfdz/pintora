<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b">
      <div class="px-6 flex h-16 items-center justify-between">
        <div class="flex items-center gap-6">
          <NuxtLink to="/" class="font-bold text-xl">Pintora Icons</NuxtLink>
          <nav class="hidden md:flex gap-6">
            <NuxtLink to="/" class="text-foreground/60 hover:text-foreground">Inicio</NuxtLink>
          </nav>
        </div>
        <div class="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
    <main >
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
import ThemeToggle from '@pintora-shared/components/ui/ThemeToggle.vue'
</script> 