import React, { useCallback, useEffect } from 'react';

import { WindowConsumer } from '../../../Context/WindowProvider';
import Feed from '../../SharedComponents/Feed/Feed';
import SideBar from '../../SharedComponents/SideBar/SideBar';

import '../Containers.css';

const MainContainer = props => {
  const {
    path,
    uri,
    articles,
    topics,
    users,
    sort_by,
    setSort_by,
    setError,
    getAddtlData,
    loadAddtlData,
    dataAvailable,
    children
  } = props;

  const getAddtl = useCallback(() => {
    getAddtlData();
  }, [getAddtlData]);

  useEffect(() => {
    // Remove the conditional below when infinite scroll is setup for other data types too...
    if (path === '/' || path === '/articles') {
      window.addEventListener('scroll', getAddtl);
      return () => {
        window.removeEventListener('scroll', getAddtl);
      };
    }
  }, [getAddtl, path]);

  const pathRef = {
    '/': 'articles',
    '/topics': 'topics',
    '/topics/:topic': 'articles',
    '/articles': 'articles',
    '/articles/:articleId': null, // no feed on this page
    '/users': 'users',
    '/users/:author': 'articles',
    '/post': null // no feed on this page
  };

  return (
    <div className="main-content">
      <div className="main-content-container">
        <Feed
          sort_by={sort_by}
          path={path}
          articles={articles}
          topics={topics}
          users={users}
          setError={setError}
          dataType={pathRef[path]}
          loadAddtlData={loadAddtlData}
          dataAvailable={dataAvailable}
        />
        <WindowConsumer>
          {({ windowWidth }) => windowWidth > 1024 && <SideBar users={users} />}
        </WindowConsumer>
        {children}
      </div>
    </div>
  );
};

export default MainContainer;
