import { ref } from 'vue'
import type { IconMetadata } from '../types/icon'

export const useIconExport = () => {
  const isExporting = ref(false)

  const generateSvgString = (icon: IconMetadata): string => {
    return `&lt;svg
  xmlns="http://www.w3.org/2000/svg"
  width="${icon.width || 24}"
  height="${icon.height || 24}"
  viewBox="${icon.viewBox || '0 0 24 24'}"
&gt;
  &lt;path d="${icon.path}" /&gt;
&lt;/svg&gt;`
  }

  const exportIcons = async (icons: IconMetadata[]) => {
    isExporting.value = true
    
    try {
      const zip = new JSZip()
      
      icons.forEach(icon => {
        const svgString = generateSvgString(icon)
        zip.file(`${icon.name}.svg`, svgString)
      })
      
      const content = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(content)
      
      const link = document.createElement('a')
      link.href = url
      link.download = 'pintora-icons.zip'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } finally {
      isExporting.value = false
    }
  }

  return {
    isExporting,
    exportIcons
  }
} 