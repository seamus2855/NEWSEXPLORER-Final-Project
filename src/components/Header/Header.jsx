import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({ isLoggedIn, userName, onSignInClick, onLogoutClick }) {
  return (
    <header className="header">
      {/* Logo points back to the homepage */}
      <Link to="/" className="header__logo">
        NewsExplorer
      </Link>
      
      {/* Extracted navigation options */}
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
