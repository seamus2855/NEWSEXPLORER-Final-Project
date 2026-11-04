// src/components/ProtectedRoute/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  // If the user is not authenticated, redirect them to the home page securely
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the nested private route contents safely
  return children;
}

export default ProtectedRoute;
