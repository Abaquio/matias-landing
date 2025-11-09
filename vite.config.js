import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  base: "/matias-landing/",
  plugins: [react()],
  build: { outDir: "docs" },
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
})