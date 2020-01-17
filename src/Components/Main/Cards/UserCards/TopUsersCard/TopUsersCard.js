import React from 'react';
import UserListCard from '../UserListCard/UserListCard';
import './TopUsersCard.css';

const TopAuthorsCard = ({ users }) => {
  return (
    <section className="sidebar-top-users">
      <div className="top-users-cover-image"></div>
      <h2 className="sidebar-list-subhead">NCN Top Contributors</h2>
      <ul className="top-users-list">
        {users?.map((user, ind) => (
          <li key={user.username} className="sidebar-user-list-item">
            <UserListCard
              itemNumber={ind + 1}
              displayLocation="sidebar-user-list"
              user={user}
            />
          </li>
        ))}
      </ul>
      <button className="btn-lg btn-solid view-all-users">VIEW ALL</button>
    </section>
  );
};

export default TopAuthorsCard;
