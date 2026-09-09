import { createContext, useContext, useState, useEffect } from "react";
import * as auth from "../utils/auth"; // Adjust path to your auth.js file

const HasAuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Check token presence immediately to establish initial state constraints
  const hasToken = localStorage.getItem("jwt") !== null;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // 👈 FIX: If no token exists, isLoading is false on mount. No cascading renders.
  const [isLoading, setIsLoading] = useState(hasToken);

  // Check token on initial app load
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    
    // 👈 FIX: Safely exit early if no token exists.
    if (!token) return; 

    auth.checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Token validation failed:", err);
        localStorage.removeItem("jwt");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("jwt", token);
    setCurrentUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  return (
    <HasAuthContext.Provider value={{ isLoggedIn, currentUser, isLoading, login, logout, setCurrentUser }}>
      {children}
    </HasAuthContext.Provider>
  );
}

// Custom hook to consume the auth context easily
export function useAuth() {
  const context = useContext(HasAuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
