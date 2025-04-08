import type { SvgElement } from './icon'

export interface Icon {
  id: string
  name: string
  svg: string
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