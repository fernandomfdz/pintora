import { ref } from 'vue'
import { useSupabaseClient } from '#imports'
import type { IconLibrary } from '@/types/icon'

export const useIconLibraries = () => {
  const supabase = useSupabaseClient()
  const libraries = ref<IconLibrary[]>([])
  const loading = ref(false)
  const error = ref('')

  const loadLibraries = async (userId: string) => {
    try {
      loading.value = true
      error.value = ''

      const { data, error: err } = await supabase
        .from('icon_libraries')
        .select('*')
        .eq('owner_id', userId)

      if (err) throw err
      libraries.value = data || []
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const getLibrary = async (id: string): Promise<IconLibrary | null> => {
    try {
      loading.value = true
      error.value = ''

      const { data, error: err } = await supabase
        .from('icon_libraries')
        .select('*')
        .eq('id', id)
        .single()

      if (err) throw err
      return data
    } catch (err: any) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  const createLibrary = async (library: Partial<IconLibrary>): Promise<IconLibrary | null> => {
    try {
      loading.value = true
      error.value = ''

      const { data, error: err } = await supabase
        .from('icon_libraries')
        .insert(library)
        .select()
        .single()

      if (err) {
        console.error('Error al crear la librería:', err)
        throw err
      }



      libraries.value.push(data)
      return data
    } catch (err: any) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  const updateLibrary = async (library: IconLibrary): Promise<IconLibrary | null> => {
    try {
      loading.value = true
      error.value = ''

      const { data, error: err } = await supabase
        .from('icon_libraries')
        .update(library)
        .eq('id', library.id)
        .select()
        .single()

      if (err) throw err

      const index = libraries.value.findIndex(l => l.id === library.id)
      if (index !== -1) {
        libraries.value[index] = data
      }

      return data
    } catch (err: any) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  const deleteLibrary = async (id: string): Promise<boolean> => {
    try {
      loading.value = true
      error.value = ''

      const { error: err } = await supabase
        .from('icon_libraries')
        .delete()
        .eq('id', id)

      if (err) throw err

      libraries.value = libraries.value.filter(l => l.id !== id)
      return true
    } catch (err: any) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    libraries,
    loading,
    error,
    loadLibraries,
    getLibrary,
    createLibrary,
    updateLibrary,
    deleteLibrary
  }
} 