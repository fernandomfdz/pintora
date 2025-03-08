<script setup lang="ts">
import ThemeToggle from "@pintora-shared/components/ui/ThemeToggle.vue";
</script>

<template>
  <div>
    <header class="border-b">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <h1 class="text-xl font-bold">Pintora Blocks</h1>
          <nav class="hidden md:flex space-x-4">
            <NuxtLink to="/" class="hover:text-primary">Inicio</NuxtLink>
            <NuxtLink to="/blocks" class="hover:text-primary">Bloques</NuxtLink>
            <NuxtLink to="/documentation" class="hover:text-primary">Documentación</NuxtLink>
          </nav>
        </div>
        <div class="flex items-center space-x-4">
          <ThemeToggle />
          <a href="https://github.com/pintora" target="_blank" rel="noopener noreferrer" class="p-2 rounded-md hover:bg-accent" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        </div>
      </div>
    </header>
    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>
    <footer class="border-t py-8">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <p class="text-sm text-muted-foreground">© 2024 Pintora. Todos los derechos reservados.</p>
          </div>
          <div class="flex space-x-4">
            <a href="#" class="text-sm text-muted-foreground hover:text-primary">Términos</a>
            <a href="#" class="text-sm text-muted-foreground hover:text-primary">Privacidad</a>
            <a href="#" class="text-sm text-muted-foreground hover:text-primary">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>