import React from 'react';
import { connect } from 'react-redux';

import SelectDropdown from '../../Controls/SelectDropdown/SelectDropdown';
import Links from '../../Navigation/NavigationLinks';

import './SubHeader.css';
import ncnLogo from '../../../assets/global/images/ncnlogo-rb.svg';

const SubHeader = ({
  path,
  uri,
  sort_by,
  setSort_by,
  dimensions: { windowWidth }
}) => {
  const topicTitleContent = () => {
    if (!path) return;
    if (path === '/') return;
    return path
      .match(/\/(\w+)/)[1]
      .replace(/^\w/, first => first.toUpperCase());
  };

  const showSortBy = () => {
    const sortByRef = {
      '/': true,
      '/articles': true,
      '/topics/:topic': true,
      '/users/:author': true
    };
    return sortByRef[path];
  };

  return (
    <div className="subheader">
      {topicTitleContent() && (
        <div className="topic-subheader">
          <div className="topic-image-container">
            <img className="topic-image" src={ncnLogo} alt="Topic Profile" />
          </div>
          <div className="topic-subhead-text">
            <h1 className="topic-title">{topicTitleContent()}</h1>
            <p className="topic-uri">{uri}</p>
          </div>
        </div>
      )}

      <div className="sub-navigation-container">
        {windowWidth > 600 && (
          <>
            <nav className="sub-navigation">
              <ul>{Links.slice(0, 4)}</ul>
            </nav>
          </>
        )}
        {showSortBy() && (
          <SelectDropdown sort_by={sort_by} setSort_by={setSort_by} />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ window: { dimensions } }) => ({ dimensions });

export default connect(mapStateToProps)(SubHeader);
