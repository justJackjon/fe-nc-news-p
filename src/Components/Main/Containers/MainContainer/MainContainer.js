import React from 'react';

import { WindowConsumer } from '../../../Context/WindowProvider';
import Feed from '../../SharedComponents/Feed/Feed';
import SideBar from '../../SharedComponents/SideBar/SideBar';

import '../Containers.css';

const MainContainer = props => {
  const {
    path,
    initData,
    topic,
    author,
    sort_by,
    setSort_by,
    currParams,
    setCurrParams,
    refresh,
    setRefresh,
    setError,
    children
  } = props;

  const pathRef = {
    // add paths which do not require the Feed coponent below:
    '/articles/:articleId': true,
    '/post': true
  };
  const feedReq = pathRef[path];

  return (
    <div className="main-content">
      <div className="main-content-container">
        {children}
        {!feedReq && (
          <Feed
            initData={initData}
            path={path}
            topic={topic}
            author={author}
            sort_by={sort_by}
            setSort_by={setSort_by}
            currParams={currParams}
            setCurrParams={setCurrParams}
            refresh={refresh}
            setRefresh={setRefresh}
            setError={setError}
          />
        )}
        <WindowConsumer>
          {({ windowWidth }) =>
            windowWidth > 1024 && <SideBar users={initData.users} />
          }
        </WindowConsumer>
      </div>
    </div>
  );
};

export default MainContainer;
