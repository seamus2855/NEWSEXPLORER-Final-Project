import { Link } from "react-router-dom";
import "./Footer.css";

// FIXED: Reference images directly from the public/images directory via root-relative strings
// Since they reside in the public folder, Vite serves them from the root directly.
const githubIcon = "images/github.svg";
const facebookIcon = "images/facebook.svg";

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
              {" "}
              Home{" "}
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
