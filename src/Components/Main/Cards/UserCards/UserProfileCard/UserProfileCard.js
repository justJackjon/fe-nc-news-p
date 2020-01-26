import React, { useContext } from 'react';

import { UserSettingsContext } from '../../../../Context/UserSettingsProvider';
import UserListCard from '../UserListCard/UserListCard';

import './UserProfileCard.css';

const UserProfileCard = () => {
  const {
    loggedInUser: user,
    loggedIn,
    actions: { setOpenAuthModal }
  } = useContext(UserSettingsContext);

  return (
    <div className="user-profile-card">
      <div className="user-profile-cover-image"></div>
      <UserListCard
        displayLocation="user-profile"
        user={user}
        loggedIn={loggedIn}
      >
        <button
          className="btn-lg btn-regular"
          onClick={event => setOpenAuthModal(true, 'userProfileCard', event)}
        >
          {loggedIn ? 'LOG OUT' : 'LOG IN'}
        </button>
        <button
          className="btn-lg btn-solid"
          onClick={event => setOpenAuthModal(true, 'signUpButton', event)}
        >
          {loggedIn ? 'NEW POST' : 'SIGN UP'}
        </button>
      </UserListCard>
    </div>
  );
};

export default UserProfileCard;
