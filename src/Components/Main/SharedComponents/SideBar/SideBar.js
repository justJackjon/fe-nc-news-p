import React, { useContext, createRef, useEffect } from 'react';

import { SidebarContext } from '../../../Context/SidebarProvider';
import { WindowConsumer } from '../../../Context/WindowProvider';
import UserProfileCard from '../../Cards/UserCards/UserProfileCard/UserProfileCard';
import TopUsersCard from '../../Cards/UserCards/TopUsersCard/TopUsersCard';
import Footer from '../../../Footer/Footer';

import './SideBar.css';

const sidebarContent = createRef();
const sidebarContainer = createRef();

const SideBar = ({ parent, children, path, users }) => {
  const {
    stickySidebar,
    stuckSidebar,
    actions: { setStickySidebar }
  } = useContext(SidebarContext);

  const onArticlePage = parent?.path === '/articles/:articleId' ? '-a-pg' : '';

  const initClassNames = () => {
    if (stuckSidebar) return 'sidebar-content sidebar-content-stuck';
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
        // setStuckSidebar(false);
      }
    }
  };

  useEffect(() => {
    stickyStuff();
    window.addEventListener('scroll', stickyStuff);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const numOfTopUsers = parent?.path === '/articles/:articleId' ? 3 : 5;

  return (
    <aside ref={sidebarContainer} className="sidebar">
      <ul ref={sidebarContent} className={initClassNames()}>
        <WindowConsumer>
          {({ windowHeight }) => (
            <>
              <li>
                <UserProfileCard />
              </li>
              <li>
                {windowHeight > 945 && (
                  <TopUsersCard users={users?.slice(0, numOfTopUsers)} />
                )}
                {windowHeight <= 945 && windowHeight >= 840 && (
                  <TopUsersCard users={users?.slice(0, 3)} />
                )}
              </li>
            </>
          )}
        </WindowConsumer>
        {/* <li>
          <PopularTopicsCard />
        </li> */}
        {/* {children.map(child =>
          child?.type?.name ? <li key={child.type.name}>{child}</li> : undefined
        )} */}
        <li>
          <Footer displayLocation="sidebar" />
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
