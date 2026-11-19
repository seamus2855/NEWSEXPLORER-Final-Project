import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import "./index.css";

const root = createRoot(document.getElementById("root"));

// Vite natively populates import.meta.env, so optional chaining isn't strictly necessary.
// This ensures a clean fallback string for standard builds.
const baseName = import.meta.env.BASE_URL || "/";

root.render(
  <StrictMode>
    <BrowserRouter basename={baseName}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
