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
  const headerModifier = isLight ? " header_theme_light" : "";
  const logoModifier = isLight ? " header__logo_theme_light" : "";

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
