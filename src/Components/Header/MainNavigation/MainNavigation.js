import React, { useContext, useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Link } from '@reach/router';

import { UserSettingsContext } from '../../Context/UserSettingsProvider';
import Footer from '../../Footer/Footer';
import Links from '../../Navigation/NavigationLinks';
import Modal from '../../Modals/Modal';
import UserAuthModal from '../../Modals/UserAuthModal/UserAuthModal';
import Button from '../../Controls/Buttons/Button';

import './MainNavigation.css';

const MainNavigation = ({ toggleDrawer }) => {
  const {
    loggedIn,
    openAuthModal,
    actions: { setOpenAuthModal }
  } = useContext(UserSettingsContext);

  const handleClick = event => {
    toggleDrawer(event);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const logInOutButton = loggedIn ? (
    <li
      key="log out"
      onClick={event => setOpenAuthModal(true, 'MainNavigation', event)}
    >
      <Icon icon="sign-out-alt" />
      Log Out
    </li>
  ) : (
    <li
      key="log in"
      onClick={event => setOpenAuthModal(true, 'MainNavigation', event)}
    >
      <Icon icon="sign-in-alt" />
      Login / Sign Up
    </li>
  );

  return (
    <>
      {openAuthModal && <UserAuthModal toggleDrawer={toggleDrawer} />}
      <div className="main-navigation">
        <h2>
          <Icon icon="compass" />
          NAVIGATION
        </h2>
        <ul onClick={handleClick}>
          {Links}
          {logInOutButton}
        </ul>
        <Footer displayLocation="main-navigation" />
      </div>
    </>
  );
};

export default MainNavigation;
