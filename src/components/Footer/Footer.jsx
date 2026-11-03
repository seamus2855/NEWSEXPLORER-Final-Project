import { Link } from "react-router-dom";
import "./Footer.css";

// IMPORT ICONS DIRECTLY FROM THE SRC/IMAGES DIRECTORY
import githubIcon from "../images/github.svg";
import facebookIcon from "../images/facebook.svg";

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
          <li className="footer__item">
            <Link to="/" className="footer__link">
              Home
            </Link>
          </li>
          <li className="footer__item">
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
        <ul className="footer__social">
          <li className="footer__item">
            <a
              href="https://github.com"
              className="footer__link"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={githubIcon}
                alt="GitHub icon profile"
                className="footer__icon"
              />
            </a>
          </li>
          <li className="footer__item">
            <a
              href="https://facebook.com"
              className="footer__link"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={facebookIcon}
                alt="Facebook icon page"
                className="footer__icon"
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
