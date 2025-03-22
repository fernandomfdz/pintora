<script setup lang="ts">
  import { ref } from 'vue'

  definePageMeta({
    layout: 'auth'
  })

const client = useSupabaseClient()
const loading = ref(false)
const error = ref('')

const email = ref('')
const password = ref('')

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = ''
    const { error: authError } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    if (authError) throw authError
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthForm :isLogin="true" />
</template> 