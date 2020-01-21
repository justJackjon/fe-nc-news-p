import React, { createRef, useEffect } from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import { WindowConsumer } from '../Context/WindowProvider';
import ncnewsLogo from '../../ncnewslogo-rb.svg';
import ncnLogo from '../../ncnlogo-rb.svg';
import SearchBar from './SearchBar';
import HeaderControls from './HeaderControls/HeaderControls';
import Button from '../Controls/Buttons/Button';
import { articleHeader } from '../Main/Containers/ArticleContainer/ArticleContainer';
import UserNotifcationBar from '../Modals/UserNotification/UserNotificationBar';

import './Header.css';

const mainHeader = createRef();
const backToTop = createRef();

const Header = () => {
  const stickyStuff = () => {
    const scrolled =
      document.body.scrollTop > 0 || document.documentElement.scrollTop > 0;

    if (mainHeader.current) {
      const className = mainHeader.current.classList;
      scrolled
        ? className.add('main-header-onscroll')
        : className.remove('main-header-onscroll');
    }

    if (backToTop.current) {
      const className = backToTop.current.classList;
      scrolled ? className.add('display') : className.remove('display');
    }

    if (articleHeader.current) {
      const className = articleHeader.current.classList;
      scrolled
        ? className.add('article-header-onscroll')
        : className.remove('article-header-onscroll');
    }
  };

  useEffect(() => window.addEventListener('scroll', stickyStuff), []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <UserNotifcationBar className="notification-bar-top success" />

      <WindowConsumer>
        {({ windowWidth }) => (
          <>
            <header ref={mainHeader} className="main-header-container">
              <div className="main-header">
                <Link to="/">
                  <img
                    src={windowWidth <= 480 ? ncnLogo : ncnewsLogo}
                    className="header-logo"
                    alt="NCNews Logo"
                  />
                </Link>
                <SearchBar />
                <HeaderControls />
              </div>
            </header>
            <Button
              ref={backToTop}
              className="btn-direction back-to-top"
              onClick={handleClick}
              aria-label="Back to top"
            >
              <Icon icon="angle-double-up"></Icon>
            </Button>
          </>
        )}
      </WindowConsumer>
    </>
  );
};

export default Header;
