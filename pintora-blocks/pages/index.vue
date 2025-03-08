<script setup lang="ts">
import { ref } from 'vue';
import HeroSection from '@pintora-shared/components/blocks/HeroSection.vue';
import PricingTable from '@pintora-shared/components/blocks/PricingTable.vue';
import FeatureSection from '@pintora-shared/components/blocks/FeatureSection.vue';
import TestimonialSection from '@pintora-shared/components/blocks/TestimonialSection.vue';
import CallToAction from '@pintora-shared/components/blocks/CallToAction.vue';
import FormSection from '@pintora-shared/components/blocks/FormSection.vue';
import FooterSection from '@pintora-shared/components/blocks/FooterSection.vue';

const categories = [
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Bloques para páginas de marketing y landing pages',
    blocks: [
      { 
        id: 'hero', 
        name: 'Hero Section', 
        description: 'Sección de héroe para la página principal',
        component: HeroSection,
        preview: true
      },
      { 
        id: 'features', 
        name: 'Features', 
        description: 'Sección de características del producto',
        component: FeatureSection,
        preview: true
      },
      { 
        id: 'testimonials', 
        name: 'Testimonials', 
        description: 'Sección de testimonios de clientes',
        component: TestimonialSection,
        preview: true
      },
      { 
        id: 'pricing', 
        name: 'Pricing', 
        description: 'Tabla de precios para diferentes planes',
        component: PricingTable,
        preview: true
      },
      { 
        id: 'cta', 
        name: 'Call to Action', 
        description: 'Sección de llamada a la acción',
        component: CallToAction,
        preview: true
      },
      { 
        id: 'form', 
        name: 'Form', 
        description: 'Formulario de contacto',
        component: FormSection,
        preview: true
      },
      { 
        id: 'footer', 
        name: 'Footer', 
        description: 'Pie de página',
        component: FooterSection,
        preview: true
      }
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Bloques para tiendas online',
    blocks: [
      { 
        id: 'product-card', 
        name: 'Product Card', 
        description: 'Tarjeta de producto',
        preview: false
      },
      { 
        id: 'product-grid', 
        name: 'Product Grid', 
        description: 'Cuadrícula de productos',
        preview: false
      },
      { 
        id: 'cart', 
        name: 'Shopping Cart', 
        description: 'Carrito de compras',
        preview: false
      },
      { 
        id: 'checkout', 
        name: 'Checkout', 
        description: 'Proceso de pago',
        preview: false
      }
    ]
  },
  {
    id: 'application',
    name: 'Aplicación',
    description: 'Bloques para aplicaciones web',
    blocks: [
      { 
        id: 'dashboard', 
        name: 'Dashboard', 
        description: 'Panel de control',
        preview: false
      },
      { 
        id: 'settings', 
        name: 'Settings', 
        description: 'Página de configuración',
        preview: false
      },
      { 
        id: 'profile', 
        name: 'Profile', 
        description: 'Página de perfil de usuario',
        preview: false
      },
      { 
        id: 'authentication', 
        name: 'Authentication', 
        description: 'Formularios de autenticación',
        preview: false
      }
    ]
  }
];

const selectedCategory = ref(categories[0]);

function selectCategory(category) {
  selectedCategory.value = category;
}
</script>

<template>
  <div>
    <HeroSection>
      <template #title>Pintora Blocks</template>
      <template #description>
        Una biblioteca de bloques de componentes reutilizables para construir interfaces de usuario modernas y atractivas.
      </template>
      <template #actions>
        <NuxtLink to="/documentation" class="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          Documentación
        </NuxtLink>
        <a href="https://github.com/pintora" target="_blank" rel="noopener noreferrer" class="px-6 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80">
          GitHub
        </a>
      </template>
    </HeroSection>

    <div class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold mb-8">Bloques disponibles</h2>
      
      <div class="flex flex-wrap gap-2 mb-8">
        <button 
          v-for="category in categories" 
          :key="category.id"
          @click="selectCategory(category)"
          :class="[
            'px-4 py-2 rounded-md transition-colors',
            selectedCategory.id === category.id 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary/20 hover:bg-secondary/30'
          ]"
        >
          {{ category.name }}
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="block in selectedCategory.blocks" 
          :key="block.id"
          class="bg-card text-card-foreground rounded-lg border p-6 hover:border-primary transition-colors"
        >
          <h3 class="text-xl font-semibold mb-2">{{ block.name }}</h3>
          <p class="text-muted-foreground mb-4">{{ block.description }}</p>
          
          <div class="flex items-center justify-between">
            <NuxtLink :to="`/blocks/${block.id}`" class="text-primary hover:underline">
              Ver detalles →
            </NuxtLink>
            <span v-if="block.preview" class="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded-full">
              Disponible
            </span>
            <span v-else class="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 px-2 py-1 rounded-full">
              Próximamente
            </span>
          </div>
        </div>
      </div>
    </div>

    <FeatureSection>
      <template #title>Características principales</template>
      <template #description>
        Descubre todas las características que hacen que Pintora Blocks sea único y potente.
      </template>
    </FeatureSection>

    <TestimonialSection>
      <template #title>Lo que dicen nuestros usuarios</template>
      <template #description>
        Descubre por qué nuestros usuarios confían en Pintora Blocks para sus proyectos.
      </template>
    </TestimonialSection>

    <CallToAction>
      <template #title>¿Listo para empezar?</template>
      <template #description>
        Comienza a utilizar Pintora Blocks en tus proyectos hoy mismo.
      </template>
      <template #actions>
        <NuxtLink to="/blocks" class="px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-white/90">
          Ver todos los bloques
        </NuxtLink>
        <NuxtLink to="/documentation" class="px-6 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground font-medium rounded-md hover:bg-primary-foreground/20">
          Leer documentación
        </NuxtLink>
      </template>
    </CallToAction>

    <FooterSection />
  </div>
</template> 