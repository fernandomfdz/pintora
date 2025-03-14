import { ref } from 'vue'
import type { IconMetadata, SvgElement } from '@/types/icon'

export const useIconExport = () => {
  const isExporting = ref(false)

  const generateSvgString = (icon: IconMetadata): string => {
    const attributes = [
      `viewBox="${icon.viewBox || '0 0 24 24'}"`,
      icon.width ? `width="${icon.width}"` : '',
      icon.height ? `height="${icon.height}"` : '',
      icon.fill ? `fill="${icon.fill}"` : 'fill="none"',
      icon.stroke ? `stroke="${icon.stroke}"` : 'stroke="currentColor"',
      icon.strokeWidth ? `stroke-width="${icon.strokeWidth}"` : 'stroke-width="2"'
    ].filter(Boolean).join(' ')

    const generateElementString = (element: SvgElement): string => {
      const attrs = Object.entries(element.attributes)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ')

      if (element.content) {
        return `<${element.type} ${attrs}>${element.content}</${element.type}>`
      }
      return `<${element.type} ${attrs}/>`
    }

    const elementsString = icon.elements.map(generateElementString).join('\n  ')

    return `<svg xmlns="http://www.w3.org/2000/svg" ${attributes}>\n  ${elementsString}\n</svg>`
  }

  const generateCssClass = (icon: IconMetadata): string => {
    const svgString = generateSvgString(icon)
    const encodedSvg = encodeURIComponent(svgString)
      .replace(/'/g, '%27')
      .replace(/"/g, '%22')

    return `
.icon-${icon.name}::after {
  content: "";
  display: inline-block;
  width: ${icon.width || 24}px;
  height: ${icon.height || 24}px;
  background-color: currentColor;
  mask: url("data:image/svg+xml,${encodedSvg}");
  -webkit-mask: url("data:image/svg+xml,${encodedSvg}");
  mask-size: contain;
  -webkit-mask-size: contain;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
}`
  }

  const exportIcons = async (icons: IconMetadata[]) => {
    isExporting.value = true

    try {
      // Generar CSS
      const css = icons.map(generateCssClass).join('\n\n')
      const cssBlob = new Blob([css], { type: 'text/css' })
      const cssUrl = URL.createObjectURL(cssBlob)
      
      // Descargar CSS
      const link = document.createElement('a')
      link.href = cssUrl
      link.download = 'pintora-icons.css'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(cssUrl)

      // Generar JSON
      const json = JSON.stringify(icons, null, 2)
      const jsonBlob = new Blob([json], { type: 'application/json' })
      const jsonUrl = URL.createObjectURL(jsonBlob)
      
      // Descargar JSON
      const jsonLink = document.createElement('a')
      jsonLink.href = jsonUrl
      jsonLink.download = 'pintora-icons.json'
      document.body.appendChild(jsonLink)
      jsonLink.click()
      document.body.removeChild(jsonLink)
      URL.revokeObjectURL(jsonUrl)
    } finally {
      isExporting.value = false
    }
  }

  return {
    exportIcons,
    isExporting
  }
} 