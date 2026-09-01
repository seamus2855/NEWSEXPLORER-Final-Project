import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css"; // Create a new CSS file for navigation styles if needed

function Navigation({ isLoggedIn, userName, onSignInClick, onLogoutClick }) {
  return (
    <nav className="navigation">
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
