import { ref } from 'vue'
import { useSupabaseClient, useRouter } from '#imports'
import type { User } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

export function useAuth() {
  const supabase = useSupabaseClient<Database>()
  const router = useRouter()
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function loadUser() {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      user.value = currentUser
    } catch (err) {
      console.error('Error loading user:', err)
      error.value = err instanceof Error ? err : new Error('Error desconocido al cargar el usuario')
    }
  }

  async function signUp(email: string, password: string, name?: string) {
    try {
      loading.value = true
      error.value = null

      // 1. Registrar usuario
      console.log('1. Iniciando registro de usuario...')
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (signUpError) {
        console.error('Error en registro de usuario:', signUpError)
        throw signUpError
      }

      if (!data.user) {
        console.error('No se recibieron datos del usuario después del registro')
        throw new Error('Error en el registro: no se recibieron datos del usuario')
      }

      user.value = data.user

      // 2. Crear organización personal
      console.log('2. Creando organización personal...')
      const { data: org, error: orgError } = await supabase
        .from('organizations')
        .insert({
          name: `${name || email}'s Organization`,
          owner_id: data.user.id
        })
        .select()
        .single()

      if (orgError) {
        console.error('Error creando organización:', orgError)
        // Si falla la creación de la organización, eliminamos el usuario
        await supabase.auth.admin.deleteUser(data.user.id)
        throw orgError
      }

      // 3. Añadir usuario como miembro de la organización
      console.log('3. Añadiendo usuario como miembro...')
      const { error: memberError } = await supabase
        .from('organization_members')
        .insert({
          organization_id: org.id,
          user_id: data.user.id
        })

      if (memberError) {
        console.error('Error añadiendo miembro:', memberError)
        // Si falla la adición del miembro, eliminamos la organización y el usuario
        await supabase.from('organizations').delete().eq('id', org.id)
        await supabase.auth.admin.deleteUser(data.user.id)
        throw memberError
      }

      console.log('Registro completado exitosamente')

      if (data.session) {
        await router.push('/dashboard')
      } else {
        await router.push('/auth/verify-email')
      }
    } catch (err) {
      console.error('Error en el proceso de registro:', err)
      error.value = err instanceof Error ? err : new Error('Error desconocido en el registro')
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function signIn(email: string, password: string) {
    try {
      loading.value = true
      error.value = null

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          redirectTo: `${window.location.origin}` // 🔥 obligar al "redirectTo" genera las cookies httpOnly
        }
      })

      if (signInError) throw signInError

      user.value = data.user

      if (data.session) {
        await router.push('/dashboard')
      }
    } catch (err) {
      console.error('Error in sign in:', err)
      error.value = err instanceof Error ? err : new Error('Error desconocido en el inicio de sesión')
      throw error.value
    } finally {
      loading.value = false
    }
  }

  async function signOut() {
    try {
      loading.value = true
      error.value = null

      const { error: signOutError } = await supabase.auth.signOut()
      if (signOutError) throw signOutError

      user.value = null
      
      await router.push('/auth/login')
    } catch (err) {
      console.error('Error in sign out:', err)
      error.value = err instanceof Error ? err : new Error('Error desconocido al cerrar sesión')
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    error,
    loadUser,
    signUp,
    signIn,
    signOut
  }
} 