import type { Icon, CssSettings } from './icons'

export interface Profile {
  id: string
  email: string
  name: string | null
  nickname: string | null
  avatar_url: string | null
  updated_at: string
}

export interface Organization {
  id: string
  name: string
  owner_id: string
  created_at: string
  updated_at: string
  members?: OrganizationMember[]
}

export interface OrganizationMember {
  id: string
  organization_id: string
  user_id: string
  created_at: string
}

export interface IconLibrary {
  id: string
  name: string
  owner_id: string
  organization_id?: string
  icons: Icon[]
  css_settings: CssSettings
  created_at: string
  updated_at: string
  organization?: {
    id: string
    name: string
  }
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'id'>
        Update: Partial<Profile>
      }
      organizations: {
        Row: Organization
        Insert: Omit<Organization, 'id'>
        Update: Partial<Organization>
      }
      organization_members: {
        Row: OrganizationMember
        Insert: OrganizationMember
        Update: Partial<OrganizationMember>
      }
      icon_libraries: {
        Row: IconLibrary
        Insert: Omit<IconLibrary, 'id'>
        Update: Partial<IconLibrary>
      }
    }
  }
} 