import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/postcss";
import { defineConfig } from "vite";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: { alias: { "@": root } },
  css: { postcss: { plugins: [tailwindcss()] } },
  build: {
    outDir: "../catalogo-preview",
    emptyOutDir: true,
    sourcemap: false,
  },
});
