<template>
  <div class="w-full flex justify-between items-center gap-4 p-4">
    <Button variant="default" @click="emit('import')">
      Import Icons
    </Button>
    
    <div class="flex-1">
      <input
        v-model="searchQuery"
        placeholder="Search icons..."
        @input="handleSearch"
      />
    </div>

    <Button variant="outline" @click="emit('clear')">
      Clear Selection
    </Button>

    <Button variant="default" @click="emit('export')">
      Export Selected
    </Button>
  </div>
</template> 

<script setup lang="ts">
import Button from '@pintora-shared/components/ui/Button.vue'
import { ref } from 'vue'

const searchQuery = ref('')

const emit = defineEmits<{
  (e: 'import'): void
  (e: 'search', query: string): void
  (e: 'clear'): void
  (e: 'export'): void
}>()

const handleSearch = () => {
  emit('search', searchQuery.value)
}
</script>