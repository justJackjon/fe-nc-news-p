import React from 'react';
import ArticleCard from '../../Cards/ArticleCard/ArticleCard';
import TopicListCard from '../../Cards/TopicCards/TopicListCard/TopicListCard';
import './Feed.css';

const Feed = ({ dataType, articles, topics }) => {
  const feedList = () => {
    const articleList = articles?.map(article => (
      <li className="article-list-item">
        <ArticleCard article={article} />
      </li>
    ));

    const topicList = (
      <>
        <li className="topic-list-subhead">
          <h2>Topics you might like</h2>
        </li>
        {topics?.map(topic => (
          <li className="topic-list-item">
            <TopicListCard topic={topic} />
          </li>
        ))}
      </>
    );

    const dataList = {
      articles: articleList,
      topics: topicList
    };

    return dataList[dataType];
  };

  return (
    <section className="feed">
      <ul className="feed-list">{feedList()}</ul>
    </section>
  );
};

export default Feed;
