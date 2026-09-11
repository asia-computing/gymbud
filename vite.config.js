import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  // Relative asset URLs, so one build works both at a custom domain and at the
  // GitHub Pages project path (/gymbud/).
  base: "./",
  // `styles/` is the design-system package, not a static folder to copy — it
  // is imported from `src/main.jsx` so Vite bundles and hashes it.
  publicDir: false,
  build: { outDir: "dist", emptyOutDir: true },
  // Honour PORT so the dev server can be placed on a free port.
  server: { port: Number(process.env.PORT) || 5173 },
})
