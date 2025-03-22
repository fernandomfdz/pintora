// stores/useAuthStore.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | any
  }),
  actions: {
    setUser(user: any) {
      this.user = user
    },
    reset() {
      this.user = null
    }
  },
  persist: true
})