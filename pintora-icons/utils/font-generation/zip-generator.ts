// @ts-ignore
const JSZip = require('jszip')

interface FileMap {
  [key: string]: Blob | string
}

export const generateZip = async (files: FileMap): Promise<Blob> => {
  const zip = new JSZip()

  // Agregar archivos al ZIP
  Object.entries(files).forEach(([path, content]) => {
    zip.file(path, content)
  })

  // Generar el archivo ZIP
  return await zip.generateAsync({ type: 'blob' })
} 