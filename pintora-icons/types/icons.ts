import type { SvgElement } from './icon'

export interface Icon {
  id: string
  name: string
  svg: string
  width: string
  height: string
  viewBox?: string
  fill?: string
  stroke?: string
  strokeWidth?: string
  elements?: SvgElement[]
  tags?: string[]
}

export interface CssSettings {
  prefix: string
  fontFamily: string
  baseSelector: string
  fontSize: string
  cssUnit: string
  defaultWidth: string
  defaultHeight: string
} 