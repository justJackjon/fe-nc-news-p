import React from 'react';
import './SideBar.css';
import UserProfile from './UserProfile/UserProfile';
import TopAuthors from './TopAuthors/TopAuthors';
import PopularTopics from './PopularTopics/PopularTopics';
import Footer from '../../../Footer/Footer';

const SideBar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-content">
        <h2>SIDEBAR</h2>
        <li>
          <UserProfile />
        </li>
        <li>
          <TopAuthors />
        </li>
        <li>
          <PopularTopics />
        </li>
        <li>
          <Footer />
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
