import React from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

const Navigation = [
  <li>
    <Link to="/" key="home">
      <Icon icon="home" />
      HOME
    </Link>
  </li>,
  <li>
    <Link to="/articles" key="articles">
      <Icon icon="newspaper" />
      ARTICLES
    </Link>
  </li>,
  <li>
    <Link to="/topics" key="topics">
      <Icon icon="archive" />
      TOPICS
    </Link>
  </li>,
  <li>
    <Link to="/users" key="users">
      <Icon icon="users" />
      USERS
    </Link>
  </li>
];

export default Navigation;
