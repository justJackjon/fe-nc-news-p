import React from 'react';
import ncnewsLogo from '../../ncnewslogo-rb.svg';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="sidebar-footer">
      <img className="ncnews-footer-logo" src={ncnewsLogo} alt="NCNews Logo" />
      <h3>A Project by justJackjon</h3>
      <a
        href="https://github.com/justJackjon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className="footer-icon" icon={['fab', 'github']} size="lg" />
      </a>
      <h4>
        Created for educational purposes at{' '}
        <span class="northcoders">
          <span>N</span>ORTHCODERS
        </span>
      </h4>
    </footer>
  );
};

export default Footer;
