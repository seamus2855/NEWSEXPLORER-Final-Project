import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    {/* FIXED: Uses Vite's native string variable, falling back gracefully to your main directory root if undefined */}
    <BrowserRouter basename={import.meta.env.BASE_URL || "/"}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
