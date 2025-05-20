import type { Icon } from '@/types/icon'
import path from 'path'
import fs from 'fs'
import os from 'os'
import svgtofont from 'svgtofont'
import SVGFixer from 'oslllo-svg-fixer';

export async function generateSvgFont(icons: Icon[]): Promise<string> {
  // Crear un directorio temporal para los archivos SVG
  const tempDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'pintora-icons-'))
  const svgDir = path.join(tempDir, 'svg')
  const fixedSvgDir = path.join(tempDir, 'fixed-svg')
  const distDir = path.join(tempDir, 'dist')
  
  try {
    // Crear directorios necesarios
    await fs.promises.mkdir(svgDir, { recursive: true })
    await fs.promises.mkdir(fixedSvgDir, { recursive: true })
    await fs.promises.mkdir(distDir, { recursive: true })

    // Guardar los SVGs en archivos temporales
    for (const icon of icons) {
      const svgPath = path.join(svgDir, `${icon.name}.svg`)
      console.log('svgPath', svgPath)
      await fs.promises.writeFile(svgPath, icon.svg)
    }

    await SVGFixer(svgDir, fixedSvgDir).fix()
    console.log("Fixed SVGs");

    // Configurar opciones para svgtofont
    await svgtofont({
      src: fixedSvgDir,
      dist: distDir,
      fontName: 'pintora-icons',
      css: true,
      startUnicode: 0xE000,
      excludeFormat: ['woff2'],
      svgicons2svgfont: {
        fontHeight: 1000,
        normalize: true
      },
      generateInfoData: true,
      outSVGPath: true,
      // Configuración del sitio web de demostración
      website: {
        title: "Pintora Icons",
        meta: {
          description: "Iconos generados con Pintora Icons",
          keywords: "icons,svg,font,ttf,eot,woff,woff2"
        },
        links: [
          {
            title: "Font Class",
            url: "index.html"
          },
          {
            title: "Unicode",
            url: "unicode.html"
          }
        ]
      }
    })

    return distDir

  } catch (error) {
    // Si hay un error, limpiamos los directorios y relanzamos el error
    await fs.promises.rm(tempDir, { recursive: true, force: true })
    throw error
  }
}