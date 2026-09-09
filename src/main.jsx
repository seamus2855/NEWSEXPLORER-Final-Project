import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx"; // 🍏 FIX: Import your unified context wrapper
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* 🍏 FIX: Wrap App so context hooks are accessible globally */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
