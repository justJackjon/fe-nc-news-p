import React, { useContext } from 'react';
import { Link } from '@reach/router';
import { UserSettingsContext } from '../../../../Context/UserSettingsProvider';
import UserListCard from '../UserListCard/UserListCard';
import './UserProfileCard.css';

const UserProfileCard = () => {
  const { loggedInUser: user } = useContext(UserSettingsContext);

  // const userProfile = loggedInUser && (
  //   <div className="loggedInUser-list-container">
  //     <Link to={`../${loggedInUser.username}`}>
  //       <div className="loggedInUser-list-image-container">
  //         <img
  //           className="loggedInUser-list-image"
  //           src={loggedInUser.avatar_url}
  //           alt="User Profile"
  //         />
  //       </div>
  //     </Link>
  //     <div className="loggedInUser-list-text">
  //       <h3 className="loggedInUser-list-username">
  //         <Link to={`../${loggedInUser.username}`}>
  //           {loggedInUser.username}
  //         </Link>
  //       </h3>
  //       <p className="loggedInUser-list-desc">
  //         <Link to={`../${loggedInUser.username}`}>{loggedInUser.name}</Link>
  //       </p>
  //     </div>
  //   </div>
  // );
  // return <>{userProfile}</>;
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
