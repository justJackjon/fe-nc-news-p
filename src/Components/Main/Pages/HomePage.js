import React from 'react';

import { WindowConsumer } from '../../Context/WindowProvider';
import SubHeader from '../SubHeader/SubHeader';
import SideBar from '../SharedComponents/SideBar/SideBar';
import MainContainer from '../Containers/MainContainer/MainContainer';
import TrendingTopics from '../SharedComponents/TrendingTopics/TendingTopics';
import Feed from '../SharedComponents/Feed/Feed';

const HomePage = ({
  path,
  articles,
  topics,
  users,
  sort_by,
  setSort_by,
  setError,
  getAddtlData,
  loadAddtlData,
  dataAvailable
}) => (
  <>
    <SubHeader path={path} sort_by={sort_by} setSort_by={setSort_by} />
    <MainContainer path={path} getAddtlData={getAddtlData}>
      <TrendingTopics topics={topics} />
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
        dataType="articles"
        loadAddtlData={loadAddtlData}
        dataAvailable={dataAvailable}
      />
    </MainContainer>
  </>
);

export default HomePage;
