import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navigation.css";

function Navigation({
  isLoggedIn,
  userName,
  onSignInClick,
  onLogoutClick,
  theme,
}) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fallback to route inspection if theme prop is not explicitly passed
  const isSavedNews = theme ? theme === "light" : location.pathname === "/saved-news";
  const themeClass = isSavedNews ? "navigation_theme_light" : "";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSignIn = () => {
    closeMobileMenu();
    if (onSignInClick) onSignInClick();
  };

  const handleLogout = () => {
    closeMobileMenu();
    if (onLogoutClick) onLogoutClick();
  };

  return (
    <>
      {/* Mobile Hamburger / Close Button */}
      <button
        type="button"
        className={`navigation__menu-btn ${themeClass} ${
          isMobileMenuOpen ? "navigation__menu-btn_close" : ""
        }`}
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      />

      {/* Backdrop overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="navigation__overlay"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Main Navigation Container */}
      <nav
        className={`navigation ${themeClass} ${
          isMobileMenuOpen ? "navigation_mobile-open" : ""
        }`}
      >
        <NavLink
          to="/"
          onClick={closeMobileMenu}
          className={({ isActive }) =>
            `navigation__link ${isActive ? "navigation__link_active" : ""}`
          }
        >
          Home
        </NavLink>

        {isLoggedIn ? (
          <>
            <NavLink
              to="/saved-news"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `navigation__link ${isActive ? "navigation__link_active" : ""}`
              }
            >
              Saved articles
            </NavLink>

            <button
              type="button"
              className="navigation__logout-btn"
              onClick={handleLogout}
            >
              <span className="navigation__user-name">{userName}</span>
              <img
                src={
                  isSavedNews && !isMobileMenuOpen
                    ? "/images/logout-black.svg"
                    : "/images/logout-white.svg"
                }
                alt="Logout"
                className="navigation__logout-icon"
              />
            </button>
          </>
        ) : (
          <button
            type="button"
            className="navigation__signin-btn"
            onClick={handleSignIn}
          >
            Sign in
          </button>
        )}
      </nav>
    </>
  );
}

export default Navigation;
