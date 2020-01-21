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
    <Link to="/articles">
      <Icon icon="newspaper" />
      ARTICLES
    </Link>
  </li>,
  <li key="topics">
    <Link to="/topics">
      <Icon icon="archive" />
      TOPICS
    </Link>
  </li>,
  <li key="users">
    <Link to="/users">
      <Icon icon="users" />
      USERS
    </Link>
  </li>
];

export default Navigation;
