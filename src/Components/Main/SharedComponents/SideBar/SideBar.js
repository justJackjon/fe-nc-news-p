import React, { useContext, createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SidebarContext } from '../../../Context/SidebarProvider';
import UserProfileCard from '../../Cards/UserCards/UserProfileCard/UserProfileCard';
import TopUsersCard from '../../Cards/UserCards/TopUsersCard/TopUsersCard';
import Footer from '../../../Footer/Footer';

import './SideBar.css';

const sidebarContent = createRef();
const sidebarContainer = createRef();

const SideBar = ({ path, users, windowDimensions: { windowHeight } }) => {
  const {
    stickySidebar,
    actions: { setStickySidebar }
  } = useContext(SidebarContext);

  const onArticlePage = path === '/articles/:articleId' ? '-a-pg' : '';

  const initClassNames = () => {
    if (stickySidebar)
      return `sidebar-content sidebar-content-sticky${onArticlePage}`;
    return 'sidebar-content';
  };

  const stickyStuff = () => {
    const containerRect = sidebarContainer?.current?.getBoundingClientRect();
    // sticky header + margin = 64px
    const scrolled = window.scrollY + 64;
    if (sidebarContent.current) {
      if (scrolled >= window.scrollY + containerRect.top) {
        setStickySidebar(true);
      } else {
        setStickySidebar(false);
      }
    }
  };

  useEffect(() => {
    stickyStuff();
    window.addEventListener('scroll', stickyStuff);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const numOfTopUsers = path === '/articles/:articleId' ? 3 : 5;

  return (
    <aside ref={sidebarContainer} className="sidebar">
      <ul ref={sidebarContent} className={initClassNames()}>
        <li>
          <UserProfileCard />
        </li>
        <li className="top-users-card-li">
          {windowHeight > 945 && (
            <TopUsersCard users={users?.slice(0, numOfTopUsers)} />
          )}
          {windowHeight <= 945 && windowHeight >= 840 && (
            <TopUsersCard users={users?.slice(0, 3)} />
          )}
        </li>
        <li>
          <Footer displayLocation="sidebar" />
        </li>
      </ul>
    </aside>
  );
};

SideBar.propTypes = {
  windowDimensions: PropTypes.object.isRequired
};

const mapStateToProps = ({ windowDimensions }) => ({ windowDimensions });

export default connect(mapStateToProps)(SideBar);
