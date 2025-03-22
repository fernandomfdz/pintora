<script setup lang="ts">
import { ref } from 'vue'
  import { useAuth } from '@/composables/useAuth'

const { signIn, signUp, loading, error } = useAuth()

const isLogin = ref(true)
const email = ref('fernandomfdz@gmail.com')
const password = ref('123456')
  const name = ref('')


  const handleSubmit = async (event) => {
  event.preventDefault()
  if (isLogin.value) {
    await signIn(email.value, password.value)
  } else {
    await signUp(email.value, password.value, name.value)
  }
}
</script>

<template>
  <div class="w-full max-w-md mx-auto p-6">
    <div class="bg-white rounded-lg shadow-sm p-8">
      <h2 class="text-2xl font-bold mb-6 text-center">
        {{ isLogin ? 'Iniciar Sesión' : 'Crear Cuenta' }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div v-if="!isLogin">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            v-model="name"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div v-if="error" class="text-red-500 text-sm">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading">Cargando...</span>
          <span v-else>{{ isLogin ? 'Iniciar Sesión' : 'Crear Cuenta' }}</span>
        </button>

        <div class="text-center mt-4">
          <button
            type="button"
            @click="isLogin = !isLogin"
            class="text-sm text-blue-500 hover:text-blue-600"
          >
            {{ isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template> 