<script setup lang="ts">
import { ThemeToggle } from '@pintora/shared';

useHead({
  title: 'Pintora/Studio - Gestión de Tokens de Diseño',
  meta: [
    { name: 'description', content: 'Pintora/Studio es una plataforma para la gestión y exportación de tokens de diseño.' }
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
