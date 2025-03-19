import type { IconMetadata } from '@/types/icon'
import { SVGIcons2SVGFontStream } from 'svgicons2svgfont'
import { BrowserReadableStream } from './browser-stream'

export interface SvgFontOptions {
  fontName?: string
  fontHeight?: number
  descent?: number
  normalize?: boolean
}

export const generateSvgFont = async (
  icons: IconMetadata[],
  options: SvgFontOptions = {}
): Promise<Blob> => {
  const {
    fontName = 'pintora-icons',
    fontHeight = 1000,
    descent = 0,
    normalize = true
  } = options

  return new Promise((resolve, reject) => {
    let fontData = ''
    const fontStream = new SVGIcons2SVGFontStream({
      fontName,
      fontHeight,
      descent,
      normalize,
    } as any)

    fontStream.on('data', (data: any) => {
      fontData += data
    })

    fontStream.on('end', () => {
      resolve(new Blob([fontData], { type: 'image/svg+xml' }))
    })

    fontStream.on('error', reject)

    // Procesar cada icono
    icons.forEach((icon) => {
      const glyph = new BrowserReadableStream()
      const svgString = generateSvgString(icon)
      glyph.push(svgString)
      glyph.push(null)

      // Metadata para el glyph
      glyph.setMetadata({
        name: icon.name,
        unicode: [String.fromCharCode(0xE000 + icons.indexOf(icon))],
        verticalAlign: 0
      })

      // Adaptar el glyph para SVGIcons2SVGFont
      const adaptedGlyph = {
        contents: glyph.toString(),
        metadata: glyph.getMetadata()
      }

      fontStream.write(adaptedGlyph)
    })

    fontStream.end()
  })
}

const generateSvgString = (icon: IconMetadata): string => {
  const svgAttrs = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '100%',
    height: '100%',
    viewBox: icon.viewBox || '0 0 24 24'
  }

  const svgAttrsString = Object.entries(svgAttrs)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ')

  const elementsString = icon.elements
    .map(element => {
      const attrs = Object.entries(element.attributes)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ')
      
      if (element.content) {
        return `<${element.type} ${attrs}>${element.content}</${element.type}>`
      }
      return `<${element.type} ${attrs}/>`
    })
    .join('\n  ')

  return `<svg ${svgAttrsString}>\n  ${elementsString}\n</svg>`
} 