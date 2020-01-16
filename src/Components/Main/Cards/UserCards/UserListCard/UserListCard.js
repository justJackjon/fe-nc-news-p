import React from 'react';
import { Link } from '@reach/router';
import './UserListCard.css';

const UserListCard = ({ user }) => {
  return (
    <div className="user-list-container">
      <Link to={`../${user.username}`}>
        <div className="user-list-image-container">
          <img
            className="user-list-image"
            src={user.avatar_url}
            alt="User Profile"
          />
        </div>
      </Link>
      <div className="user-list-text">
        <h3 className="user-list-username">
          <Link to={`../${user.username}`}>{user.username}</Link>
        </h3>
        <p className="user-list-desc">
          <Link to={`../${user.username}`}>{user.name}</Link>
        </p>
      </div>
    </div>
  );
};

export default UserListCard;
