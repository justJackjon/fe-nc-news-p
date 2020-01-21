import React, { useContext, useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Link } from '@reach/router';

import { UserSettingsContext } from '../../Context/UserSettingsProvider';
import Footer from '../../Footer/Footer';
import Links from '../../Navigation/NavigationLinks';
import Modal from '../../Modals/Modal';
import Button from '../../Controls/Buttons/Button';

import './MainNavigation.css';

const MainNavigation = ({ toggleDrawer }) => {
  const {
    loggedInUser: user,
    loggedIn,
    actions: { logInDefaultUser, logOut }
  } = useContext(UserSettingsContext);
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const goBack = () => {
    setOpenModal(false);
    toggleDrawer(true);
  };

  const closeAndLogIn = () => {
    setOpenModal(false);
    logInDefaultUser();
  };

  const closeAndLogOut = () => {
    setOpenModal(false);
    logOut();
  };

  const handleClick = event => {
    toggleDrawer(event);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const logInModalContent = (
    <>
      <h1>Welcome to NCNews</h1>
      <p>
        As this application is for portfolio purposes only, it is recommended
        that you login as the default user.
      </p>
      <h3>Would you like to login as the default user?</h3>
      <Button className="btn-accept btn-lg" onClick={closeAndLogIn}>
        LOGIN
      </Button>
    </>
  );

  const logOutModalContent = (
    <>
      <h1>Thank you for using NCNews!</h1>
      <p>Questions or comments? Email support@redrobincreative.com</p>
      <h3>Would you like to log out?</h3>
      <Button className="btn-accept btn-lg" onClick={closeAndLogOut}>
        LOG OUT
      </Button>
    </>
  );

  const logInOutButton = loggedIn ? (
    <li key="log out" onClick={handleOpen}>
      <Icon icon="sign-out-alt" />
      Log Out
    </li>
  ) : (
    <li key="log in" onClick={handleOpen}>
      <Icon icon="sign-in-alt" />
      Login / Sign Up
    </li>
  );

  return (
    <>
      {openModal && (
        <Modal className="modal-sm modal-vw welcome-login-modal">
          <Icon icon="info-circle" size="3x" />
          {loggedIn ? logOutModalContent : logInModalContent}
          <Button className="btn-solid btn-lg" onClick={goBack}>
            GO BACK
          </Button>
        </Modal>
      )}
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
