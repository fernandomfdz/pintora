<template>
  <footer class="bg-muted/30 py-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <slot name="logo">
            <h2 class="text-2xl font-bold mb-4">Pintora</h2>
          </slot>
          <p class="text-muted-foreground mb-4">
            <slot name="description">
              Un ecosistema modular diseñado para facilitar la gestión, exportación y aplicación de sistemas de diseño en proyectos de desarrollo frontend.
            </slot>
          </p>
          <div class="flex space-x-4">
            <slot name="social">
              <a href="#" class="text-muted-foreground hover:text-primary" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" class="text-muted-foreground hover:text-primary" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a href="#" class="text-muted-foreground hover:text-primary" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </slot>
          </div>
        </div>
        
        <div>
          <h3 class="font-semibold mb-4">Productos</h3>
          <ul class="space-y-2">
            <slot name="products">
              <li><a href="#" class="text-muted-foreground hover:text-primary">Pintora/Studio</a></li>
              <li><a href="#" class="text-muted-foreground hover:text-primary">Pintora/Icons</a></li>
              <li><a href="#" class="text-muted-foreground hover:text-primary">Pintora/UI</a></li>
              <li><a href="#" class="text-muted-foreground hover:text-primary">Pintora/Blocks</a></li>
            </slot>
          </ul>
        </div>
        
        <div>
          <h3 class="font-semibold mb-4">Recursos</h3>
          <ul class="space-y-2">
            <slot name="resources">
              <li><a href="#" class="text-muted-foreground hover:text-primary">Documentación</a></li>
              <li><a href="#" class="text-muted-foreground hover:text-primary">Guías</a></li>
              <li><a href="#" class="text-muted-foreground hover:text-primary">Blog</a></li>
              <li><a href="#" class="text-muted-foreground hover:text-primary">Ejemplos</a></li>
            </slot>
          </ul>
        </div>
        
        <div>
          <h3 class="font-semibold mb-4">Empresa</h3>
          <ul class="space-y-2">
            <slot name="company">
              <li><a href="#" class="text-muted-foreground hover:text-primary">Sobre nosotros</a></li>
              <li><a href="#" class="text-muted-foreground hover:text-primary">Contacto</a></li>
              <li><a href="#" class="text-muted-foreground hover:text-primary">Política de privacidad</a></li>
              <li><a href="#" class="text-muted-foreground hover:text-primary">Términos de servicio</a></li>
            </slot>
          </ul>
        </div>
      </div>
      
      <div class="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-sm text-muted-foreground mb-4 md:mb-0">
          <slot name="copyright">
            © {{ new Date().getFullYear() }} Pintora. Todos los derechos reservados.
          </slot>
        </p>
        <div class="flex space-x-4">
          <slot name="language">
            <button class="text-sm text-muted-foreground hover:text-primary flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-1">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              Español
            </button>
          </slot>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'default' | 'simple' | 'complex'
}>();
</script> 