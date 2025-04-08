interface SvgData {
  svg: string
  viewBox: string
  width?: string
  height?: string
}

export const parseSvgFromClipboard = async (event: ClipboardEvent): Promise<SvgData | null> => {
  try {
    // Intentar obtener el SVG como texto
    const text = await event.clipboardData?.getData('text/plain')
    if (!text?.trim().startsWith('<svg')) return null

    // Parsear el SVG
    const parser = new DOMParser()
    const doc = parser.parseFromString(text, 'image/svg+xml')
    const svg = doc.querySelector('svg')
    if (!svg) return null

    svg.removeAttribute('class')
    svg.setAttribute('width', '100%')
    svg.setAttribute('height', '100%')

    // Obtener atributos
    const viewBox = svg.getAttribute('viewBox') || '0 0 24 24'
    const width = svg.getAttribute('width') || undefined
    const height = svg.getAttribute('height') || undefined

    return {
      svg: svg.outerHTML,
      viewBox,
      width,
      height
    }
  } catch (error) {
    console.error('Error parsing SVG from clipboard:', error)
    return null
  }
} 