export interface IconElement {
  type: string
  attributes: Record<string, string>
  content?: string
}

export interface IconMetadata {
  id: string
  name: string
  viewBox?: string
  elements: IconElement[]
} 