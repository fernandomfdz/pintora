import { Buffer } from 'buffer'
import type { IconMetadata } from '@/types/icon'

// Importar dependencias de manera asíncrona
let ttf2woff2: any
let opentype: any
let svg2ttf: any

// Inicializar las dependencias
const initDependencies = async () => {
  const [ttf2woff2Module, opentypeModule, svg2ttfModule] = await Promise.all([
    import('ttf2woff2'),
    import('opentype.js'),
    import('svg2ttf')
  ])

  ttf2woff2 = ttf2woff2Module.default || ttf2woff2Module
  opentype = opentypeModule.default || opentypeModule
  svg2ttf = svg2ttfModule.default || svg2ttfModule
}

// Función para reportar progreso
const reportProgress = (step: string, value: number) => {
  self.postMessage({ type: 'progress', progress: { step, value } })
}

// Función para reportar errores
const reportError = (error: Error, context: string) => {
  self.postMessage({
    type: 'error',
    error: error.message,
    details: { context, stack: error.stack }
  })
}

// Manejador de mensajes
self.onmessage = async (e: MessageEvent) => {
  try {
    const { icons, settings } = e.data

    // Inicializar dependencias si no están cargadas
    if (!ttf2woff2) {
      reportProgress('Cargando dependencias...', 0)
      await initDependencies()
    }

    // Generar fuentes
    reportProgress('Generando fuentes...', 25)
    const svgString = generateSvgFont(icons)
    const ttfBuffer = Buffer.from(svg2ttf(svgString).buffer)
    const woff2Buffer = ttf2woff2(ttfBuffer)
    const ttfFont = opentype.parse(ttfBuffer)
    const otfBuffer = ttfFont.toArrayBuffer()

    // Crear ZIP
    reportProgress('Creando archivo ZIP...', 75)
    const zip = new JSZip()
    zip.file('fonts/icons.ttf', ttfBuffer)
    zip.file('fonts/icons.woff2', woff2Buffer)
    zip.file('fonts/icons.otf', otfBuffer)
    
    // Generar ZIP
    reportProgress('Finalizando...', 90)
    const zipBlob = await zip.generateAsync({ type: 'blob' })
    
    // Enviar resultado
    self.postMessage({ type: 'success', data: zipBlob })
  } catch (error) {
    reportError(error as Error, 'generación de fuente')
  }
}

// Función auxiliar para generar SVG
const generateSvgFont = (icons: IconMetadata[]): string => {
  // ... código existente de generación SVG ...
} 