import React from 'react';
import ncnewsLogo from '../../ncnewslogo-rb.svg';
import ncnLogo from '../../ncnlogo-rb.svg';
import { MainConsumer } from '../Context/MainProvider';
import SearchBar from './SearchBar';
import HeaderControls from './HeaderControls/HeaderControls';
import './Header.css';

const Header = () => {
  return (
    <MainConsumer>
      {({ windowWidth }) => (
        <header className="main-header">
          <img
            src={windowWidth <= 480 ? ncnLogo : ncnewsLogo}
            className="header-logo"
            alt="NCNews Logo"
          />
          <SearchBar />
          <HeaderControls />
        </header>
      )}
    </MainConsumer>
  );
};

export default Header;
