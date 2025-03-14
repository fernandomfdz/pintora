<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b">
      <div class="container m-auto flex h-16 items-center justify-between">
        <div class="flex items-center gap-6">
          <NuxtLink to="/" class="font-bold text-xl">
            <slot name="title"></slot>
          </NuxtLink>
          <nav class="hidden md:flex gap-6">
            <NuxtLink to="/" class="text-foreground/60 hover:text-foreground">Inicio</NuxtLink>
            <slot name="links"></slot>
          </nav>
        </div>
        <div class="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
    <main class="self-start place-self-start justify-self-start container mx-auto py-6">
      <slot />
    </main>
    <footer class="mt-auto border-t py-6">
      <div class="m-auto container flex justify-between">
        <p class="text-sm text-foreground/60">© 2025 Pintora. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import ThemeToggle from '@pintora-shared/components/ui/ThemeToggle.vue'
</script> 