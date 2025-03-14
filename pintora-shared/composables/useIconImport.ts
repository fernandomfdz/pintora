import { ref } from 'vue'
import type { IconMetadata, IconCollection } from '../types/icon'

export const useIconImport = () => {
  const isImporting = ref(false)

  const parseSvgString = (svgString: string): IconMetadata | null => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(svgString, 'image/svg+xml')
    const svg = doc.querySelector('svg')
    
    if (!svg) return null

    const path = svg.querySelector('path')
    if (!path) return null

    return {
      id: crypto.randomUUID(),
      name: 'Imported Icon',
      path: path.getAttribute('d') || '',
      tags: [],
      width: parseInt(svg.getAttribute('width') || '24'),
      height: parseInt(svg.getAttribute('height') || '24'),
      viewBox: svg.getAttribute('viewBox') || '0 0 24 24'
    }
  }

  const importSvgFiles = async (files: FileList): Promise<IconCollection> => {
    isImporting.value = true
    
    try {
      const icons: IconMetadata[] = []
      
      for (const file of files) {
        if (file.type === 'image/svg+xml') {
          const text = await file.text()
          const icon = parseSvgString(text)
          if (icon) {
            icon.name = file.name.replace('.svg', '')
            icons.push(icon)
          }
        }
      }

      return {
        id: crypto.randomUUID(),
        name: 'Imported Collection',
        icons,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    } finally {
      isImporting.value = false
    }
  }

  return {
    isImporting,
    importSvgFiles
  }
} 