import React, { useState, useEffect, useCallback } from 'react';

import * as api from '../../../api';

import SubHeader from '../SubHeader/SubHeader';
import MainContainer from '../Containers/MainContainer/MainContainer';
import Loader from '../../Utils/Loader/Loader';

const TopicPage = props => {
  const {
    path,
    uri,
    topic,
    sort_by,
    setSort_by,
    currentSort,
    setError
  } = props;

  const [displayLoader, setDisplayLoader] = useState(false);
  const [topicArticles, setTopicArticles] = useState([]);

  const fetchTopicArticles = useCallback(() => {
    setDisplayLoader(true);
    api
      .getData('/articles', 'articles', { params: { topic, sort_by } })
      .then(topicArticles => {
        if (topicArticles.length) setTopicArticles(topicArticles);
        else {
          setTopicArticles([
            {
              article_id: `../topics/${topic}`,
              title: `No articles for '${topic}'`,
              body: null,
              votes: null,
              topic: topic,
              author: 'the server',
              created_at: new Date().toISOString(),
              comment_count: 'No'
            }
          ]);
        }
        setDisplayLoader(false);
        setSort_by(sort_by);
      })
      .catch(({ response: error }) => setError(error));
  }, [topic, sort_by, setSort_by, setError]);

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
            setSort_by={setSort_by}
          />
          <MainContainer topicArticles={topicArticles} {...props} />
        </>
      )}
    </>
  );
};

export default TopicPage;
