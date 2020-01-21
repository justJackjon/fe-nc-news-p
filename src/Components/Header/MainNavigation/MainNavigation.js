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
  const { loggedInUser: user, loggedIn, logInDefaultUser, logOut } = useContext(
    UserSettingsContext
  );
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleClick = event => {
    toggleDrawer(event);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {openModal && (
        <Modal className="modal-sm modal-vw welcome-login-modal">
          <Icon icon="info-circle" size="3x" />
          <h1>Welcome to NCNews</h1>
          <p>
            As this application is for portfolio purposes only, it is
            recommended that you login as the default user.
          </p>
          <h3>Would you like to login as the default user?</h3>
          <Button className="btn-accept btn-lg" onClick={logInDefaultUser}>
            LOGIN
          </Button>
          <Button className="btn-solid btn-lg" onClick={handleClose}>
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
          <li key="sign in">
            <Link to="/" onClick={handleOpen}>
              <Icon icon="sign-in-alt" />
              Login / Sign Up
            </Link>
          </li>
        </ul>
        <Footer displayLocation="main-navigation" />
      </div>
    </>
  );
};

export default MainNavigation;
