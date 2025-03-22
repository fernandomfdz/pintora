<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useSupabaseClient } from '#imports'
import type { Profile } from '@/types/supabase'

definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()
const supabase = useSupabaseClient()

const profile = ref<Profile>({
  id: authStore.user?.id || '',
  email: authStore.user?.email || '',
  name: '',
  nickname: '',
  avatar_url: '',
  updated_at: new Date().toISOString()
})

const loading = ref(false)
const error = ref('')
const success = ref(false)

const loadProfile = async () => {
  try {
    loading.value = true
    const { data, error: err } = await supabase
      .from('profiles')
      .select()
      .eq('id', authStore.user?.id)
      .single()

    if (err) throw err
    if (data) {
      profile.value = data
    }
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const updateProfile = async () => {
  try {
    loading.value = true
    error.value = ''
    success.value = false

    const { error: err } = await supabase
      .from('profiles')
      .upsert({
        id: profile.value.id,
        email: profile.value.email,
        name: profile.value.name,
        nickname: profile.value.nickname,
        avatar_url: profile.value.avatar_url,
        updated_at: new Date().toISOString()
      })

    if (err) throw err
    success.value = true
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Cargar el perfil al montar el componente
loadProfile()
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Mi Perfil</h1>

    <div class="max-w-2xl mx-auto">
      <form @submit.prevent="updateProfile" class="space-y-6">
        <div v-if="error" class="bg-red-50 text-red-500 p-4 rounded-md">
          {{ error }}
        </div>
        <div v-if="success" class="bg-green-50 text-green-500 p-4 rounded-md">
          Perfil actualizado correctamente
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              v-model="profile.email"
              type="email"
              disabled
              class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              v-model="profile.name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nickname
            </label>
            <input
              v-model="profile.nickname"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              URL del Avatar
            </label>
            <input
              v-model="profile.avatar_url"
              type="url"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            :disabled="loading"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {{ loading ? 'Guardando...' : 'Guardar Cambios' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template> 