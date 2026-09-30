import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev
export default defineConfig(({ command, isPreview }) => {
  return {
    plugins: [react()],
    
    // Intercepts and filters out the specific bundler performance text alert
    customLogger: {
      warn(msg, options) {
        if (msg.includes("PLUGIN_TIMINGS") || msg.includes("vite:prepare-out-dir")) {
          return; // 👈 Quietly skip printing this warning message
        }
        console.warn(msg);
      },
      info: (msg) => console.log(msg),
      error: (msg) => console.error(msg),
    },

    // Handles pathing for local servers and GitHub Pages deployment
    base: (command === "serve" || isPreview) ? "/" : "/NEWSEXPLORER-Final-Project/",
  };
});
