import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => {
  return {
    plugins: [react()],
    // Use root '/' for local dev 'serve' AND local production 'preview'
    // Only use the GitHub Pages subfolder string for the deployment build step
    base: (command === "serve" || isPreview) ? "/" : "/NEWSEXPLORER-Final-Project/",
  };
});
