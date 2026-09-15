import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/NEWSEXPLORER-Final-Project/", // 👈 Informs Vite where static paths are hosted on GitHub Pages
});
