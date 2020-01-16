import React, { memo, useContext } from 'react';
import { Link } from '@reach/router';
import { UserSettingsContext } from '../../../../Context/UserSettingsProvider';

const UserProfileCard = memo(() => {
  const { loggedInUser } = useContext(UserSettingsContext);

  const userProfile = loggedInUser && (
    <div className="loggedInUser-list-container">
      <Link to={`../${loggedInUser.username}`}>
        <div className="loggedInUser-list-image-container">
          <img
            className="loggedInUser-list-image"
            src={loggedInUser.avatar_url}
            alt="User Profile"
          />
        </div>
      </Link>
      <div className="loggedInUser-list-text">
        <h3 className="loggedInUser-list-username">
          <Link to={`../${loggedInUser.username}`}>
            {loggedInUser.username}
          </Link>
        </h3>
        <p className="loggedInUser-list-desc">
          <Link to={`../${loggedInUser.username}`}>{loggedInUser.name}</Link>
        </p>
      </div>
    </div>
  );
  return <>{userProfile}</>;
});

export default UserProfileCard;
