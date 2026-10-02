import { defineConfig, createLogger } from "vite";
import react from "@vitejs/plugin-react";

// FIX: Initialize the native Vite logger instance to intercept terminal warning logs cleanly
const logger = createLogger();
const originalWarn = logger.warn;

// FIX: Overwrite the standard logger warning emitter with your custom filter logic
logger.warn = (msg, options) => {
  if (msg.includes("PLUGIN_TIMINGS") || msg.includes("vite:prepare-out-dir")) {
    return; // Suppresses this specific log message safely
  }
  originalWarn(msg, options); // Permits all other system messages to print normally
};

// https://vite.dev
export default defineConfig(({ command, isPreview }) => {
  return {
    plugins: [react()],
    
    // FIX: Hand over the configured interception logger engine to the bundler
    customLogger: logger,

    // Handles pathing seamlessly for dev servers, production previews, and GitHub Pages
    base: (command === "serve" || isPreview) ? "/" : "/NEWSEXPLORER-Final-Project/",
  };
});
