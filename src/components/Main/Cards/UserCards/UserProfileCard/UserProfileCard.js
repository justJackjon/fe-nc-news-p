import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';

import { setOpenAuthModal } from '../../../../../actions/userActions';
import UserListCard from '../UserListCard/UserListCard';

import './UserProfileCard.css';

const UserProfileCard = ({ loggedInUser: user, loggedIn, dispatch }) => (
  <div className="user-profile-card">
    <div className="user-profile-cover-image"></div>
    <UserListCard
      displayLocation="user-profile"
      user={user}
      loggedIn={loggedIn}
    >
      <button
        className="btn-lg btn-regular"
        onClick={event =>
          dispatch(setOpenAuthModal(true, 'userProfileCard', event))
        }
      >
        {loggedIn ? 'LOG OUT' : 'LOG IN'}
      </button>
      {loggedIn ? (
        <button className="btn-lg btn-solid" onClick={() => navigate('/post')}>
          NEW POST
        </button>
      ) : (
        <button
          className="btn-lg btn-solid"
          onClick={event =>
            dispatch(setOpenAuthModal(true, 'signUpButton', event))
          }
        >
          SIGN UP
        </button>
      )}
    </UserListCard>
  </div>
);

const mapStateToProps = ({ user: { loggedInUser, loggedIn } }) => ({
  loggedInUser,
  loggedIn
});

export default connect(mapStateToProps)(UserProfileCard);
