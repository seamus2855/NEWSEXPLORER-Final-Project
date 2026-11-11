import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navigation.css";

// IMPORTED ASSETS: Matched strictly to your updated src/images folder contents
import logoutBlack from "../../images/logout-black.svg";
import logoutWhite from "../../images/logout-white.svg";
import burgerIcon from "../../images/burger.svg"; 
import closeWhite from "../../images/close-white.svg";
import closeBlack from "../../images/close.svg"; // Pointing to your newly added close.svg

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

  const navThemeMod = isSavedNews ? " navigation--theme-light" : "";
  const navMobileMod = isMobileMenuOpen ? " navigation--opened" : "";
  const menuBtnThemeMod = isSavedNews ? " navigation__menu-btn--theme-light" : "";
  const menuBtnCloseMod = isMobileMenuOpen ? " navigation__menu-btn--close" : "";
  const linkThemeMod = isSavedNews ? " navigation__link--theme-light" : "";
  const btnThemeMod = isSavedNews ? " navigation__btn--theme-light" : "";

  // Dynamic asset rendering logic for the menu / close icon button
  const getMenuIcon = () => {
    if (isMobileMenuOpen) {
      return isSavedNews ? closeBlack : closeWhite;
    }
    return burgerIcon;
  };

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
      <button
        type="button"
        className={`navigation__menu-btn${menuBtnThemeMod}${menuBtnCloseMod}`}
        style={{ backgroundImage: `url(${getMenuIcon()})` }}
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      />
      
      {isMobileMenuOpen && (
        <div className="navigation__overlay" onClick={closeMobileMenu} aria-hidden="true" />
      )}

      <nav className={`navigation${navThemeMod}${navMobileMod}`}>
        <NavLink
          to="/"
          onClick={closeMobileMenu}
          className={({ isActive }) => {
            const activeMod = isActive ? " navigation__link--active" : "";
            const activeLightMod = (isActive && isSavedNews) ? " navigation__link--active-light" : "";
            return `navigation__link${linkThemeMod}${activeMod}${activeLightMod}`;
          }}
        >
          Home
        </NavLink>

        {isLoggedIn ? (
          <>
            <NavLink
              to="/saved-news"
              onClick={closeMobileMenu}
              className={({ isActive }) => {
                const activeMod = isActive ? " navigation__link--active" : "";
                const activeLightMod = (isActive && isSavedNews) ? " navigation__link--active-light" : "";
                return `navigation__link${linkThemeMod}${activeMod}${activeLightMod}`;
              }}
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
                src={isSavedNews && !isMobileMenuOpen ? logoutBlack : logoutWhite}
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
