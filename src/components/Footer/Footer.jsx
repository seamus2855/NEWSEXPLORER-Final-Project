import { Link } from "react-router-dom";
import "./Footer.css";

import githubIcon from "../../images/github.svg";
import linkedinIcon from "../../images/LinkedIn.svg";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; {currentYear} Supersite, Powered by News API
      </p>
      <div className="footer__navigation">
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
              href="https://linkedin.com"
              className="footer__link"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={linkedinIcon}
                alt="LinkedIn icon profile"
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
              <svg 
                className="footer__icon" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                xmlns="http://w3.org"
              >
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
