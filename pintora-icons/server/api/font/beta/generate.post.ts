import type { Icon } from '@/types/icon'
import { generateSvgFont } from '@/server/utils/svg-to-font'
import fs from 'fs'
import path from 'path'
import { send } from 'h3'
import JSZip from 'jszip'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { icons, format } = body as { icons: Icon[], format: 'svg' | 'font' }

    // Generar las fuentes
    const distDir = await generateSvgFont(icons)

    try {
      // Si solo quieren SVG, devolver directamente el archivo SVG
      if (format === 'svg') {
        const svgPath = path.join(distDir, 'pintora-icons.svg')
        const svgContent = await fs.promises.readFile(svgPath)
        setHeader(event, 'Content-Type', 'image/svg+xml')
        setHeader(event, 'Content-Disposition', 'attachment; filename=icons.svg')
        return svgContent
      }
      // Para el formato font, creamos un ZIP con el contenido del directorio dist
      const zip = new JSZip()
      
      // Leer todos los archivos del directorio dist
      const files = await fs.promises.readdir(distDir)
      for (const file of files) {
        const filePath = path.join(distDir, file)
        const content = await fs.promises.readFile(filePath)
        zip.file(file, content)
      }

      // Generar el ZIP
      const zipContent = await zip.generateAsync({ type: 'nodebuffer' })
      setHeader(event, 'Content-Type', 'application/zip')
      setHeader(event, 'Content-Disposition', 'attachment; filename=icons-font.zip')
      return zipContent

    } finally {
      // Limpiar el directorio temporal después de enviar la respuesta
      await fs.promises.rm(path.dirname(distDir), { recursive: true, force: true })
    }

  } catch (error: any) {
    console.error('Error en la generación de fuente:', error)
    throw createError({
      statusCode: 500,
      message: error.message || 'Error al generar las fuentes',
      data: {
        context: 'generación de fuente',
        details: error.stack
      }
    })
  }
}) 