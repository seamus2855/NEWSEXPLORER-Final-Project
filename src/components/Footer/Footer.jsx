import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; {currentYear} Supersite, Powered by News API
      </p>
      
      <div className="footer__navigation">
        {/* Text links list */}
        <ul className="footer__links">
          <li className="footer__list-item">
            <Link to="/" className="footer__link">
              Home
            </Link>
          </li>
          <li className="footer__list-item">
            <a 
              href="https://tripleten.com" 
              className="footer__link" 
              target="_blank" 
              rel="noreferrer"
            >
              TripleTen
            </a>
          </li>
        </ul>

        {/* Social icon links list */}
        <ul className="footer__social-icons">
          <li className="footer__list-item">
            <a 
              href="https://github.com" 
              className="footer__icon-link" 
              target="_blank" 
              rel="noreferrer"
            >
              {/* Fixed: Replaced undefined variable reference with static public asset paths */}
              <img 
                src="/images/github.svg" 
                alt="GitHub icon profile" 
                className="footer__social-icon" 
              />
            </a>
          </li>
          <li className="footer__list-item">
            <a 
              href="https://facebook.com" 
              className="footer__icon-link" 
              target="_blank" 
              rel="noreferrer"
            >
              {/* Fixed: Replaced undefined variable reference with static public asset paths */}
              <img 
                src="/images/facebook.svg" 
                alt="Facebook icon page" 
                className="footer__social-icon" 
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
