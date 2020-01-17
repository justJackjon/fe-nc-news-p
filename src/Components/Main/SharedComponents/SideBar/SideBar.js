import React, { createRef, useEffect } from 'react';
import './SideBar.css';
import Footer from '../../../Footer/Footer';

const sidebarContent = createRef();

const SideBar = ({ children }) => {
  const stickyStuff = () => {
    if (sidebarContent.current) {
      document.body.scrollTop > 300 || document.documentElement.scrollTop > 300
        ? sidebarContent.current.classList.add('sidebar-content-sticky')
        : sidebarContent.current.classList.remove('sidebar-content-sticky');
    }
  };

  useEffect(() => window.addEventListener('scroll', stickyStuff), []);

  return (
    <aside className="sidebar">
      <ul ref={sidebarContent} className="sidebar-content">
        {children.map(child => {
          return <li key={child.type.name}>{child}</li>;
        })}
        <li>
          <Footer />
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
