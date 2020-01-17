import React, { createRef, useEffect } from 'react';
import './SideBar.css';
import Footer from '../../../Footer/Footer';

const sidebarContent = createRef();

const SideBar = ({ children }) => {
  const stickyStuff = () => {
    if (sidebarContent.current) {
      document.body.scrollTop > 248 || document.documentElement.scrollTop > 248
        ? sidebarContent.current.classList.add('sidebar-content-sticky')
        : sidebarContent.current.classList.remove('sidebar-content-sticky');
    }
  };

  useEffect(() => window.addEventListener('scroll', stickyStuff), []);

  return (
    <aside className="sidebar">
      <ul ref={sidebarContent} className="sidebar-content">
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
