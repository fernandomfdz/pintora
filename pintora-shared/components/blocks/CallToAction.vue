<template>
  <section class="py-16 bg-primary text-primary-foreground">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          <slot name="title">¿Listo para empezar?</slot>
        </h2>
        <p class="text-xl mb-8 text-primary-foreground/90">
          <slot name="description">
            Únete a miles de usuarios satisfechos y lleva tu negocio al siguiente nivel.
          </slot>
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <slot name="actions">
            <a href="#" class="px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-white/90">
              Comenzar ahora
            </a>
            <a href="#" class="px-6 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground font-medium rounded-md hover:bg-primary-foreground/20">
              Saber más
            </a>
          </slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'default' | 'centered' | 'split'
  background?: 'primary' | 'secondary' | 'accent' | 'muted'
}>();
</script> 