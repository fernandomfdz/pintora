import { createHighlighter, type Highlighter, type BundledTheme } from 'shiki'

let highlighter: Highlighter | null = null

export const themes = [
  'github-dark',
  'github-light',
  'nord',
  'solarized-light'
] satisfies BundledTheme[]

export type Theme = typeof themes[number]

export const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'github-light'
  return document.documentElement.classList.contains('dark') ? 'github-dark' : 'github-light'
}

export const initializeHighlighter = async () => {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: [...themes],
      langs: ['css']
    })
  }
  return highlighter
}

export const getThemes = () => themes

export const highlight = async (code: string, options: { lang?: string; theme?: Theme }) => {
  const instance = await initializeHighlighter()
  if (!instance) throw new Error('No se pudo inicializar el resaltador')
  
  return instance.codeToHtml(code, {
    lang: options.lang || 'css',
    theme: options.theme || getSystemTheme()
  })
} 