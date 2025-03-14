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
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  css: ['~/assets/css/tailwind.css'],

  compatibilityDate: '2025-03-07',
})