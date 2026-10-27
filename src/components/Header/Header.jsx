import { Link, useLocation } from "react-router-dom"; // Added useLocation for automatic route checking
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({
  isLoggedIn,
  userName,
  onSignInClick,
  onLogoutClick,
}) {
  const location = useLocation();
  
  // Automatically evaluate theme status by current path constraint
  const isSavedNewsRoute = location.pathname === "/saved-news";
  const theme = isSavedNewsRoute ? "light" : "dark";
  const isLight = theme === "light";
  
  /* FIXED: Kept clean strict BEM double-hyphen (--) modifier conventions */
  const headerModifier = isLight ? " header--theme-light" : "";
  const logoModifier = isLight ? " header__logo--theme-light" : "";

  return (
    <header className={`header${headerModifier}`}>
      <Link to="/" className={`header__logo${logoModifier}`}>
        NewsExplorer
      </Link>

      <Navigation
        isLoggedIn={isLoggedIn}
        userName={userName}
        onSignInClick={onSignInClick}
        onLogoutClick={onLogoutClick}
        theme={theme}
      />
    </header>
  );
}

export default Header;
