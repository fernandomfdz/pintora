// stores/useAuthStore.ts
import { defineStore } from 'pinia'
import { themes, type Theme } from '@/utils/shiki'
export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: null as null | Theme
  }),
  actions: {
    setTheme(theme: Theme) {
      this.theme = theme
    },
    reset() {
      this.theme = null
    }
  },
  persist: true
})