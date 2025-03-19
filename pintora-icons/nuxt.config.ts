// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from "@tailwindcss/vite";
import {fileURLToPath} from 'url';

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
  ],
  alias: {
    "@pintora-shared/": fileURLToPath(new URL('../pintora-shared/', import.meta.url)),
  },
  nitro: {
    moduleSideEffects: ['svgicons2svgfont'],
    externals: {
      inline: ['svgicons2svgfont']
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: [
        'svgicons2svgfont',
        'ttf2woff2',
        'opentype.js',
        'svg2ttf',
        'jszip',
        'buffer'
      ],
      exclude: ['stream']
    },
    build: {
      rollupOptions: {
        external: ['stream'],
        output: {
          format: 'es',
          inlineDynamicImports: true
        }
      },
      commonjsOptions: {
        include: [/node_modules/],
        transformMixedEsModules: true,
        defaultIsModuleExports: true
      }
    },
    define: {
      'process.env.NODE_DEBUG': 'false',
      'global': 'globalThis'
    }
  },
  css: ['~/assets/css/tailwind.css'],

  compatibilityDate: '2025-03-07',
})