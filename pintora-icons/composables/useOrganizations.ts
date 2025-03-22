import { ref } from 'vue'
import { useSupabaseClient } from '#imports'
import type { Organization } from '@/types/supabase'

export const useOrganizations = () => {
  const supabase = useSupabaseClient()
  const organizations = ref<Organization[]>([])
  const memberOrganizations = ref<Organization[]>([])
  const loading = ref(false)
  const error = ref('')

  const loadOrganizations = async (userId: string) => {
    try {
      loading.value = true
      error.value = ''

      // Cargar organizaciones propias
      const { data: ownedOrgs, error: ownedError } = await supabase
        .from('organizations')
        .select(`
          *,
          members:organization_members(
            id,
            user_id
          )
        `)
        .eq('owner_id', userId)

      if (ownedError) throw ownedError

      // Cargar organizaciones donde soy miembro
      const { data: memberOrgs, error: memberError } = await supabase
        .from('organizations')
        .select(`
          *,
          members:organization_members(
            id,
            user_id
          )
        `)
        .neq('owner_id', userId)
        .in('id', (await supabase
          .from('organization_members')
          .select('organization_id')
          .eq('user_id', userId)).data?.map((m: { organization_id: string }) => m.organization_id) || [])

      if (memberError) throw memberError

      organizations.value = ownedOrgs || []
      memberOrganizations.value = memberOrgs || []
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const createOrganization = async (name: string, userId: string) => {
    try {
      loading.value = true
      error.value = ''

      const { data, error: err } = await supabase
        .from('organizations')
        .insert({
          name,
          owner_id: userId
        })
        .select()
        .single()

      if (err) throw err

      organizations.value.push(data)
      return data
    } catch (err: any) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  const addMember = async (organizationId: string, userId: string) => {
    try {
      loading.value = true
      error.value = ''

      const { error: memberError } = await supabase
        .from('organization_members')
        .insert({
          organization_id: organizationId,
          user_id: userId
        })

      if (memberError) throw memberError

      // Recargar las organizaciones para actualizar la lista de miembros
      await loadOrganizations(userId)
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const removeMember = async (organizationId: string, memberId: string) => {
    try {
      loading.value = true
      error.value = ''

      const { error: err } = await supabase
        .from('organization_members')
        .delete()
        .eq('organization_id', organizationId)
        .eq('user_id', memberId)

      if (err) throw err

      // Actualizar la lista de miembros en la organización actual
      const org = organizations.value.find(o => o.id === organizationId)
      if (org && org.members) {
        org.members = org.members.filter(m => m.user_id !== memberId)
      }
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    organizations,
    memberOrganizations,
    loading,
    error,
    loadOrganizations,
    createOrganization,
    addMember,
    removeMember
  }
} 