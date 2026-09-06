import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isLoggedIn, userName, onSignInClick, onLogoutClick }) {
  const location = useLocation();
  
  // Determine if the current page is the saved articles route
  const isSavedNews = location.pathname === "/saved-news";
  
  // Set theme modifier suffixes cleanly
  const themeClass = isSavedNews ? "navigation_theme_light" : "";

  return (
    <nav className={`navigation ${themeClass}`}>
      {/* Home link always visible */}
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          `navigation__link ${isActive ? "navigation__link_active" : ""}`
        }
      >
        Home
      </NavLink>

      {isLoggedIn ? (
        <>
          {/* Saved articles link only shows if logged in */}
          <NavLink 
            to="/saved-news" 
            className={({ isActive }) => 
              `navigation__link ${isActive ? "navigation__link_active" : ""}`
            }
          >
            Saved articles
          </NavLink>

          <button 
            type="button" 
            className="navigation__logout-btn" 
            onClick={onLogoutClick}
          >
            {userName}
            <span className="navigation__logout-icon"></span>
          </button>
        </>
      ) : (
        <button 
          type="button" 
          className="navigation__signin-btn" 
          onClick={onSignInClick}
        >
          Sign in
        </button>
      )}
    </nav>
  );
}

export default Navigation;
