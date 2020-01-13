import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MainNavigation from '../MainNavigation/MainNavigation';
import './HeaderControls.css';

const HeaderControls = () => {
  return (
    <form className="main-header-controls">
      <label className="toggle-switch">
        <input type="checkbox" id="toggleDark" aria-label="Toggle Dark Mode" />
        <span className="slider"></span>
      </label>
      <label className="hambuger-menu">
        <FontAwesomeIcon icon="bars" size="lg" className="hambuger-icon" />
        <input
          type="checkbox"
          id="toggleDrawer"
          aria-label="Toggle Main Menu"
        />
        <MainNavigation />
      </label>
    </form>
  );
};

export default HeaderControls;
