<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="border-b">
      <div class="container flex items-center justify-between py-4">
        <h1 class="text-xl font-bold">Pintora Icons</h1>
        <ThemeToggle />
      </div>
    </header>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import ThemeToggle from "@pintora-shared/components/ui/ThemeToggle.vue";

useHead({
  title: 'Pintora/Icons - Gestión de Iconos SVG',
  meta: [
    { name: 'description', content: 'Pintora/Icons es una biblioteca para la organización y optimización de iconos SVG utilizando mask-image en CSS.' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' }
  ]
})
</script>
