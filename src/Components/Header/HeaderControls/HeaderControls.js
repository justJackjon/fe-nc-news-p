import React, { createRef } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import MainNavigation from '../MainNavigation/MainNavigation';
import './HeaderControls.css';

const drawerControl = createRef();

const HeaderControls = () => {
  return (
    <form className="main-header-controls">
      <label className="toggle-switch">
        <input type="checkbox" id="toggleDark" aria-label="Toggle Dark Mode" />
        <span className="slider"></span>
      </label>
      <label className="hambuger-menu">
        <Icon icon="bars" size="lg" className="hambuger-icon" />
        <input
          type="checkbox"
          ref={drawerControl}
          id="toggleDrawer"
          aria-label="Toggle Main Menu"
        />
        <MainNavigation drawerControl={drawerControl} />
      </label>
    </form>
  );
};

export default HeaderControls;
