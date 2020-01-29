import React, { useState, useEffect, useCallback } from 'react';

import * as api from '../../../api';
import { WindowConsumer } from '../../Context/WindowProvider';

import Loader from '../../Utils/Loader/Loader';
import SubHeader from '../SubHeader/SubHeader';
import SideBar from '../SharedComponents/SideBar/SideBar';
import TopicContainer from '../Containers/TopicContainer/TopicContainer';
import Feed from '../SharedComponents/Feed/Feed';

const TopicPage = props => {
  const {
    path,
    uri,
    topic,
    sort_by,
    currentSort,
    updateMainState,
    topics,
    users,
    // getAddtlData,
    loadAddtlData,
    dataAvailable
  } = props;

  const [displayLoader, setDisplayLoader] = useState(false);
  const [topicArticles, setTopicArticles] = useState([]);

  const fetchTopicArticles = useCallback(() => {
    setDisplayLoader(true);
    api
      .getData('/articles', 'articles', { params: { topic, sort_by } })
      .then(topicArticles => {
        if (topicArticles.length) {
          setTopicArticles(topicArticles);
          updateMainState({ currentSort: sort_by });
        } else {
          throw new Error('no data');
        }
        setDisplayLoader(false);
      })
      .catch(error => {
        if (error.message === 'no data') {
          setTopicArticles([
            {
              article_id: `../topics/${topic}`,
              title: `No articles for '${topic}'`,
              body: error.msg,
              votes: null,
              topic: topic,
              author: 'the server',
              created_at: new Date().toISOString(),
              comment_count: 'No'
            }
          ]);
          setDisplayLoader(false);
          updateMainState({ currentSort: sort_by });
        } else {
          updateMainState({ error: error.response });
        }
      });
  }, [sort_by, topic, updateMainState]);

  useEffect(() => {
    if (topicArticles[0]?.title === `No articles for '${topic}'`) return;
    if (!topicArticles.length) fetchTopicArticles();
    if (sort_by !== currentSort) fetchTopicArticles();
  }, [currentSort, fetchTopicArticles, sort_by, topic, topicArticles]);

  return (
    <>
      {displayLoader ? (
        <Loader className="loading">
          <h1>LOADING JUICY ARTICLES...</h1>
        </Loader>
      ) : (
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
      )}
    </>
  );
};

export default TopicPage;