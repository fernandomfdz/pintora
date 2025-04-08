import SVGIcons2SVGFontStream from 'svgicons2svgfont'
import { Readable } from 'stream'
import type { IconMetadata } from '@/types/icon'

interface SVGFontOptions {
  fontName: string
  fontHeight: number
  normalize: boolean
  log?: (...args: any[]) => void
}

interface GlyphStream extends Readable {
  metadata?: {
    name: string
    unicode: string[]
  }
}

export async function generateSvgFont(icons: { metadata: IconMetadata; contents: string }[]): Promise<string> {
  return new Promise((resolve, reject) => {
    let fontData = ''
    
    const fontOptions: SVGFontOptions = {
      fontName: 'pintora-icons',
      fontHeight: 1000,
      normalize: true,
      log: (...args) => console.log('SVGIcons2SVGFont:', ...args)
    }

    console.log('Iniciando generación de fuente con opciones:', fontOptions)
    const fontStream = new SVGIcons2SVGFontStream(fontOptions as any)

    fontStream.on('data', (chunk: Buffer) => {
      console.log('Recibido chunk de datos, longitud:', chunk.length)
      fontData += chunk.toString('utf8')
    })

    fontStream.on('end', () => {
      console.log('Stream finalizado, longitud total:', fontData.length)
      resolve(fontData)
    })

    fontStream.on('error', (err) => {
      console.error('Error en el stream de la fuente:', err)
      reject(err)
    })

    try {
      console.log(`Procesando ${icons.length} iconos...`)
      icons.forEach((icon, index) => {
        console.log(`Procesando icono ${index}:`, icon.metadata.name)

        // Crear un stream legible siguiendo la documentación
        const glyph: GlyphStream = new Readable()
        glyph._read = () => {} // Necesario para streams personalizados

        // Asignar la metadata primero
        glyph.metadata = {
          name: icon.metadata.name,
          unicode: [String.fromCodePoint(0xE000 + index)]
        }

        // Escribir el contenido SVG al stream
        const svgContent = icon.contents
        console.log(`Contenido SVG para ${icon.metadata.name}:`, svgContent)
        glyph.push(svgContent)
        glyph.push(null)

        // Escribir el glyph al stream de la fuente
        console.log(`Escribiendo glyph ${icon.metadata.name} al stream...`)
        fontStream.write(glyph)
      })

      console.log('Finalizando stream de la fuente...')
      fontStream.end()
    } catch (error) {
      console.error('Error procesando iconos:', error)
      reject(error)
    }
  })
}

function generateSvgString(icon: IconMetadata): string {
  const svgAttrs = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '100%',
    height: '100%',
    viewBox: icon.viewBox || '0 0 24 24',
    fill: 'currentColor'
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