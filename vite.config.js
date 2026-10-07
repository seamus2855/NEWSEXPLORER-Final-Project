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
export default defineConfig(() => {
  return {
    plugins: [react()],

    // FIX: Hand over the configured interception logger engine to the bundler
    customLogger: logger,

    /* 
       FIXED: Standardized the base path across all environments. 
       This ensures that your local preview and your GitHub Pages deployment 
       look for files in the exact same directory mapping.
    */
    base: "/NEWSEXPLORER-Final-Project/",
  };
});
