import React from 'react';
import { Link } from '@reach/router';

import { WindowConsumer } from '../Context/WindowProvider';
import ncnewsLogo from '../../ncnewslogo-rb.svg';
import ncnLogo from '../../ncnlogo-rb.svg';
import SearchBar from './SearchBar';
import HeaderControls from './HeaderControls/HeaderControls';

import './Header.css';

const Header = () => {
  return (
    <WindowConsumer>
      {({ windowWidth }) => (
        <header className="main-header">
          <Link to="/">
            <img
              src={windowWidth <= 480 ? ncnLogo : ncnewsLogo}
              className="header-logo"
              alt="NCNews Logo"
            />
          </Link>
          <SearchBar />
          <HeaderControls />
        </header>
      )}
    </WindowConsumer>
  );
};

export default Header;
