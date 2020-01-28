import React from 'react';

import { WindowConsumer } from '../../Context/WindowProvider';
import SubHeader from '../SubHeader/SubHeader';
import SideBar from '../SharedComponents/SideBar/SideBar';
import HomeFeedContainer from '../Containers/HomeFeedContainer/HomeFeedContainer';
import TrendingTopics from '../SharedComponents/TrendingTopics/TendingTopics';
import Feed from '../SharedComponents/Feed/Feed';

const HomePage = ({
  path,
  sort_by,
  updateMainState,
  getAddtlData,
  topics,
  users,
  articles,
  loadAddtlData,
  dataAvailable
}) => (
  <>
    <SubHeader
      path={path}
      sort_by={sort_by}
      updateMainState={updateMainState}
    />
    <HomeFeedContainer path={path} getAddtlData={getAddtlData}>
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
        updateMainState={updateMainState}
        dataType="articles"
        loadAddtlData={loadAddtlData}
        dataAvailable={dataAvailable}
      />
    </HomeFeedContainer>
  </>
);

export default HomePage;
