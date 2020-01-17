import React from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

const Navigation = [
  <li>
    <Link to="/">
      <Icon icon="home" />
      HOME
    </Link>
  </li>,
  <li>
    <Link to="/articles">
      <Icon icon="newspaper" />
      ARTICLES
    </Link>
  </li>,
  <li>
    <Link to="/topics/All Topics">
      <Icon icon="archive" />
      TOPICS
    </Link>
  </li>,
  <li>
    <Link to="/users/All Users">
      <Icon icon="users" />
      USERS
    </Link>
  </li>,
  <li>
    <Link to="/">
      <Icon icon="sign-in-alt" />
      Login / Sign Up
    </Link>
  </li>
];

export default Navigation;
