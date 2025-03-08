<script setup lang="ts">
import ThemeToggle from '../../pintora-shared/components/ui/ThemeToggle.vue'
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="border-b">
      <div class="m-auto container flex items-center justify-between py-4">
        <h1 class="text-xl font-bold">Pintora</h1>
        <div class="flex items-center space-x-6">
          <nav class="hidden md:flex space-x-6">
            <NuxtLink to="/" class="hover:text-primary">Inicio</NuxtLink>
            <NuxtLink to="/studio" class="hover:text-primary">Studio</NuxtLink>
            <NuxtLink to="/icons" class="hover:text-primary">Icons</NuxtLink>
            <NuxtLink to="/ui" class="hover:text-primary">UI</NuxtLink>
            <!-- <NuxtLink to="/blocks" class="hover:text-primary">Blocks</NuxtLink>-->
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
    <main>
      <slot />
    </main>
    <footer class="border-t py-6">
      <div class="m-auto container flex justify-between">
        <p class="text-sm text-foreground/60">© 2025 Pintora/Studio. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template> 