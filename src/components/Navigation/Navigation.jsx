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

  const isSavedNews = theme ? theme === "light" : location.pathname === "/saved-news";

  // BEM Modifier strings
  const navThemeMod = isSavedNews ? " navigation_theme_light" : "";
  const navMobileMod = isMobileMenuOpen ? " navigation_opened" : "";
  const menuBtnThemeMod = isSavedNews ? " navigation__menu-btn_theme_light" : "";
  const menuBtnCloseMod = isMobileMenuOpen ? " navigation__menu-btn_close" : "";
  const linkThemeMod = isSavedNews ? " navigation__link_theme_light" : "";
  const btnThemeMod = isSavedNews ? " navigation__btn_theme_light" : "";

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
        className={`navigation__menu-btn${menuBtnThemeMod}${menuBtnCloseMod}`}
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
      <nav className={`navigation${navThemeMod}${navMobileMod}`}>
        <NavLink
          to="/"
          onClick={closeMobileMenu}
          className={({ isActive }) =>
            `navigation__link${linkThemeMod}${isActive ? " navigation__link_active" : ""}${
              isActive && isSavedNews ? " navigation__link_active-light" : ""
            }`
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
                `navigation__link${linkThemeMod}${isActive ? " navigation__link_active" : ""}${
                  isActive && isSavedNews ? " navigation__link_active-light" : ""
                }`
              }
            >
              Saved articles
            </NavLink>

            <button
              type="button"
              className={`navigation__btn navigation__logout-btn${btnThemeMod}`}
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
            className={`navigation__btn navigation__signin-btn${btnThemeMod}`}
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
