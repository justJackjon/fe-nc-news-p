import React from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

const Navigation = [
  <li key="home">
    <Link to="/">
      <Icon icon="home" />
      HOME
    </Link>
  </li>,
  <li key="articles">
    <Link to="/articles/All Articles">
      <Icon icon="newspaper" />
      ARTICLES
    </Link>
  </li>,
  <li key="topics">
    <Link to="/topics/All Topics">
      <Icon icon="archive" />
      TOPICS
    </Link>
  </li>,
  <li key="users">
    <Link to="/users/All Users">
      <Icon icon="users" />
      USERS
    </Link>
  </li>,
  <li key="sign in">
    <Link to="/">
      <Icon icon="sign-in-alt" />
      Login / Sign Up
    </Link>
  </li>
];

export default Navigation;
