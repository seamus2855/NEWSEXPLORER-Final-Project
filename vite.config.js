import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => {
  return {
    plugins: [react()],

    build: {
      // Passes configuration settings down to the underlying Rolldown engine
      rolldownOptions: {
        checks: {
          bundlerTimings: false, // 👈 Disables the terminal [PLUGIN_TIMINGS] output report
        },
      },
    },

    // Uses absolute root paths '/' for local dev 'serve' AND local production 'preview'
    // Uses the custom subfolder route string exclusively for the final production build
    base:
      command === "serve" || isPreview ? "/" : "/NEWSEXPLORER-Final-Project/",
  };
});
