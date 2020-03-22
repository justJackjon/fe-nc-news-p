import React from 'react';
import ncnewsLogo from '../../assets/global/images/ncnewslogo-rb.svg';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import './Footer.css';

const Footer = ({ displayLocation }) => {
  const iconSize = displayLocation === 'main-navigation' ? '2x' : 'lg';
  return (
    <footer className={`${displayLocation}-footer`}>
      <img className="ncnews-footer-logo" src={ncnewsLogo} alt="NCNews Logo" />
      <h3>- A Project by justJackjon</h3>
      <div className={`${displayLocation}-footer-icons`}>
        <hr className={`${displayLocation}-icons-hr`} />
        <a
          href="https://github.com/justJackjon"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon
            className="github-footer-icon"
            icon={['fab', 'github']}
            size={iconSize}
          />
        </a>
        <a
          href="https://uk.linkedin.com/in/jackjonbutcher"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon
            className="github-footer-icon"
            icon={['fab', 'linkedin']}
            size={iconSize}
          />
        </a>
        <hr className={`${displayLocation}-icons-hr`} />
      </div>
      <h4>
        Created for educational purposes at:
        <p className="northcoders">NORTHCODERS</p>
      </h4>
    </footer>
  );
};

export default Footer;
