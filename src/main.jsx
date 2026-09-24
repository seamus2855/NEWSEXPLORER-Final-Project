import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; // 👈 Fixed: Direct import required for React 19
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx"; 
import "./index.css";

// 👈 Fixed: Using direct createRoot syntax
const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    {/* Added the basename attribute here */}
    <BrowserRouter basename="/NEWSEXPLORER-Final-Project">
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
