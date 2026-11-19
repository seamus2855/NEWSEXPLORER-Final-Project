import { defineConfig, createLogger } from "vite";
import react from "@vitejs/plugin-react";

const logger = createLogger();
const originalWarn = logger.warn.bind(logger);

// Safely suppress specific build and environment warning logs
logger.warn = (msg, options) => {
  if (msg.includes("PLUGIN_TIMINGS") || msg.includes("vite:prepare-out-dir")) {
    return;
  }
  originalWarn(msg, options);
};

// https://vite.dev
export default defineConfig(() => {
  return {
    plugins: [react()],
    customLogger: logger,
    base: "/NEWSEXPLORER-Final-Project/",
  };
});
