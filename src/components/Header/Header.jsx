import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({
  isLoggedIn,
  userName,
  onSignInClick,
  onLogoutClick,
  theme = "dark",
}) {
  const isLight = theme === "light";
  
  /* FIXED: Rewritten to follow strict BEM double-hyphen (--) modifier conventions */
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
