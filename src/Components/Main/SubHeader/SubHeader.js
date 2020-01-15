import React from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import './SubHeader.css';
import ncnLogo from '../../../ncnlogo-rb.svg';

const SubHeader = ({ parent, children }) => {
  return (
    <div className="subheader">
      {parent && (
        <div className="topic-subheader">
          <div className="topic-image-container">
            <img className="topic-image" src={ncnLogo} alt="Topic Profile" />
          </div>
          <div className="topic-subhead-text">
            <h1 className="topic-title">{parent.topic}</h1>
            <p className="topic-uri">{parent.uri}</p>
          </div>
        </div>
      )}

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
            <Link to="/topics/All Topics">
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
