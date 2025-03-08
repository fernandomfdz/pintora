<script setup lang="ts">
import { Token, TokenGroup } from '@/types/tokens'
import Button from '@/components/ui/button.vue'

const props = defineProps<{
  group: TokenGroup | null
  selectedToken: Token | null
}>()

const emit = defineEmits<{
  (e: 'select-token', token: Token): void
  (e: 'add-token'): void
  (e: 'delete-token', token: Token): void
}>()

function getPreviewStyle(token: Token) {
  if (token.type === 'color') {
    return {
      backgroundColor: token.value,
      width: '24px',
      height: '24px',
      borderRadius: '4px',
    }
  }
  
  if (token.type === 'typography') {
    return {
      fontSize: token.value,
    }
  }
  
  if (token.type === 'spacing') {
    return {
      width: token.value,
      height: '8px',
      backgroundColor: 'var(--primary)',
      borderRadius: '4px',
    }
  }
  
  if (token.type === 'shadow') {
    return {
      width: '24px',
      height: '24px',
      backgroundColor: 'white',
      borderRadius: '4px',
      boxShadow: token.value,
    }
  }
  
  if (token.type === 'radius') {
    return {
      width: '24px',
      height: '24px',
      backgroundColor: 'var(--primary)',
      borderRadius: token.value,
    }
  }
  
  return {}
}
</script>

<template>
  <div class="border rounded-md">
    <div class="p-4 border-b flex justify-between items-center">
      <h3 class="font-semibold">
        {{ props.group?.name || 'Selecciona un grupo' }}
      </h3>
      <Button 
        v-if="props.group" 
        @click="emit('add-token')" 
        size="sm"
        variant="outline"
      >
        Añadir Token
      </Button>
    </div>
    <div v-if="props.group" class="divide-y">
      <div
        v-for="token in props.group.tokens"
        :key="token.id"
        @click="emit('select-token', token)"
        class="p-4 flex items-center justify-between hover:bg-accent cursor-pointer transition-colors"
        :class="{ 'bg-accent': props.selectedToken?.id === token.id }"
      >
        <div class="flex items-center gap-3">
          <div v-if="token.type === 'color' || token.type === 'spacing' || token.type === 'shadow' || token.type === 'radius'" 
               class="token-preview" 
               :style="getPreviewStyle(token)">
          </div>
          <div>
            <div class="font-medium">{{ token.name }}</div>
            <div class="text-sm text-muted-foreground">{{ token.value }}</div>
          </div>
        </div>
        <Button 
          @click.stop="emit('delete-token', token)" 
          variant="ghost" 
          size="sm"
          class="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          Eliminar
        </Button>
      </div>
      <div v-if="props.group.tokens.length === 0" class="p-6 text-center text-muted-foreground">
        No hay tokens en este grupo. Añade uno nuevo.
      </div>
    </div>
    <div v-else class="p-6 text-center text-muted-foreground">
      Selecciona un grupo para ver sus tokens.
    </div>
  </div>
</template>

<style scoped>
.token-preview {
  display: inline-block;
  border: 1px solid var(--border);
}
</style> 