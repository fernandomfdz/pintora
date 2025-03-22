import { ref } from 'vue'
import type { IconCollection, IconMetadata, SvgElement } from '@/types/icon'

const SVG_ELEMENTS = [
  'canvas', 'circle', 'ellipse', 'foreignObject', 'line', 'path',
  'polygon', 'polyline', 'rect', 'text', 'textPath', 'tspan'
] as const

export const useIconImport = () => {
  const isImporting = ref(false)

  const parseSvgElement = (element: Element): SvgElement | null => {
    if (!SVG_ELEMENTS.includes(element.tagName.toLowerCase() as any)) return null

    const attributes: Record<string, string> = {}
    for (const attr of element.attributes) {
      const value = attr.value
      // Reemplazar fill y stroke por currentColor
      if (attr.name === 'fill' || attr.name === 'stroke') {
        attributes[attr.name] = 'currentColor'
      } else {
        attributes[attr.name] = value
      }
    }

    return {
      type: element.tagName.toLowerCase() as SvgElement['type'],
      attributes,
      content: element.textContent || undefined
    }
  }

  const parseSvgFile = async (file: File, name: string): Promise<IconMetadata> => {
    const text = await file.text()
    const parser = new DOMParser()
    const doc = parser.parseFromString(text, 'image/svg+xml')
    const svg = doc.querySelector('svg')
    
    if (!svg) throw new Error('Invalid SVG file')

    const elements: SvgElement[] = []
    for (const child of svg.children) {
      const element = parseSvgElement(child)
      if (element) elements.push(element)
    }

    // Asegurarnos de que el SVG tenga los atributos correctos
    const viewBox = svg.getAttribute('viewBox') || '0 0 24 24'
    const width = svg.getAttribute('width') ? parseInt(svg.getAttribute('width')!) : 24
    const height = svg.getAttribute('height') ? parseInt(svg.getAttribute('height')!) : 24
    const strokeWidth = svg.getAttribute('stroke-width')

    return {
      id: crypto.randomUUID(),
      name,
      viewBox,
      width,
      height,
      fill: 'currentColor',
      stroke: 'currentColor',
      strokeWidth: strokeWidth || '2',
      elements
    }
  }

  const importSvgFiles = async (files: FileList | (File | Blob)[], names?: string[]): Promise<IconCollection> => {
    isImporting.value = true
    
    try {
      const fileArray = Array.from(files)
      const icons = await Promise.all(fileArray.map((file, index) => {
        const name = names?.[index] || `icon-${Date.now()}-${index}`
        return parseSvgFile(file as File, name)
      }))
      
      return {
        id: crypto.randomUUID(),
        name: 'Imported Icons',
        icons
      }
    } finally {
      isImporting.value = false
    }
  }

  return {
    importSvgFiles,
    isImporting,
    parseSvgFile
  }
} 