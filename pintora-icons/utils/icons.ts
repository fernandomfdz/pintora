import type { IconMetadata } from '@/types/icon'

const adjectives = [
  'awesome', 'cool', 'epic', 'fancy', 'great',
  'happy', 'iconic', 'jolly', 'keen', 'lovely',
  'mighty', 'nice', 'optimal', 'perfect', 'quick',
  'rad', 'super', 'trendy', 'unique', 'vivid',
  'wild', 'xtra', 'yummy', 'zen'
]

const nouns = [
  'arrow', 'badge', 'circle', 'diamond', 'eye',
  'flag', 'gear', 'heart', 'icon', 'jewel',
  'key', 'leaf', 'moon', 'note', 'orb',
  'pin', 'quad', 'ring', 'star', 'tag',
  'wave', 'xmark', 'yield', 'zone'
]

export const generateRandomIconName = (): string => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  return `${adjective}-${noun}`
}

export const generateSvgString = (icon: IconMetadata): string => {
  const svgAttrs = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '100%',
    height: '100%',
    viewBox: icon.viewBox || '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': icon.strokeWidth || '2'
  }

  const svgAttrsString = Object.entries(svgAttrs)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ')

  const elementsString = icon.elements
    ?.map(element => {
      const attrs = Object.entries(element.attributes)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ')
      
      if (element.content) {
        return `<${element.type} ${attrs}>${element.content}</${element.type}>`
      }
      return `<${element.type} ${attrs}/>`
    })
    .join('\n  ') || ''

  return `<svg ${svgAttrsString}>\n  ${elementsString}\n</svg>`
} 