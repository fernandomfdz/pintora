<script setup lang="ts">
import Button from '@pintora-shared/components/ui/Button.vue'
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="py-12 md:py-24 lg:py-32">
      <div class="m-auto container px-4 md:px-6">
        <div class="flex flex-col items-center justify-center space-y-4 text-center">
          <div class="space-y-2">
            <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Pintora
            </h1>
            <h2 class="text-2xl font-bold tracking-tighter sm:text-xl md:text-3xl lg:text-4xl">
               Un Ecosistema para Sistemas de Diseño Modernos
            </h2>
            <p class="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Gestiona tokens de diseño, iconos SVG y componentes web en un solo lugar.
            </p>
          </div>
          <div class="flex flex-wrap items-center justify-center gap-4">
            <NuxtLink to="/studio">
              <Button>Explorar Studio</Button>
            </NuxtLink>
            <NuxtLink to="/icons">
              <Button variant="outline">Explorar Icons</Button>
            </NuxtLink>
            <NuxtLink to="/ui">
              <Button variant="outline">Explorar UI</Button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-12 md:py-24 lg:py-32 bg-muted">
      <div class="m-auto container px-4 md:px-6">
        <div class="grid gap-6 lg:grid-cols-3 lg:gap-12">
          <div class="space-y-4">
            <div class="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
              </svg>
            </div>
            <div class="space-y-2">
              <h3 class="text-xl font-bold">Pintora/Studio</h3>
              <p class="text-muted-foreground">
                Plataforma para la gestión y exportación de tokens de diseño.
              </p>
            </div>
          </div>
          <div class="space-y-4">
            <div class="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
            </div>
            <div class="space-y-2">
              <h3 class="text-xl font-bold">Pintora/Icons</h3>
              <p class="text-muted-foreground">
                Biblioteca para la organización y optimización de iconos SVG.
              </p>
            </div>
          </div>
          <div class="space-y-4">
            <div class="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
            </div>
            <div class="space-y-2">
              <h3 class="text-xl font-bold">Pintora/UI</h3>
              <p class="text-muted-foreground">
                Kit de Web Components basados en los tokens generados en Studio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary text-primary-foreground">
      <div class="container-custom">
        <div class="text-center">
          <h2 class="text-3xl font-bold mb-6">
            ¿Listo para optimizar tu flujo de trabajo?
          </h2>
          <p class="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Comienza a utilizar Pintora hoy mismo y mejora la consistencia y eficiencia de tus proyectos de desarrollo frontend.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <NuxtLink to="/studio" class="btn bg-white text-primary hover:bg-opacity-90">
              Comenzar con Studio
            </NuxtLink>
            <a href="#" class="btn bg-primary-foreground text-primary hover:bg-opacity-90 border border-primary-foreground">
              Ver documentación
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template> 