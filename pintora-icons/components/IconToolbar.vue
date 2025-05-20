<template>
  <div class="flex items-center gap-4 p-4">
    
    <div class="flex-1">
      <input
        v-model="searchQuery"
        placeholder="Search icons..."
         class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
        @input="handleSearch"
      />
    </div>
  </div>
</template> 

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

const emit = defineEmits<{
  (e: 'search', query: string): void
}>()

const handleSearch = () => {
  emit('search', searchQuery.value)
}
</script>