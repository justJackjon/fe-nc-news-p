import React from 'react';
import Links from '../../Navigation/NavigationLinks';
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
            <h1 className="topic-title">
              {parent.topic || parent.articles || parent.user}
            </h1>
            <p className="topic-uri">{parent.uri}</p>
          </div>
        </div>
      )}

      <nav className="sub-navigation">
        <ul>{Links.slice(0, 4)}</ul>
      </nav>
    </div>
  );
};

export default SubHeader;
