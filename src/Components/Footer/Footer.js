import React from 'react';
import ncnewsLogo from '../../ncnewslogo-rb.svg';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="sidebar-footer">
      <img className="ncnews-footer-logo" src={ncnewsLogo} alt="NCNews Logo" />
      <h3>- A Project by justJackjon</h3>
      <div className="footer-icons">
        <hr className="icons-horizontal-rule" />
        <a
          href="https://uk.linkedin.com/in/jackjonbutcher"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon
            className="github-footer-icon"
            icon={['fab', 'github']}
            size="lg"
          />
        </a>
        <a
          href="https://github.com/justJackjon"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon
            className="github-footer-icon"
            icon={['fab', 'linkedin']}
            size="lg"
          />
        </a>
        <hr className="icons-horizontal-rule" />
      </div>
      <h4>
        Created for educational purposes at:
        <p className="northcoders">NORTHCODERS</p>
      </h4>
    </footer>
  );
};

export default Footer;
