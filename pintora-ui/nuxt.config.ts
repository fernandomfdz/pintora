// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from "@tailwindcss/vite";
import {fileURLToPath} from 'url';

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [],
  alias: {
    "@pintora-shared/": fileURLToPath(new URL('../pintora-shared/', import.meta.url)),
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  components: {
    dirs: [
      {
        path: '../pintora-shared/components/ui',
        prefix: '',
        global: true
      }
    ]
  },

  css: ['~/assets/css/tailwind.css'],

  build: {
    transpile: ['@pintora/shared']
  },

  compatibilityDate: '2025-03-07',
})