import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    // If running 'npm run dev', use the local root slash '/'.
    // If running 'npm run build', use the subfolder route for GitHub Pages.
    base: command === "serve" ? "/" : "/NEWSEXPLORER-Final-Project/",
  };
});
