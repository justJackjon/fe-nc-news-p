import React, { useState, useEffect, useCallback } from 'react';
import * as api from '../../../../api';
import Loader from '../../../Utils/Loader/Loader';
import '../Containers.css';

const TopicContainer = ({
  getAddtlData,
  topicArticles,
  updateMainState,
  parent: { topic },
  path,
  sort_by,
  currentSort,
  children
}) => {
  // const getAddtl = useCallback(() => {
  //   getAddtlData();
  // }, [getAddtlData]);

  // useEffect(() => {
  //     window.addEventListener('scroll', getAddtl);
  //     return () => {
  //       window.removeEventListener('scroll', getAddtl);
  //     };
  // }, [getAddtl, path]);
  const [displayLoader, setDisplayLoader] = useState(false);

  const fetchTopicArticles = useCallback(() => {
    setDisplayLoader(true);
    api
      .getData('/articles', 'articles', { params: { topic, sort_by } })
      .then(topicArticles => {
        if (topicArticles.length) {
          updateMainState({ topicArticles, currentSort: sort_by });
        } else {
          throw new Error('no data');
        }
        setDisplayLoader(false);
      })
      .catch(error => {
        if (error.message === 'no data') {
          updateMainState({
            topicArticles: [
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
            ],
            currentSort: sort_by
          });
        } else {
          updateMainState({ error: error.response });
        }
      });
  }, [sort_by, topic, updateMainState]);

  useEffect(() => {
    if (topicArticles[0]?.title === `No articles for '${topic}'`) return;
    if (!topicArticles.length) fetchTopicArticles();
    if (topicArticles.length) {
      if (topicArticles.every(article => article.topic !== topic))
        fetchTopicArticles();
    }
    if (sort_by !== currentSort) fetchTopicArticles();
  }, [currentSort, fetchTopicArticles, sort_by, topic, topicArticles]);

  return (
    <>
      {displayLoader ? (
        <Loader className="loading">
          <h1>LOADING JUICY ARTICLES...</h1>
        </Loader>
      ) : (
        <div className="main-content">
          <div className="main-content-container">{children}</div>
        </div>
      )}
    </>
  );
};

export default TopicContainer;
