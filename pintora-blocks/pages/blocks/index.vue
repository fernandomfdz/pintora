<script setup lang="ts">
const categories = [
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Bloques para páginas de marketing y landing pages',
    blocks: [
      { id: 'hero', name: 'Hero Section', description: 'Sección de héroe para la página principal' },
      { id: 'features', name: 'Features', description: 'Sección de características del producto' },
      { id: 'testimonials', name: 'Testimonials', description: 'Sección de testimonios de clientes' },
      { id: 'pricing', name: 'Pricing', description: 'Tabla de precios para diferentes planes' },
      { id: 'cta', name: 'Call to Action', description: 'Sección de llamada a la acción' }
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Bloques para tiendas online',
    blocks: [
      { id: 'product-card', name: 'Product Card', description: 'Tarjeta de producto' },
      { id: 'product-grid', name: 'Product Grid', description: 'Cuadrícula de productos' },
      { id: 'cart', name: 'Shopping Cart', description: 'Carrito de compras' },
      { id: 'checkout', name: 'Checkout', description: 'Proceso de pago' }
    ]
  },
  {
    id: 'application',
    name: 'Aplicación',
    description: 'Bloques para aplicaciones web',
    blocks: [
      { id: 'dashboard', name: 'Dashboard', description: 'Panel de control' },
      { id: 'settings', name: 'Settings', description: 'Página de configuración' },
      { id: 'profile', name: 'Profile', description: 'Página de perfil de usuario' },
      { id: 'authentication', name: 'Authentication', description: 'Formularios de autenticación' }
    ]
  }
];
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Bloques de componentes</h1>
      <p class="text-muted-foreground">
        Explora nuestra colección de bloques de componentes reutilizables para construir interfaces de usuario modernas.
      </p>
    </div>

    <div class="space-y-12">
      <div v-for="category in categories" :key="category.id" class="space-y-6">
        <div>
          <h2 class="text-2xl font-semibold">{{ category.name }}</h2>
          <p class="text-muted-foreground">{{ category.description }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="block in category.blocks" 
            :key="block.id"
            class="bg-card text-card-foreground rounded-lg border p-6 hover:border-primary transition-colors"
          >
            <h3 class="text-xl font-semibold mb-2">{{ block.name }}</h3>
            <p class="text-muted-foreground mb-4">{{ block.description }}</p>
            <NuxtLink :to="`/blocks/${block.id}`" class="text-primary hover:underline">
              Ver detalles →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 