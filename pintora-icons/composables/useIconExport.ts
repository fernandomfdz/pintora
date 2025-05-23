import { ref } from 'vue'
import type { IconMetadata, Icon } from '@/types/icon'
import { generateSvgString } from '@/utils/icons'

export interface ExportError {
  context: string
  message: string
  details?: any
}

export function useIconExport() {
  const isExporting = ref(false)
  const exportProgress = ref<{ step: string; value: number } | null>(null)
  const exportError = ref<ExportError | null>(null)

  const exportAsSvg = async (icons: IconMetadata[] | Icon[]) => {
    try {
      exportError.value = null
      isExporting.value = true
      exportProgress.value = { step: 'Generando fuente SVG', value: 25 }

      // Llamar a la API para generar y descargar el SVG
      const response = await fetch('/api/font/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ icons, format: 'svg' }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Error al generar el archivo SVG')
      }

      exportProgress.value = { step: 'Descargando archivo', value: 75 }

      // Descargar el archivo
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'icons.svg'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      exportProgress.value = { step: 'Completado', value: 100 }
    } catch (error: any) {
      exportError.value = {
        context: 'generación SVG',
        message: error.message || 'Error al generar el archivo SVG'
      }
      throw error
    } finally {
      isExporting.value = false
      exportProgress.value = null
    }
  }

  const exportAsFont = async (icons: IconMetadata[] | Icon[]) => {
    try {
      exportError.value = null
      isExporting.value = true
      exportProgress.value = { step: 'Generando fuente SVG', value: 25 }

      // Llamar a la API para generar y descargar el ZIP
      const response = await fetch('/api/font/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ icons, format: 'font' }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Error al generar las fuentes')
      }

      exportProgress.value = { step: 'Descargando archivo', value: 75 }

      // Descargar el archivo
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'icons-font.zip'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      exportProgress.value = { step: 'Completado', value: 100 }
    } catch (error: any) {
      exportError.value = {
        context: 'generación de fuente',
        message: error.message || 'Error al generar los archivos de fuente',
        details: error.details
      }
      throw error
    } finally {
      isExporting.value = false
      exportProgress.value = null
    }
  }

  const exportAsFontBeta = async (icons: IconMetadata[] | Icon[]) => {
    try {
      exportError.value = null
      isExporting.value = true
      exportProgress.value = { step: 'Generando fuente SVG (Beta)', value: 25 }

      // Convertir los iconos al formato esperado
      const preparedIcons = icons.map(icon => {
        if ('svg' in icon) {
          return icon
        } else {
          return {
            id: icon.id,
            name: icon.name,
            svg: generateSvgString(icon)
          }
        }
      })

      // Llamar a la API beta para generar y descargar el ZIP
      const response = await fetch('/api/font/beta/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          icons: preparedIcons,
          format: 'font' 
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Error al generar las fuentes')
      }

      exportProgress.value = { step: 'Descargando archivo', value: 75 }

      // Descargar el archivo
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'icons-font-beta.zip'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      exportProgress.value = { step: 'Completado', value: 100 }
    } catch (error: any) {
      exportError.value = {
        context: 'generación de fuente (Beta)',
        message: error.message || 'Error al generar los archivos de fuente',
        details: error.details
      }
      throw error
    } finally {
      isExporting.value = false
      exportProgress.value = null
    }
  }

  return {
    isExporting,
    exportProgress,
    exportError,
    exportAsSvg,
    exportAsFont,
    exportAsFontBeta
  }
} 