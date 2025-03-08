<script setup lang="ts">
import { cn } from '@/lib/utils'
import type { ClassValue } from 'clsx'

interface Props {
  class?: ClassValue
  as?: string
}

const props = withDefaults(defineProps<Props>(), {
  as: 'h3'
})
</script>

<template>
  <component :is="props.as" :class="cn('text-2xl font-semibold leading-none tracking-tight', props.class)">
    <slot />
  </component>
</template> 