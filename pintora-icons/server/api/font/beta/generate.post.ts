import { Buffer } from 'buffer'
import ttf2woff2 from 'ttf2woff2'
import * as opentype from 'opentype.js'
import svg2ttf from 'svg2ttf'
import JSZip from 'jszip'
import type { Icon } from '@/types/icon'
import { generateSvgFont } from '@/server/utils/svg-to-font'
import { SVGIcons2SVGFontStream } from 'svgicons2svgfont'
import { Readable } from 'stream'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { icons, format } = body as { icons: Icon[], format: 'svg' | 'font' }

    // Transformar los iconos al formato esperado por generateSvgFont
    const preparedIcons = icons.map(icon => ({
      metadata: icon,
      contents: generateSvgString(icon)
    }))

    // 1. Generar SVG Font
    const svgFont = await generateSvgFont(preparedIcons)

    // Si solo quieren SVG, devolver directamente
    if (format === 'svg') {
      setHeader(event, 'Content-Type', 'image/svg+xml')
      setHeader(event, 'Content-Disposition', 'attachment; filename=icons.svg')
      return svgFont
    }

    // 2. Convertir SVG a TTF
    const ttf = svg2ttf(svgFont, {})
    const ttfBuffer = Buffer.from(ttf.buffer)
    
    // 3. Convertir TTF a WOFF2
    const woff2Buffer = ttf2woff2(ttfBuffer)
    
    // 4. Convertir TTF a OTF usando opentype.js
    const ttfArrayBuffer = ttfBuffer.buffer.slice(
      ttfBuffer.byteOffset,
      ttfBuffer.byteOffset + ttfBuffer.byteLength
    )
    const ttfFont = opentype.parse(ttfArrayBuffer)
    const otfBuffer = ttfFont.toArrayBuffer()

    // 5. Generar CSS
    const css = generateCss(icons)

    // 5.1 Generar HTML de demostración
    const html = generateHtml(icons)

    // 6. Crear ZIP con todos los formatos
    const zip = new JSZip()
    
    // Agregar fuentes
    const fontsDir = zip.folder('fonts')
    if (fontsDir) {
      fontsDir.file('icons.svg', svgFont)
      fontsDir.file('icons.ttf', ttfBuffer)
      fontsDir.file('icons.woff2', woff2Buffer)
      fontsDir.file('icons.otf', otfBuffer)
    }

    // Agregar CSS y HTML
    zip.file('icons.css', css)
    zip.file('index.html', html)

    // 7. Generar el archivo ZIP
    const zipBlob = await zip.generateAsync({ type: 'nodebuffer' })

    // 8. Configurar los headers para la descarga
    setHeader(event, 'Content-Type', 'application/zip')
    setHeader(event, 'Content-Disposition', 'attachment; filename=icons-font.zip')

    // 9. Devolver el archivo ZIP
    return zipBlob

  } catch (error: any) {
    console.error('Error en la generación de fuente:', error)
    throw createError({
      statusCode: 500,
      message: error.message || 'Error al generar las fuentes',
      data: {
        context: 'generación de fuente',
        details: error.stack
      }
    })
  }
})

function generateCss(icons: IconMetadata[]): string {
  const iconClasses = icons.map((icon, index) => {
    const unicode = String.fromCharCode(0xE000 + index)
    return `.icon-${icon.name}::before {
  content: '\\${unicode.charCodeAt(0).toString(16)}';
}`
  }).join('\n\n')

  return `/* Pintora Icons */

@font-face {
  font-family: 'PintoraIcons';
  src: url('fonts/icons.woff2') format('woff2'),
       url('fonts/icons.ttf') format('truetype'),
       url('fonts/icons.otf') format('opentype'),
       url('fonts/icons.svg#icons') format('svg');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

[class^="icon-"]::before,
[class*=" icon-"]::before {
  font-family: 'PintoraIcons' !important;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: "liga";
  display: inline-block;
  width: 1em;
  height: 1em;
  font-size: 24px;
}

${iconClasses}`
}

function generateHtml(icons: IconMetadata[]): string {
  const iconsList = icons.map(icon => `
    <div class="icon-demo">
      <i class="icon-${icon.name}"></i>
      <div class="icon-info">
        <code>.icon-${icon.name}</code>
        <span class="unicode">\\${(0xE000 + icons.indexOf(icon)).toString(16)}</span>
      </div>
    </div>`
  ).join('\n')

  return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pintora Icons - Demostración</title>
    <link rel="stylesheet" href="icons.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
            color: #333;
        }

        h1 {
            margin-bottom: 2rem;
            color: #2563eb;
        }

        .icons-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
        }

        .icon-demo {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1rem;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            transition: all 0.2s;
        }

        .icon-demo:hover {
            border-color: #2563eb;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }

        .icon-demo i {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: #1f2937;
        }

        .icon-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            text-align: center;
        }

        code {
            background: #f3f4f6;
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-size: 0.875rem;
            color: #2563eb;
        }

        .unicode {
            font-size: 0.75rem;
            color: #6b7280;
        }

        .usage {
            margin: 2rem 0;
            padding: 1.5rem;
            background: #f8fafc;
            border-radius: 0.5rem;
        }

        .usage h2 {
            margin-bottom: 1rem;
            font-size: 1.25rem;
        }

        pre {
            background: #1f2937;
            color: #e5e7eb;
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <h1>Pintora Icons</h1>

    <div class="usage">
        <h2>Cómo usar</h2>
        <pre><code><!-- Incluir el CSS -->
&lt;link rel="stylesheet" href="icons.css"&gt;

<!-- Usar un icono -->
&lt;i class="icon-nombre-del-icono"&gt;&lt;/i&gt;</code></pre>
    </div>

    <div class="icons-grid">
        ${iconsList}
    </div>
</body>
</html>`
}

function generateSvgString(icon: IconMetadata): string {
  return icon.svg;
} 