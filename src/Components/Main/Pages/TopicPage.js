import React from 'react';

import { WindowConsumer } from '../../Context/WindowProvider';
import SubHeader from '../SubHeader/SubHeader';
import SideBar from '../SharedComponents/SideBar/SideBar';
import TopicContainer from '../Containers/TopicContainer/TopicContainer';
import Feed from '../SharedComponents/Feed/Feed';

const TopicPage = props => {
  const {
    path,
    uri,
    sort_by,
    currentSort,
    updateMainState,
    // getAddtlData,
    topics,
    users,
    topicArticles,
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
      <TopicContainer
        parent={props}
        updateMainState={updateMainState}
        topicArticles={topicArticles}
        path={path}
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
          dataType="articles"
          articles={topicArticles}
          loadAddtlData={loadAddtlData}
          dataAvailable={dataAvailable}
        />
      </TopicContainer>
    </>
  );
};

export default TopicPage;
