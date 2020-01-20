import React, { useContext } from 'react';
import { Link } from '@reach/router';
import { UserSettingsContext } from '../../../../Context/UserSettingsProvider';
import UserListCard from '../UserListCard/UserListCard';
import './UserProfileCard.css';

const UserProfileCard = () => {
  const { loggedInUser: user } = useContext(UserSettingsContext);
  return (
    <div className="user-profile-card">
      <div className="user-profile-cover-image"></div>
      <UserListCard displayLocation="user-profile" user={user}>
        <button className="btn-lg btn-solid">NEW POST</button>
        <button className="btn-lg btn-solid">LOG OUT</button>
      </UserListCard>
    </div>
  );
};

export default UserProfileCard;
