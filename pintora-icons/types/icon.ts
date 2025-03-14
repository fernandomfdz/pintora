export type SvgElement = {
  type: 'canvas' | 'circle' | 'ellipse' | 'foreignObject' | 'line' | 'path' | 'polygon' | 'polyline' | 'rect' | 'text' | 'textPath' | 'tspan'
  attributes: Record<string, string>
  content?: string
}

export type IconMetadata = {
  id: string
  name: string
  viewBox?: string
  width?: number
  height?: number
  fill?: string
  stroke?: string
  strokeWidth?: string
  elements: SvgElement[]
}

export type IconCollection = {
  id: string
  name: string
  icons: IconMetadata[]
} 