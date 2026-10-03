import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({ isLoggedIn, userName, onSignInClick, onLogoutClick, theme }) {
  return (
    <header className={`header header_theme_${theme}`}>
      {/* Logo changes color based on active page route theme */}
      <Link to="/" className={`header__logo header__logo_theme_${theme}`}>
        NewsExplorer
      </Link>
      
      {/* Pass theme down so navigation links, buttons, and logout icons match */}
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
