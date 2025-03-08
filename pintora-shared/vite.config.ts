import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [vue(), cssInjectedByJsPlugin()],
  resolve: {
    alias: {
      "@/": new URL("./", import.meta.url).pathname,
      "@pintora-shared": new URL("./", import.meta.url).pathname,
    },
  },

  build: {
    cssCodeSplit: true,
    target: "esnext",
    lib: {
      entry: path.resolve(__dirname, "index.ts"),
      name: "GithubPackagesUiLibrary",
      fileName: (format) => `pintora-shared.${format}.js`,
    },

    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
