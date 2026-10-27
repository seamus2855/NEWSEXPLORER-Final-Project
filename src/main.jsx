import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import "./index.css";

const root = createRoot(document.getElementById("root"));

// Safely access the base URL with an optional chaining fallback to prevent runtime crashes
const baseName = import.meta.env?.BASE_URL || "/";

root.render(
  <StrictMode>
    <BrowserRouter basename={baseName}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
