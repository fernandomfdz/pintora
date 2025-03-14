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
      attributes[attr.name] = attr.value
    }

    return {
      type: element.tagName.toLowerCase() as SvgElement['type'],
      attributes,
      content: element.textContent || undefined
    }
  }

  const parseSvgFile = async (file: File): Promise<IconMetadata> => {
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

    return {
      id: crypto.randomUUID(),
      name: file.name.replace(/\.svg$/, ''),
      viewBox: svg.getAttribute('viewBox') || undefined,
      width: svg.getAttribute('width') ? parseInt(svg.getAttribute('width')!) : undefined,
      height: svg.getAttribute('height') ? parseInt(svg.getAttribute('height')!) : undefined,
      fill: svg.getAttribute('fill') || undefined,
      stroke: svg.getAttribute('stroke') || undefined,
      strokeWidth: svg.getAttribute('stroke-width') || undefined,
      elements
    }
  }

  const importSvgFiles = async (files: FileList | File[]): Promise<IconCollection> => {
    isImporting.value = true
    
    try {
      const icons = await Promise.all(Array.from(files).map(parseSvgFile))
      
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
    isImporting
  }
} 