import type { IconMetadata } from '@/types/icon'

interface TemplateSettings {
  componentName?: string
  baseCss?: string
}

interface Templates {
  css: string
  html: string
}

export const generateTemplates = (
  icons: IconMetadata[],
  settings: TemplateSettings = {}
): Templates => {
  const {
    componentName = '.pintora-icon',
    baseCss = `:root {
  --icon-size: 24px;
}`
  } = settings

  // Generar CSS
  const css = generateCss(icons, componentName, baseCss)

  // Generar HTML
  const html = generateHtml(icons, componentName)

  return { css, html }
}

const generateCss = (
  icons: IconMetadata[],
  componentName: string,
  baseCss: string
): string => {
  const iconClasses = icons.map((icon, index) => {
    const unicode = 0xE000 + index
    return `${componentName}-${icon.name}::before {
  content: '\\${unicode.toString(16)}';
}`
  }).join('\n\n')

  return `/* Pintora Icons - Generado automáticamente */

${baseCss}

@font-face {
  font-family: 'pintora-icons';
  src: url('../fonts/icons.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

${componentName} {
  display: inline-block;
  width: var(--icon-size);
  height: var(--icon-size);
  font-family: 'pintora-icons';
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

${iconClasses}`
}

const generateHtml = (icons: IconMetadata[], componentName: string): string => {
  const iconList = icons.map(icon => `
    <div class="icon-item">
      <i class="${componentName.slice(1)}-${icon.name}"></i>
      <span class="icon-name">${icon.name}</span>
    </div>`
  ).join('')

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pintora Icons - Preview</title>
  <link rel="stylesheet" href="css/icons.css">
  <style>
    :root {
      --icon-size: 32px;
    }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 2rem;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 {
      margin-bottom: 2rem;
    }
    .icon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 1rem;
    }
    .icon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem;
      border: 1px solid #eee;
      border-radius: 0.5rem;
    }
    .icon-name {
      font-size: 0.875rem;
      color: #666;
    }
    @media (prefers-color-scheme: dark) {
      body {
        background: #1a1a1a;
        color: #fff;
      }
      .icon-item {
        border-color: #333;
      }
      .icon-name {
        color: #999;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Pintora Icons</h1>
    <div class="icon-grid">
      ${iconList}
    </div>
  </div>
</body>
</html>`
} 