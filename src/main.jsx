import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx"; 
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
