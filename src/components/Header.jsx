import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation"; // Adjust path as needed
import "./Header.css";

function Header({ isLoggedIn, userName, onSignInClick, onLogoutClick }) {
  return (
    <header className="header">
      {/* Logo still stays inside the Header layout */}
      <Link to="/" className="header__logo">
        NewsExplorer
      </Link>

      {/* Render the extracted Navigation component */}
      <Navigation 
        isLoggedIn={isLoggedIn}
        userName={userName}
        onSignInClick={onSignInClick}
        onLogoutClick={onLogoutClick}
      />
    </header>
  );
}

export default Header;
