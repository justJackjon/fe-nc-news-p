import React from 'react';
import { Link } from '@reach/router';

import { MainConsumer } from '../Context/MainProvider';
import ncnewsLogo from '../../ncnewslogo-rb.svg';
import ncnLogo from '../../ncnlogo-rb.svg';
import SearchBar from './SearchBar';
import HeaderControls from './HeaderControls/HeaderControls';

import './Header.css';

const Header = () => {
  return (
    <MainConsumer>
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
    </MainConsumer>
  );
};

export default Header;
