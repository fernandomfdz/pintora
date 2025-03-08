<template>
  <section class="py-16">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">
            <slot name="title">Contacta con nosotros</slot>
          </h2>
          <p class="text-xl text-muted-foreground">
            <slot name="description">
              Completa el formulario a continuación y nos pondremos en contacto contigo lo antes posible.
            </slot>
          </p>
        </div>

        <div class="bg-card text-card-foreground rounded-lg border p-8 shadow-sm">
          <slot name="form">
            <form class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="first-name" class="block text-sm font-medium mb-2">Nombre</label>
                  <input 
                    type="text" 
                    id="first-name" 
                    class="w-full p-3 border rounded-md bg-background"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label for="last-name" class="block text-sm font-medium mb-2">Apellidos</label>
                  <input 
                    type="text" 
                    id="last-name" 
                    class="w-full p-3 border rounded-md bg-background"
                    placeholder="Tus apellidos"
                  />
                </div>
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  class="w-full p-3 border rounded-md bg-background"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div>
                <label for="subject" class="block text-sm font-medium mb-2">Asunto</label>
                <input 
                  type="text" 
                  id="subject" 
                  class="w-full p-3 border rounded-md bg-background"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>
              
              <div>
                <label for="message" class="block text-sm font-medium mb-2">Mensaje</label>
                <textarea 
                  id="message" 
                  rows="5" 
                  class="w-full p-3 border rounded-md bg-background"
                  placeholder="Escribe tu mensaje aquí..."
                ></textarea>
              </div>
              
              <div class="flex items-center">
                <input 
                  type="checkbox" 
                  id="privacy" 
                  class="h-4 w-4 border rounded mr-2"
                />
                <label for="privacy" class="text-sm">
                  He leído y acepto la <a href="#" class="text-primary hover:underline">política de privacidad</a>
                </label>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  class="w-full py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Enviar mensaje
                </button>
              </div>
            </form>
          </slot>
        </div>
        
        <div class="mt-8 text-center text-sm text-muted-foreground">
          <slot name="footer">
            <p>También puedes contactarnos directamente en <a href="mailto:info@ejemplo.com" class="text-primary hover:underline">info@ejemplo.com</a></p>
          </slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'default' | 'compact' | 'split'
}>();
</script> 