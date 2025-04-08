import { ref } from 'vue'
import type { IconCollection, IconMetadata, SvgElement, IconPreview } from '@/types/icon'

const SVG_ELEMENTS = [
  'canvas', 'circle', 'ellipse', 'foreignObject', 'line', 'path',
  'polygon', 'polyline', 'rect', 'text', 'textPath', 'tspan'
] as const

export const useIconImport = () => {
  const isImporting = ref(false)

  const parseSvgElement = (element: Element): SvgElement | null => {
    if (!SVG_ELEMENTS.includes(element.tagName.toLowerCase() as any)) return null

    const attributes: Record<string, string> = {}


    return {
      type: element.tagName.toLowerCase() as SvgElement['type'],
      attributes,
      content: element.textContent || undefined
    }
  }

  const parseSvgFile = async (file: File): Promise<IconPreview> => {
    const text = await file.text()
    const parser = new DOMParser()
    const doc = parser.parseFromString(text, 'image/svg+xml')
    const svg = doc.querySelector('svg')
    
    if (!svg) throw new Error('Invalid SVG file')

    // Asegurarnos de que el SVG tenga los atributos correctos
    svg.setAttribute('width', '100%')
    svg.setAttribute('height', '100%')
    svg.setAttribute('viewBox', '0 0 24 24')

    return {
      id: crypto.randomUUID(),
      name: file.name.replace(/\.svg$/, ''),
      svg: svg.outerHTML,
      viewBox: svg.getAttribute('viewBox') || undefined,
      width: svg.getAttribute('width') || undefined,
      height: svg.getAttribute('height') || undefined
    }
  }

  const importSvgFiles = async (files: FileList | (File | Blob)[]): Promise<IconCollection> => {
    isImporting.value = true
    
    try {
      const fileArray = Array.from(files)
      const icons = await Promise.all(fileArray.map(async (file) => {
        const preview = await parseSvgFile(file as File)
        return {
          id: preview.id,
          name: preview.name,
          svg: preview.svg,
          viewBox: preview.viewBox || '0 0 24 24',
          width: '24',
          height: '24',
          fill: 'currentColor',
          stroke: 'currentColor',
          strokeWidth: '2',
          elements: []
        }
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