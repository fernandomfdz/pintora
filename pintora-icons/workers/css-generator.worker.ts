import { generateTemplates } from '@/utils/font-generation/template-generator'
import type { IconMetadata } from '@/types/icon'

self.onmessage = async (e: MessageEvent) => {
  try {
    const { icons, settings } = e.data
    
    // Generar solo el CSS
    const templates = generateTemplates(icons, settings)
    
    self.postMessage({ type: 'success', data: templates.css })
  } catch (error) {
    self.postMessage({ type: 'error', error: error.message })
  }
} 