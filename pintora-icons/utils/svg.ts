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

    // Obtener atributos
    const viewBox = svg.getAttribute('viewBox') || '0 0 24 24'
    const width = svg.getAttribute('width') || undefined
    const height = svg.getAttribute('height') || undefined

    // Limpiar el SVG
    const elements = [svg, ...Array.from(svg.getElementsByTagName('*'))]
    elements.forEach(el => {
      if (el.hasAttribute('fill')) el.setAttribute('fill', 'currentColor')
      if (el.hasAttribute('stroke')) el.setAttribute('stroke', 'currentColor')
    })

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