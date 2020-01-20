import React from 'react';

import { WindowConsumer } from '../../Context/WindowProvider';
import SelectDropdown from '../../Controls/SelectDropdown/SelectDropdown';
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
              {parent.path
                .match(/\/(\w+)/)[1]
                .replace(/^\w/, first => first.toUpperCase())}
            </h1>
            <p className="topic-uri">{parent.uri}</p>
          </div>
        </div>
      )}

      <div className="sub-navigation-container">
        {
          <WindowConsumer>
            {({ windowWidth }) => {
              if (windowWidth > 600)
                return (
                  <>
                    <nav className="sub-navigation">
                      <ul>{Links.slice(0, 4)}</ul>
                    </nav>
                    <hr className="sub-navigation-hr" />
                  </>
                );
            }}
          </WindowConsumer>
        }
        <SelectDropdown />
        <hr className="sub-navigation-hr" />
      </div>
    </div>
  );
};

export default SubHeader;
