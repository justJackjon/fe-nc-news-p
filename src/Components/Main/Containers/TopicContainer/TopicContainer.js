import React, { useState, useEffect } from 'react';
import * as api from '../../../../api';
import Feed from '../../SharedComponents/Feed/Feed';
import Loader from '../../../Utils/Loader/Loader';
import '../Containers.css';

const TopicContainer = ({ parent: { topic }, children }) => {
  const [topicArticles, setTopicArticles] = useState(null);

  const fetchTopicArticles = () => {
    api
      .getData('/articles', 'articles', { params: { topic } })
      .then(articles => {
        setTopicArticles(articles);
      });
  };

  useEffect(() => {
    if (!topicArticles) fetchTopicArticles();
    if (topicArticles) {
      if (topicArticles.every(articleTopic => articleTopic !== topic))
        fetchTopicArticles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!topicArticles ? (
        <Loader />
      ) : (
        <div className="main-content">
          <div className="main-content-container">
            <Feed dataType="articles" articles={topicArticles} />
            {children}
          </div>
          ;
        </div>
      )}
    </>
  );
};

export default TopicContainer;
