export default defineNuxtRouteMiddleware((to) => {
  if (process.server) return // 🔥 Solo corre en cliente

  const authStore = useAuthStore()
  
  console.log('authStore', authStore.user)

  if (!authStore.user && !to.path.startsWith('/auth')) {
    return navigateTo('/auth/login')
  }
  if (authStore.user && to.path.startsWith('/auth')) {
    return navigateTo('/dashboard')
  }
})