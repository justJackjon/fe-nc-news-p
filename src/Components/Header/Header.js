import React, { createRef, useEffect } from 'react';
import { Link } from '@reach/router';

import { WindowConsumer } from '../Context/WindowProvider';
import ncnewsLogo from '../../ncnewslogo-rb.svg';
import ncnLogo from '../../ncnlogo-rb.svg';
import SearchBar from './SearchBar';
import HeaderControls from './HeaderControls/HeaderControls';

import './Header.css';

const mainHeader = createRef();

const Header = () => {
  const stickyHeader = () => {
    if (mainHeader.current) {
      document.body.scrollTop > 0 || document.documentElement.scrollTop > 0
        ? mainHeader.current.classList.add('main-header-onscroll')
        : mainHeader.current.classList.remove('main-header-onscroll');
    }
  };

  useEffect(() => window.addEventListener('scroll', stickyHeader), []);

  return (
    <WindowConsumer>
      {({ windowWidth }) => (
        <header ref={mainHeader} className="main-header-container">
          <div className="main-header">
            <Link to="/">
              <img
                src={windowWidth <= 480 ? ncnLogo : ncnewsLogo}
                className="header-logo"
                alt="NCNews Logo"
              />
            </Link>
            <SearchBar />
            <HeaderControls />
          </div>
        </header>
      )}
    </WindowConsumer>
  );
};

export default Header;
