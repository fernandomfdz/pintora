<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import type { Profile } from '@/types/supabase'

const { profile, loading, error, updateProfile } = useAuth()

const editMode = ref(false)
const formData = ref<Partial<Profile>>({
  name: profile.value?.name || '',
  nickname: profile.value?.nickname || '',
  avatar_url: profile.value?.avatar_url || ''
})

const handleSubmit = async () => {
  await updateProfile(formData.value)
  editMode.value = false
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold">Mi Perfil</h2>
        <button
          v-if="!editMode"
          @click="editMode = true"
          class="text-blue-500 hover:text-blue-600 focus:outline-none"
        >
          Editar
        </button>
      </div>

      <div v-if="error" class="text-red-500 text-sm mb-4">
        {{ error }}
      </div>

      <div v-if="!editMode" class="space-y-4">
        <div class="flex items-center space-x-4">
          <img
            :src="profile?.avatar_url || 'https://via.placeholder.com/100'"
            alt="Avatar"
            class="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h3 class="font-medium">{{ profile?.name || 'Sin nombre' }}</h3>
            <p class="text-gray-500">{{ profile?.nickname || 'Sin nickname' }}</p>
            <p class="text-sm text-gray-400">{{ profile?.email }}</p>
          </div>
        </div>
      </div>

      <form v-else @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            v-model="formData.name"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Nickname
          </label>
          <input
            v-model="formData.nickname"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            URL del Avatar
          </label>
          <input
            v-model="formData.avatar_url"
            type="url"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="flex justify-end space-x-2">
          <button
            type="button"
            @click="editMode = false"
            class="px-4 py-2 text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {{ loading ? 'Guardando...' : 'Guardar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template> 