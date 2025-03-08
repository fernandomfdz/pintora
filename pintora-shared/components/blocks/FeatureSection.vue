<template>
  <section class="py-16">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">
          <slot name="title">Características principales</slot>
        </h2>
        <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
          <slot name="description">
            Descubre todas las características que hacen que nuestro producto sea único y potente.
          </slot>
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <slot name="features">
          <div class="bg-card text-card-foreground rounded-lg border p-6">
            <div class="mb-4 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Rápido y eficiente</h3>
            <p class="text-muted-foreground">
              Optimizado para ofrecer el mejor rendimiento en cualquier dispositivo.
            </p>
          </div>
          <div class="bg-card text-card-foreground rounded-lg border p-6">
            <div class="mb-4 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Seguro y confiable</h3>
            <p class="text-muted-foreground">
              Protección de datos avanzada y alta disponibilidad garantizada.
            </p>
          </div>
          <div class="bg-card text-card-foreground rounded-lg border p-6">
            <div class="mb-4 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Fácil de usar</h3>
            <p class="text-muted-foreground">
              Interfaz intuitiva diseñada para una experiencia de usuario excepcional.
            </p>
          </div>
        </slot>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'default' | 'grid' | 'list'
}>();
</script> 