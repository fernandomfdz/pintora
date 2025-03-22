export default defineNuxtPlugin((nuxtApp) => {
  const user = useSupabaseUser()
  const authStore = useAuthStore(nuxtApp.$pinia) // ✅ SOLUCIÓN

  watch(user, (val) => {
    if (val) {
      authStore.setUser(val)
    } else {
      authStore.reset()
    }
  }, { immediate: true })
})