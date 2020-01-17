import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Link } from '@reach/router';
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
      <Link to={`../${user.username}`}>
        <div className={`${displayLocation}-image-container`}>
          <img
            className={`${displayLocation}-image`}
            src={user.avatar_url}
            alt="User Profile"
          />
        </div>
      </Link>
      <div className={`${displayLocation}-text`}>
        <h3 className={`${displayLocation}-username`}>
          <Link to={`../${user.username}`}>{user.username}</Link>
        </h3>
        <p className={`${displayLocation}-desc`}>
          <Link to={`../${user.username}`}>{user.name}</Link>
        </p>
      </div>
      {children}
    </div>
  );
};

export default UserListCard;
