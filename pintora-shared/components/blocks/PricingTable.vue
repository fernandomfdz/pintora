<template>
  <section class="py-16">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">
          <slot name="title">Planes y precios</slot>
        </h2>
        <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
          <slot name="description">
            Elige el plan que mejor se adapte a tus necesidades. Todos los planes incluyen actualizaciones gratuitas.
          </slot>
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-card text-card-foreground rounded-lg border p-8">
          <div class="mb-6">
            <h3 class="text-2xl font-bold mb-2">
              <slot name="basic-title">Básico</slot>
            </h3>
            <p class="text-muted-foreground">
              <slot name="basic-description">Para proyectos personales y pequeños equipos</slot>
            </p>
          </div>
          <div class="mb-6">
            <div class="flex items-baseline">
              <span class="text-4xl font-bold">
                <slot name="basic-price">$9</slot>
              </span>
              <span class="text-muted-foreground ml-2">
                <slot name="basic-period">/mes</slot>
              </span>
            </div>
          </div>
          <ul class="space-y-3 mb-8">
            <slot name="basic-features">
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-primary mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Hasta 5 proyectos</span>
              </li>
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-primary mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Hasta 10 usuarios</span>
              </li>
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-primary mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>5GB de almacenamiento</span>
              </li>
            </slot>
          </ul>
          <a href="#" class="block w-full py-3 text-center bg-primary/10 text-primary hover:bg-primary/20 rounded-md">
            <slot name="basic-cta">Comenzar gratis</slot>
          </a>
        </div>

        <div class="bg-card text-card-foreground rounded-lg border border-primary p-8 shadow-md relative">
          <div class="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
            <slot name="popular-badge">Popular</slot>
          </div>
          <div class="mb-6">
            <h3 class="text-2xl font-bold mb-2">
              <slot name="pro-title">Profesional</slot>
            </h3>
            <p class="text-muted-foreground">
              <slot name="pro-description">Para equipos en crecimiento y empresas</slot>
            </p>
          </div>
          <div class="mb-6">
            <div class="flex items-baseline">
              <span class="text-4xl font-bold">
                <slot name="pro-price">$29</slot>
              </span>
              <span class="text-muted-foreground ml-2">
                <slot name="pro-period">/mes</slot>
              </span>
            </div>
          </div>
          <ul class="space-y-3 mb-8">
            <slot name="pro-features">
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-primary mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Proyectos ilimitados</span>
              </li>
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-primary mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Hasta 50 usuarios</span>
              </li>
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-primary mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>50GB de almacenamiento</span>
              </li>
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-primary mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Soporte prioritario</span>
              </li>
            </slot>
          </ul>
          <a href="#" class="block w-full py-3 text-center bg-primary text-primary-foreground hover:bg-primary/90 rounded-md">
            <slot name="pro-cta">Comenzar prueba gratuita</slot>
          </a>
        </div>

        <div class="bg-card text-card-foreground rounded-lg border p-8">
          <div class="mb-6">
            <h3 class="text-2xl font-bold mb-2">
              <slot name="enterprise-title">Empresarial</slot>
            </h3>
            <p class="text-muted-foreground">
              <slot name="enterprise-description">Para grandes empresas con necesidades específicas</slot>
            </p>
          </div>
          <div class="mb-6">
            <div class="flex items-baseline">
              <span class="text-4xl font-bold">
                <slot name="enterprise-price">$99</slot>
              </span>
              <span class="text-muted-foreground ml-2">
                <slot name="enterprise-period">/mes</slot>
              </span>
            </div>
          </div>
          <ul class="space-y-3 mb-8">
            <slot name="enterprise-features">
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-primary mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Todo lo de Profesional</span>
              </li>
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-primary mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Usuarios ilimitados</span>
              </li>
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-primary mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>500GB de almacenamiento</span>
              </li>
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-primary mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Soporte 24/7</span>
              </li>
            </slot>
          </ul>
          <a href="#" class="block w-full py-3 text-center bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md">
            <slot name="enterprise-cta">Contactar ventas</slot>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'default' | 'compact' | 'feature-rich'
}>();
</script> 