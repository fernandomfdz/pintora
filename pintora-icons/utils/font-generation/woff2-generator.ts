import { Buffer } from 'buffer'

export interface FontFormats {
  ttf: Blob
  woff2: Blob
  otf: Blob
}

export const generateFonts = async (svgFont: Blob): Promise<FontFormats> => {
  // Cargar dependencias dinámicamente
  const [ttf2woff2Module, opentypeModule, svg2ttfModule] = await Promise.all([
    import('ttf2woff2'),
    import('opentype.js'),
    import('svg2ttf')
  ])

  // Extraer las funciones de los módulos
  const ttf2woff2 = ttf2woff2Module.default || ttf2woff2Module
  const opentype = opentypeModule.default || opentypeModule
  const svg2ttf = svg2ttfModule.default || svg2ttfModule

  // 1. Convertir SVG a TTF
  const svgString = await svgFont.text()
  const ttfBuffer = Buffer.from(svg2ttf(svgString).buffer)
  
  // 2. Convertir TTF a WOFF2
  const woff2Buffer = ttf2woff2(ttfBuffer)
  
  // 3. Convertir TTF a OTF usando opentype.js
  const ttfFont = opentype.parse(ttfBuffer)
  const otfBuffer = ttfFont.toArrayBuffer()
  
  return {
    ttf: new Blob([ttfBuffer], { type: 'font/ttf' }),
    woff2: new Blob([woff2Buffer], { type: 'font/woff2' }),
    otf: new Blob([otfBuffer], { type: 'font/otf' })
  }
} 