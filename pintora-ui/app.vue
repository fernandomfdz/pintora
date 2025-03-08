<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="border-b">
      <div class="container flex items-center justify-between py-4">
        <h1 class="text-xl font-bold">Pintora UI</h1>
        <ThemeToggle />
      </div>
    </header>
    <main class="container py-8">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import ThemeToggle from '@pintora-shared/components/ui/ThemeToggle.vue';

useHead({
  title: 'Pintora/UI - Kit de Web Components',
  meta: [
    { name: 'description', content: 'Pintora/UI es un kit de Web Components basados en los tokens generados en Studio.' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' }
  ]
})
</script>
