<script setup lang="ts">
definePageMeta({
  middleware: ['guest'],
  layout: 'auth'
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verifica tu email
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Te hemos enviado un correo electrónico con un enlace de verificación.
          Por favor, revisa tu bandeja de entrada y sigue las instrucciones.
        </p>
      </div>
      
      <div class="mt-8 space-y-6">
        <div class="text-sm text-center">
          <p class="font-medium text-gray-600">
            ¿No has recibido el correo?
          </p>
          <button
            class="mt-2 font-medium text-indigo-600 hover:text-indigo-500"
            @click="() => {}"
          >
            Reenviar email de verificación
          </button>
        </div>
      </div>
    </div>
  </div>
</template> 