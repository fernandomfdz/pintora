<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
const router = useRouter()
const { user } = useAuth()

// Redirigir al dashboard si el usuario está autenticado
onMounted(async () => {
  if (user.value) {
    await router.push('/dashboard')
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verificando...
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Por favor, espera mientras verificamos tu cuenta.
        </p>
      </div>
    </div>
  </div>
</template> 