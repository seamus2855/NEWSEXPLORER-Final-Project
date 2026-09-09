import { createContext, useState, useEffect } from "react";
import * as auth from "../utils/auth"; // Adjust path to your auth.js file

// 1. Export the raw context directly so our hook file can read it
export const HasAuthContext = createContext(null);

export function AuthProvider({ children }) {
  const hasToken = localStorage.getItem("jwt") !== null;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(hasToken);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
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
