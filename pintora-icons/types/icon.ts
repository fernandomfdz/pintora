import type { CssSettings } from './css'
import type { Icon as DbIcon } from './icons'

export interface SvgElement {
  type: 'canvas' | 'circle' | 'ellipse' | 'foreignObject' | 'line' | 'path' |
        'polygon' | 'polyline' | 'rect' | 'text' | 'textPath' | 'tspan'
  attributes: Record<string, string>
  content?: string
}

export interface IconMetadata {
  id: string
  name: string
  viewBox?: string
  width: string
  height: string
  fill?: string
  stroke?: string
  strokeWidth?: string
  elements?: SvgElement[]
  tags?: string[]
}

export interface Icon extends IconMetadata {
  svg: string
  viewBox: string
}

export interface IconCollection {
  id: string
  name: string
  icons: IconMetadata[]
}

export interface IconLibrary {
  id: string
  name: string
  owner_id: string
  organization_id?: string
  icons: DbIcon[]
  css_settings: CssSettings
  created_at: string
  updated_at: string
  organization?: {
    id: string
    name: string
  }
} 