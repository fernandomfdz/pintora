<template>
  <div class="min-h-screen bg-background text-foreground">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Pintora Blocks - Bloques de componentes reutilizables',
  meta: [
    { name: 'description', content: 'Biblioteca de bloques de componentes reutilizables para el ecosistema Pintora' }
  ]
})
</script> 