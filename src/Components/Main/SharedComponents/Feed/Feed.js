import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Link } from '@reach/router';

import ArticleCard from '../../Cards/ArticleCard/ArticleCard';
import TopicListCard from '../../Cards/TopicCards/TopicListCard/TopicListCard';
import UserListCard from '../../Cards/UserCards/UserListCard/UserListCard';

import './Feed.css';

const Feed = ({
  sort_by,
  path,
  articles,
  topics,
  users,
  dataType,
  loadAddtlData,
  dataAvailable,
  updateMainState
}) => {
  const feedList = () => {
    const articleList = articles?.map(article => (
      <li key={article.article_id} className="article-list-item">
        <ArticleCard article={article} updateMainState={updateMainState} />
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
          <h2>Click on a user to see their articles:</h2>
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

  const sortByRef = {
    created_at: 'DATE',
    comment_count: 'COMMENTS',
    votes: 'VOTES'
  };

  const showSortedBy = () => {
    if (path !== '/' && dataType === 'articles') return true;
  };

  return (
    <section className="feed">
      <ul className="feed-list">
        {showSortedBy() && (
          <li className="article-list-item sort-by-notification">
            <h3>
              ARTICLES SORTED BY {sortByRef[sort_by]} <Icon icon="check" />
            </h3>
          </li>
        )}
        {feedList()}
      </ul>
      <div className="end-infinite-feed">
        {loadAddtlData && (
          <>
            <Icon icon="spinner" size="4x" pulse />
            <h3>LOADING MORE {dataType.toUpperCase()}...</h3>
          </>
        )}
        {!dataAvailable && dataType === 'articles' && (
          <h3>
            No more {dataType}.<br />
            Would you like to
            <Link to={`/post`}>
              <span className="end-feed-submit"> add one?</span>
            </Link>
          </h3>
        )}
        {dataType !== 'articles' && (
          <h3>
            Would you like to
            <Link to={`/post`}>
              <span className="end-feed-submit">
                {' '}
                add a {dataType.slice(0, -1)}?
              </span>
            </Link>
          </h3>
        )}
      </div>
    </section>
  );
};

export default Feed;
