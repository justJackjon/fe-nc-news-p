import React from 'react';

import { WindowConsumer } from '../../Context/WindowProvider';
import SubHeader from '../SubHeader/SubHeader';
import SideBar from '../SharedComponents/SideBar/SideBar';
import MainContainer from '../Containers/MainContainer/MainContainer';
import Feed from '../SharedComponents/Feed/Feed';

const TopicsPage = ({
  path,
  uri,
  articles,
  topics,
  users,
  sort_by,
  setSort_by,
  setError,
  // getAddtlData,
  loadAddtlData,
  dataAvailable
}) => (
  <>
    <SubHeader
      path={path}
      uri={uri}
      sort_by={sort_by}
      setSort_by={setSort_by}
    />
    <MainContainer path={path}>
      <WindowConsumer>
        {({ windowWidth }) => {
          const showSideBar = windowWidth > 1024;
          return showSideBar && <SideBar users={users} />;
        }}
      </WindowConsumer>
      <Feed
        sort_by={sort_by}
        path={path}
        articles={articles}
        topics={topics}
        users={users}
        setError={setError}
        dataType="topics"
        loadAddtlData={loadAddtlData}
        dataAvailable={dataAvailable}
      />
    </MainContainer>
  </>
);

export default TopicsPage;
