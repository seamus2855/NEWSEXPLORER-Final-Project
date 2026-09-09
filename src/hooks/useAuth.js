import { useContext } from "react";
import { HasAuthContext } from "../contexts/HasAuthContext"; // 👈 FIX: Points directly to the file in the same folder



export function useAuth() {
  const context = useContext(HasAuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
