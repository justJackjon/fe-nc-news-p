import React, { useCallback, useEffect } from 'react';

import { WindowConsumer } from '../../../Context/WindowProvider';
import Feed from '../../SharedComponents/Feed/Feed';
import SideBar from '../../SharedComponents/SideBar/SideBar';

import '../Containers.css';

const MainContainer = props => {
  const {
    path,
    articles,
    topicArticles,
    userArticles,
    topics,
    users,
    sort_by,
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
      return () => window.removeEventListener('scroll', getAddtl);
    }
  }, [getAddtl, path]);

  const pathRef = {
    '/': [articles, 'articles'],
    '/topics': [topics, 'topics'],
    '/topics/:topic': [topicArticles, 'articles'],
    '/articles': [articles, 'articles'],
    '/articles/:articleId': [null, null], // no feed on this page
    '/users': [users, 'users'],
    '/users/:author': [userArticles, 'articles'],
    '/post': [null, null] // no feed on this page
  };
  // conditionally renders the Feed component and also determines what kind of data the Feed will display
  const [dataSource, dataType] = pathRef[path];

  return (
    <div className="main-content">
      <div className="main-content-container">
        {children}
        {dataType && (
          <Feed
            sort_by={sort_by}
            path={path}
            dataSource={dataSource}
            dataType={dataType}
            setError={setError}
            loadAddtlData={loadAddtlData}
            dataAvailable={dataAvailable}
          />
        )}
        <WindowConsumer>
          {({ windowWidth }) => windowWidth > 1024 && <SideBar users={users} />}
        </WindowConsumer>
      </div>
    </div>
  );
};

export default MainContainer;
