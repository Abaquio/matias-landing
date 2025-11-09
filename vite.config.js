import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  base: "/matias-landing/",          // 👈 nombre EXACTO del repo
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  build: {
    outDir: "docs",                   // 👈 GitHub Pages leerá /docs
    emptyOutDir: true,
  },
})