// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from 'url';
import path from 'path'
import fs from 'fs'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/supabase'],
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

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
    // Opciones del módulo
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/confirm',
      include: ['/app/*'],
      exclude: ['/profile/*'],
      cookieRedirect: true,
    }
  },
})