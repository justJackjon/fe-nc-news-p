import React, { useContext, createRef, useEffect } from 'react';
import { SidebarContext } from '../../../Context/SidebarProvider';
import './SideBar.css';
import Footer from '../../../Footer/Footer';

const sidebarContent = createRef();
const sidebarContainer = createRef();

const SideBar = ({ parent, children }) => {
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

  return (
    <aside ref={sidebarContainer} className="sidebar">
      <ul ref={sidebarContent} className={initClassNames()}>
        {children.map(child =>
          child?.type?.name ? <li key={child.type.name}>{child}</li> : undefined
        )}
        <li>
          <Footer displayLocation="sidebar" />
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
