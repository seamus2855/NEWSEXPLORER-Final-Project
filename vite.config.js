import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev
export default defineConfig(({ command, isPreview }) => {
  return {
    plugins: [react()],
    
    build: {
      // Directs the bundler to ignore warning logs that clutter the terminal
      logFilter: {
        warn(msg) {
          if (msg.includes("PLUGIN_TIMINGS") || msg.includes("vite:prepare-out-dir")) {
            return false; // 👈 Tells Vite to suppress this specific message safely
          }
          return true;
        }
      }
    },

    // Handles pathing seamlessly for dev servers, production previews, and GitHub Pages
    base: (command === "serve" || isPreview) ? "/" : "/NEWSEXPLORER-Final-Project/",
  };
});
