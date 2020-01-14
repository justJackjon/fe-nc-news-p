import React from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import './SubHeader.css';

const SubHeader = () => {
  return (
    <div className="sub-header">
      <h2>SUBHEADER COMPONENT</h2>
      <nav className="sub-navigation">
        <ul>
          <li>
            <Link to="/">
              <Icon icon="home" />
              HOME
            </Link>
          </li>
          <li>
            <Link to="/articles">
              <Icon icon="newspaper" />
              ARTICLES
            </Link>
          </li>
          <li>
            <Link to="/topics">
              <Icon icon="archive" />
              TOPICS
            </Link>
          </li>
          <li>
            <Link to="/users">
              <Icon icon="users" />
              USERS
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SubHeader;
