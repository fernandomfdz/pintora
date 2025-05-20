<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useOrganizations } from '@/composables/useOrganizations'
import type { Organization } from '@/types/supabase'

const authStore = useAuthStore()
const {
  organizations,
  memberOrganizations,
  loading,
  error,
  loadOrganizations,
  createOrganization,
  addMember,
  removeMember
} = useOrganizations()

const showNewOrgForm = ref(false)
const newOrgName = ref('')
const showAddMemberForm = ref(false)
const selectedOrg = ref<Organization | null>(null)
const newMemberEmail = ref('')

onMounted(async () => {
  if (authStore.user) {
    await loadOrganizations(authStore.user.id)
  }
})

const handleCreateOrg = async () => {
  if (!authStore.user || !newOrgName.value.trim()) return
  
  await createOrganization(newOrgName.value, authStore.user.id)
  newOrgName.value = ''
  showNewOrgForm.value = false
}

const handleAddMember = async () => {
  if (!selectedOrg.value || !newMemberEmail.value.trim()) return
  
  await addMember(selectedOrg.value.id, newMemberEmail.value)
  newMemberEmail.value = ''
  showAddMemberForm.value = false
}

const handleRemoveMember = async (orgId: string, memberId: string) => {
  if (!confirm('¿Estás seguro de que quieres eliminar este miembro?')) return
  
  await removeMember(orgId, memberId)
}
definePageMeta({
  middleware: 'auth',
  title: 'Equipos',
  layout: false
})
</script>

<template>
  <NuxtLayout name="default">
    <template #title>Equipos</template>
    <template #buttons>
      <button 
        class="px-4 py-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground flex items-center"
        @click="showNewOrgForm = true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    </template>
    <div class="container mx-auto px-4 pt-0 py-8">
      <div class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-white">Mis equipos</h2>
        </div>

        <div v-if="error" class="text-red-500 text-sm">
          {{ error }}
        </div>

        <div v-if="loading" class="text-center py-4">
          Cargando...
        </div>

        <div v-else-if="organizations.length === 0" class="text-center py-4 text-gray-500">
          No tienes equipos. ¡Crea una uno!
        </div>

        <div v-else class="space-y-6">
          <!-- Organizaciones propias -->
          <div v-for="org in organizations" :key="org.id" class="bg-white rounded-lg shadow-sm p-4">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="font-medium">{{ org.name }}</h3>
                <p class="text-sm text-gray-500">Propietario</p>
              </div>
              <button
                @click="selectedOrg = org; showAddMemberForm = true"
                class="text-blue-500 hover:text-blue-600 focus:outline-none"
              >
                Añadir miembro
              </button>
            </div>

            <div v-if="org.members?.length" class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700">Miembros</h4>
              <ul class="space-y-2">
                <li
                  v-for="member in org.members"
                  :key="member.id"
                  class="flex justify-between items-center text-sm"
                >
                  <span>{{ member.email }}</span>
                  <button
                    v-if="member.id !== authStore.user?.id"
                    @click="handleRemoveMember(org.id, member.id)"
                    class="text-red-500 hover:text-red-600 focus:outline-none"
                  >
                    Eliminar
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <!-- Organizaciones como miembro -->
          <div v-if="memberOrganizations.length" class="mt-8">
            <h3 class="text-lg font-medium mb-4">Organizaciones donde soy miembro</h3>
            <div class="space-y-4">
              <div
                v-for="org in memberOrganizations"
                :key="org.id"
                class="bg-white rounded-lg shadow-sm p-4"
              >
                <h4 class="font-medium">{{ org.name }}</h4>
                <p class="text-sm text-gray-500">Miembro</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal para nueva organización -->
        <div
          v-if="showNewOrgForm"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 class="text-lg font-medium mb-4">Nueva Organización</h3>
            <form @submit.prevent="handleCreateOrg">
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  v-model="newOrgName"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div class="flex justify-end space-x-3">
                <button
                  type="button"
                  @click="showNewOrgForm = false"
                  class="px-4 py-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Modal para añadir miembro -->
        <div
          v-if="showAddMemberForm"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 class="text-lg font-medium mb-4">Añadir Miembro</h3>
            <form @submit.prevent="handleAddMember">
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Email del miembro
                </label>
                <input
                  v-model="newMemberEmail"
                  type="email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div class="flex justify-end space-x-3">
                <button
                  type="button"
                  @click="showAddMemberForm = false"
                  class="px-4 py-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Añadir
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template> 