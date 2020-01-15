import React, { useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import MainNavigation from '../MainNavigation/MainNavigation';
import './HeaderControls.css';

const HeaderControls = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = event => {
    setOpen(event.target.checked || false);
  };

  return (
    <form className="main-header-controls">
      <label className="toggle-switch">
        <input type="checkbox" id="toggleDark" aria-label="Toggle Dark Mode" />
        <span className="slider"></span>
      </label>
      <label className="hambuger-menu">
        <Icon
          icon={open ? 'times' : 'bars'}
          size="lg"
          className="hambuger-icon"
        />
        <input
          type="checkbox"
          id="toggleDrawer"
          aria-label="Toggle Main Menu"
          checked={open}
          onChange={toggleDrawer}
        />
        <MainNavigation toggleDrawer={toggleDrawer} />
      </label>
    </form>
  );
};

export default HeaderControls;
