import React from 'react';
import ArticleCard from '../../Cards/ArticleCard/ArticleCard';
import TopicListCard from '../../Cards/TopicCards/TopicListCard/TopicListCard';
import UserListCard from '../../Cards/UserCards/UserListCard/UserListCard';
import './Feed.css';

const Feed = ({ dataType, articles, topics, users }) => {
  const feedList = () => {
    const articleList = articles?.map(article => (
      <li key={article.article_id} className="article-list-item">
        <ArticleCard article={article} />
      </li>
    ));

    const topicList = (
      <>
        <li className="list-subhead">
          <h2>Topics you might like</h2>
        </li>
        {topics?.map(topic => (
          <li key={topic.slug} className="list-item">
            <TopicListCard topic={topic} />
          </li>
        ))}
      </>
    );

    const userList = (
      <>
        <li className="list-subhead">
          <h2>Click on a user to access their NCN profile</h2>
        </li>
        {users?.map(user => (
          <li key={user.username} className="list-item">
            <UserListCard displayLocation="user-list" user={user} />
          </li>
        ))}
      </>
    );

    const dataList = {
      articles: articleList,
      topics: topicList,
      users: userList
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
