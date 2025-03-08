<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ isEditing ? 'Editar Token' : 'Nuevo Token' }}
      </h3>
    </div>
    
    <div class="p-4">
      <form @submit.prevent="saveToken">
        <div class="space-y-4">
          <div>
            <label for="token-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nombre
            </label>
            <input
              id="token-name"
              v-model="formData.name"
              type="text"
              class="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          
          <div>
            <label for="token-value" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Valor
            </label>
            <div class="mt-1 flex rounded-md shadow-sm">
              <input
                id="token-value"
                v-model="formData.value"
                type="text"
                class="block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                required
              />
              <div v-if="formData.type === 'color'" class="ml-2">
                <input
                  v-model="formData.value"
                  type="color"
                  class="h-8 w-8 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label for="token-description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Descripción
            </label>
            <textarea
              id="token-description"
              v-model="formData.description"
              rows="3"
              class="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            ></textarea>
          </div>
          
          <div class="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              @click="$emit('cancel')"
              class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ isEditing ? 'Actualizar' : 'Crear' }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { AnyToken, TokenType } from '~/types/tokens';

const props = defineProps<{
  groupId: string;
  groupType: TokenType;
  token?: AnyToken;
}>();

const emit = defineEmits<{
  (e: 'save', groupId: string, token: AnyToken): void;
  (e: 'cancel'): void;
}>();

const isEditing = computed(() => !!props.token);

const formData = ref({
  id: '',
  name: '',
  type: props.groupType,
  value: '',
  description: ''
});

onMounted(() => {
  if (props.token) {
    formData.value = { ...props.token };
  } else {
    // Generar un ID único para el nuevo token
    formData.value.id = `${props.groupType}-${Date.now()}`;
  }
});

const saveToken = () => {
  emit('save', props.groupId, formData.value as AnyToken);
};
</script> 