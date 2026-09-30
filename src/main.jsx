import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import "./index.css";

// Check if Vite is running in production mode
const isProduction = import.meta.env.MODE === "production";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    {/* Dynamically sets basename based on your environment */}
    <BrowserRouter
      basename={isProduction ? "/NEWSEXPLORER-Final-Project" : "/"}
    >
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
