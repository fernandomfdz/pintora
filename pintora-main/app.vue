<script setup lang="ts">
import ThemeToggle  from '@pintora-shared/components/ui/ThemeToggle.vue';

useHead({
  title: 'Pintora - Ecosistema para Sistemas de Diseño Modernos',
  meta: [
    { name: 'description', content: 'Pintora es un ecosistema modular diseñado para facilitar la gestión, exportación y aplicación de sistemas de diseño en proyectos de desarrollo frontend.' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' }
  ]
})
</script>

<template>
  <NuxtLayout>
     <NuxtPage />
  </NuxtLayout>
</template>
