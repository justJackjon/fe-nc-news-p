import React from 'react';

import { WindowConsumer } from '../../Context/WindowProvider';
import SubHeader from '../SubHeader/SubHeader';
import SideBar from '../SharedComponents/SideBar/SideBar';
import UserContainer from '../Containers/UserContainer/UserContainer';
import Feed from '../SharedComponents/Feed/Feed';

const UserPage = props => {
  const {
    path,
    uri,
    sort_by,
    currentSort,
    updateMainState,
    topics,
    users,
    userArticles,
    // getAddtlData,
    loadAddtlData,
    dataAvailable
  } = props;
  return (
    <>
      <SubHeader
        path={path}
        uri={uri}
        sort_by={sort_by}
        updateMainState={updateMainState}
      />
      <UserContainer
        updateMainState={updateMainState}
        userArticles={userArticles}
        parent={props}
        sort_by={sort_by}
        currentSort={currentSort}
      >
        <WindowConsumer>
          {({ windowWidth }) => {
            const showSideBar = windowWidth > 1024;
            return showSideBar && <SideBar users={users} />;
          }}
        </WindowConsumer>
        <Feed
          sort_by={sort_by}
          path={path}
          topics={topics}
          users={users}
          updateMainState={updateMainState}
          articles={userArticles}
          dataType="articles"
          loadAddtlData={loadAddtlData}
          dataAvailable={dataAvailable}
        />
      </UserContainer>
    </>
  );
};

export default UserPage;
