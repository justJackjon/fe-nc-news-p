import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import { setOpenAuthModal } from '../../../actions/userActions';
import Footer from '../../Footer/Footer';
import Links from '../../Navigation/NavigationLinks';
import UserAuthModal from '../../Modals/UserAuthModal/UserAuthModal';

import './MainNavigation.css';

const MainNavigation = ({
  toggleDrawer,
  loggedIn,
  openAuthModal,
  dispatch
}) => {
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
      onClick={event =>
        dispatch(setOpenAuthModal(true, 'mainNavigation', event))
      }
    >
      <Icon icon="sign-out-alt" />
      Log Out
    </li>
  ) : (
    <li
      key="log in"
      onClick={event =>
        dispatch(setOpenAuthModal(true, 'mainNavigation', event))
      }
    >
      <Icon icon="sign-in-alt" />
      Login / Sign Up
    </li>
  );

  return (
    <>
      {openAuthModal && <UserAuthModal />}
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

const mapStateToProps = ({ user: { loggedIn, openAuthModal } }) => ({
  loggedIn,
  openAuthModal
});

export default connect(mapStateToProps)(MainNavigation);
