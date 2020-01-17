import React from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import Footer from '../../Footer/Footer';
import './MainNavigation.css';

const MainNavigation = ({ toggleDrawer }) => {
  return (
    <div className="main-navigation">
      <h2>
        <Icon icon="compass" />
        NAVIGATION
      </h2>
      <ul onClick={toggleDrawer}>
        <li>
          <Link to="/">
            <Icon icon="home" />
            Home
          </Link>
        </li>
        <li>
          <Link to="/articles">
            <Icon icon="newspaper" />
            Articles
          </Link>
        </li>
        <li>
          <Link to="/topics">
            <Icon icon="archive" />
            Topics
          </Link>
        </li>
        <li>
          <Link to="/users">
            <Icon icon="users" />
            Users
          </Link>
        </li>
        <li>
          <Link to="/">
            <Icon icon="sign-in-alt" />
            Login / Sign Up
          </Link>
        </li>
      </ul>
      <Footer displayLocation="main-navigation" />
    </div>
  );
};

export default MainNavigation;
