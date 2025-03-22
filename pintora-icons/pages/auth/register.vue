<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const client = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const step = ref(1)
const organizationType = ref<'create' | 'join' | null>(null)
const loading = ref(false)
const error = ref('')

// Datos del usuario
const email = ref('')
const password = ref('')
const name = ref('')

// Datos de la organización
const orgName = ref('')
const inviteCode = ref('')

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = ''
    
    // Registrar usuario
    const { error: signUpError } = await client.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          name: name.value
        }
      }
    })
    if (signUpError) throw signUpError

      console.log('Usuario registrado:', user.value);

    // Crear organización por defecto
    if (user.value) {
      const { error: orgError } = await client
        .from('organizations')
        .insert({
          name: `${name.value}'s Organization`,
          owner_id: user.value.id
        })
      if (orgError) throw orgError
    }
    
    step.value = 2
  } catch (e: any) {
    error.value = e.message
    console.error('Error en registro:', e)
  } finally {
    loading.value = false
  }
}

const handleOrganizationStep = async () => {
  if (!user.value) {
    error.value = 'Error: Usuario no autenticado'
    return
  }

  try {
    loading.value = true
    error.value = ''

    if (organizationType.value === 'create' && orgName.value) {
      const { error: orgError } = await client
        .from('organizations')
        .insert({
          name: orgName.value,
          owner_id: user.value.id
        })
      if (orgError) throw orgError
      
      await router.push('/')
    } else if (organizationType.value === 'join' && inviteCode.value) {
      const { error: joinError } = await client
        .from('organization_members')
        .insert({
          organization_id: inviteCode.value,
          user_id: user.value.id
        })
      if (joinError) throw joinError
      
      await router.push('/')
    }
  } catch (e: any) {
    error.value = e.message
    console.error('Error en organización:', e)
  } finally {
    loading.value = false
  }
}

definePageMeta({
  layout: 'auth'
})
</script>

<template>
  <AuthForm :isLogin="false" />
</template> 