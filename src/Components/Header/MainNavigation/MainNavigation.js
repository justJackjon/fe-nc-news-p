import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import Footer from '../../Footer/Footer';
import './MainNavigation.css';
import Links from '../../Navigation/NavigationLinks';

const MainNavigation = ({ toggleDrawer }) => {
  const handleClick = event => {
    toggleDrawer(event);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="main-navigation">
      <h2>
        <Icon icon="compass" />
        NAVIGATION
      </h2>
      <ul onClick={handleClick}>{Links}</ul>
      <Footer displayLocation="main-navigation" />
    </div>
  );
};

export default MainNavigation;
