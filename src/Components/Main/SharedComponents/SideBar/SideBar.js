import React from 'react';
import './SideBar.css';
import UserProfileCard from '../../Cards/UserCards/UserProfileCard/UserProfileCard';
import TopUsersCard from '../../Cards/UserCards/TopUsersCard/TopUsersCard';
import PopularTopicsCard from '../../Cards/TopicCards/PopularTopicsCard/PopularTopicsCard';
import Footer from '../../../Footer/Footer';

const SideBar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-content">
        <h2>SIDEBAR</h2>
        <li>
          <UserProfileCard />
        </li>
        <li>
          <TopUsersCard />
        </li>
        <li>
          <PopularTopicsCard />
        </li>
        <li>
          <Footer />
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
