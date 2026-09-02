import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import githubIcon from "../../images/github.svg"; // Adjust file paths as needed
import facebookIcon from "../../images/facebook.svg";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright">
        © {currentYear} Supersite, Powered by News API
      </p>
      
      <div className="footer__navigation">
        {/* Text links list */}
        <ul className="footer__links">
          <li>
            <Link to="/" className="footer__link">
              Home
            </Link>
          </li>
          <li>
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
          <li>
            <a 
              href="https://github.com" 
              className="footer__icon" 
              target="_blank" 
              rel="noreferrer"
            >
              <img src={githubIcon} alt="GitHub icon profile" />
            </a>
          </li>
          <li>
            <a 
              href="https://facebook.com" 
              className="footer__icon" 
              target="_blank" 
              rel="noreferrer"
            >
              <img src={facebookIcon} alt="Facebook icon page" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
