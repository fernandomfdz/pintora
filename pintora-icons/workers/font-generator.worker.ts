import { generateSvgFont } from '@/utils/font-generation/svg-to-font'
import { generateFonts } from '@/utils/font-generation/woff2-generator'
import { generateZip } from '@/utils/font-generation/zip-generator'
import { generateTemplates } from '@/utils/font-generation/template-generator'
import type { IconMetadata } from '@/types/icon'

const reportProgress = (step: string, value: number) => {
  self.postMessage({ type: 'progress', progress: { step, value } })
}

const reportError = (error: Error, context: string) => {
  console.error(`Error en ${context}:`, error)
  self.postMessage({ 
    type: 'error', 
    error: `Error en ${context}: ${error.message}`,
    details: {
      context,
      message: error.message,
      stack: error.stack
    }
  })
}

const validateIcons = (icons: IconMetadata[]): boolean => {
  if (!Array.isArray(icons) || icons.length === 0) {
    throw new Error('No se proporcionaron iconos para procesar')
  }

  for (const icon of icons) {
    if (!icon.name || !icon.elements || !Array.isArray(icon.elements)) {
      throw new Error(`Icono inválido: ${JSON.stringify(icon)}`)
    }

    // Validar que los elementos tengan la estructura correcta
    for (const element of icon.elements) {
      if (!element.type || !element.attributes || typeof element.attributes !== 'object') {
        throw new Error(`Elemento inválido en el icono ${icon.name}: ${JSON.stringify(element)}`)
      }
    }
  }

  return true
}

self.onmessage = async (e: MessageEvent) => {
  console.log('Worker: Mensaje recibido', e.data)
  try {
    const { icons, settings } = e.data
    
    // Validar iconos
    console.log('Worker: Validando iconos...')
    validateIcons(icons)
    console.log('Worker: Iconos validados')
    
    // 1. Generar SVG font
    console.log('Worker: Iniciando generación de fuente SVG...')
    reportProgress('Generando fuente SVG', 0)
    let svgFont: Blob
    try {
      svgFont = await generateSvgFont(icons)
      console.log('Worker: Fuente SVG generada')
      reportProgress('Generando fuente SVG', 25)
    } catch (error) {
      console.error('Worker: Error generando fuente SVG:', error)
      reportError(error as Error, 'generación de fuente SVG')
      return
    }
    
    // 2. Convertir a diferentes formatos
    console.log('Worker: Iniciando conversión de formatos...')
    reportProgress('Convirtiendo formatos', 25)
    let fonts
    try {
      fonts = await generateFonts(svgFont)
      console.log('Worker: Formatos convertidos')
      reportProgress('Convirtiendo formatos', 50)
    } catch (error) {
      console.error('Worker: Error convirtiendo formatos:', error)
      reportError(error as Error, 'conversión de formatos')
      return
    }
    
    // 3. Generar archivos de plantilla
    console.log('Worker: Iniciando generación de plantillas...')
    reportProgress('Generando plantillas', 50)
    let templates
    try {
      templates = generateTemplates(icons, settings)
      console.log('Worker: Plantillas generadas')
      reportProgress('Generando plantillas', 75)
    } catch (error) {
      console.error('Worker: Error generando plantillas:', error)
      reportError(error as Error, 'generación de plantillas')
      return
    }
    
    // 4. Crear archivo ZIP
    console.log('Worker: Iniciando creación de ZIP...')
    reportProgress('Creando archivo ZIP', 75)
    try {
      const zipBlob = await generateZip({
        'fonts/icons.ttf': fonts.ttf,
        'fonts/icons.woff2': fonts.woff2,
        'fonts/icons.otf': fonts.otf,
        'css/icons.css': templates.css,
        'index.html': templates.html
      })
      console.log('Worker: ZIP creado')
      reportProgress('Creando archivo ZIP', 100)
      
      console.log('Worker: Enviando resultado...')
      self.postMessage({ type: 'success', data: zipBlob })
      console.log('Worker: Resultado enviado')
    } catch (error) {
      console.error('Worker: Error creando ZIP:', error)
      reportError(error as Error, 'creación del archivo ZIP')
    }
  } catch (error) {
    console.error('Worker: Error general:', error)
    reportError(error as Error, 'proceso general')
  }
} 