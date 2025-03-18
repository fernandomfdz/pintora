import { ref } from 'vue'
import type { IconMetadata } from '@/types/icon'

export const useIconExport = () => {
  const isExporting = ref(false)

  const generateSvgString = (icon: IconMetadata): string => {
    const svgAttrs = {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '100%',
      height: '100%',
      viewBox: icon.viewBox,
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2'
    }

    const svgAttrsString = Object.entries(svgAttrs)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ')

    const elementsString = icon.elements
      .map(element => {
        const attrs = Object.entries(element.attributes)
          .map(([key, value]) => `${key}="${value}"`)
          .join(' ')
        
        if (element.content) {
          return `<${element.type} ${attrs}>${element.content}</${element.type}>`
        }
        return `<${element.type} ${attrs}/>`
      })
      .join('\n  ')

    return `<svg ${svgAttrsString}>\n  ${elementsString}\n</svg>`
  }

  const generateCss = (icons: IconMetadata[]): string => {
    const iconClasses = icons.map(icon => {
      const svgString = generateSvgString(icon)
      const encodedSvg = encodeURIComponent(svgString)
        .replace(/'/g, '%27')
        .replace(/"/g, '%22')

      return `.pintora-icon.${icon.name} {
  mask-image: url('data:image/svg+xml,${encodedSvg}');
  -webkit-mask-image: url('data:image/svg+xml,${encodedSvg}');
}`
    }).join('\n\n')

    return `/* Pintora Icons - Generado automáticamente */

:root {
  --pintora-icon-size: 24px;
}

.pintora-icon {
  display: inline-block;
  width: var(--pintora-icon-size);
  height: var(--pintora-icon-size);
  mask-size: 100% 100%;
  -webkit-mask-size: 100% 100%;
  background-color: currentColor;
}

${iconClasses}`
  }

  const exportIcons = async (icons: IconMetadata[]) => {
    isExporting.value = true

    try {
      const css = generateCss(icons)
      const blob = new Blob([css], { type: 'text/css' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = 'pintora-icons.css'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } finally {
      isExporting.value = false
    }
  }

  return {
    exportIcons,
    isExporting
  }
} 