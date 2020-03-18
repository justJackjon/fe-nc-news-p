import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Link } from '@reach/router';

import placeholderAvatar from '../../../../../assets/global/images/placeholder-avatar.svg';
import './UserListCard.css';

const UserListCard = ({ itemNumber, displayLocation, user, children }) => {
  // displayLocation = user-list || user-profile || sidebar-user-list
  return (
    <div className={`${displayLocation}-container`}>
      {itemNumber && (
        <>
          <span className="user-list-item-number">{itemNumber}</span>
          <Icon className="rank-movement-icon" icon="caret-up"></Icon>
        </>
      )}
      <Link to={`/users/${user.username}`}>
        <div className={`${displayLocation}-image-container`}>
          <object
            data={user.avatar_url}
            className={`${displayLocation}-image`}
            type="image/jpeg"
          >
            <img
              className={`${displayLocation}-image`}
              src={placeholderAvatar}
              alt="Placeholder User Profile"
            />
          </object>
        </div>
      </Link>
      <div className={`${displayLocation}-text`}>
        <h3 className={`${displayLocation}-username`}>
          <Link to={`/users/${user.username}`}>{user.username}</Link>
        </h3>
        <p className={`${displayLocation}-desc`}>
          <Link to={`/users/${user.username}`}>{user.name}</Link>
        </p>
      </div>
      {children}
    </div>
  );
};

export default UserListCard;
