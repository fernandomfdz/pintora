<template>
  <section class="py-16 md:py-24 bg-gradient-to-br from-background to-muted">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            <slot name="title">Construye interfaces modernas con Pintora</slot>
          </h1>
          <p class="text-xl text-muted-foreground mb-8">
            <slot name="description">
              Una biblioteca de componentes y bloques reutilizables para construir interfaces de usuario modernas y atractivas.
            </slot>
          </p>
          <div class="flex flex-wrap gap-4">
            <slot name="actions">
              <a href="#" class="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                Comenzar
              </a>
              <a href="#" class="px-6 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80">
                Documentación
              </a>
            </slot>
          </div>
        </div>
        <div class="flex justify-center">
          <slot name="image">
            <div class="w-full max-w-md h-80 bg-muted rounded-lg shadow-lg flex items-center justify-center">
              <span class="text-muted-foreground">Imagen del producto</span>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'default' | 'centered' | 'minimal'
}>();
</script> 