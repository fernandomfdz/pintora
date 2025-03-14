export type IconMetadata = {
  id: string
  name: string
  path: string
  tags: string[]
  width?: number
  height?: number
  viewBox?: string
}

export type IconCollection = {
  id: string
  name: string
  icons: IconMetadata[]
  createdAt: string
  updatedAt: string
}

export type IconProject = {
  id: string
  name: string
  collections: IconCollection[]
  selectedIcons: IconMetadata[]
} 