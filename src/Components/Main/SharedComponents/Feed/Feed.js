import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Link } from '@reach/router';

import ArticleCard from '../../Cards/ArticleCard/ArticleCard';
import TopicListCard from '../../Cards/TopicCards/TopicListCard/TopicListCard';
import UserListCard from '../../Cards/UserCards/UserListCard/UserListCard';

import './Feed.css';

const Feed = ({
  path,
  sort_by,
  dataSource,
  dataType,
  loadAddtlData,
  dataAvailable,
  setError
}) => {
  // Getting a non-unique key for topics? li item - needs debugging - use alternative feedList function below until resolved.
  // const feedList = () => {
  //   return dataSource?.map(data => {
  //     const listRef = {
  //       articles: (
  //         <li key={data.article_id} className={'article-list-item'}>
  //           <ArticleCard article={data} setError={setError} />
  //         </li>
  //       ),
  //       topics: (
  //         <li key={data.slug} className={'list-item'}>
  //           <TopicListCard topic={data} />
  //         </li>
  //       ),
  //       users: (
  //         <li key={data.username} className={'list-item'}>
  //           <UserListCard displayLocation="user-list" user={data} />
  //         </li>
  //       )
  //     };
  //     return <> {listRef[dataType]} </>;
  //   });
  // };

  const feedList = () => {
    return dataSource?.map(data => {
      const listRef = {
        articles: {
          card: <ArticleCard article={data} setError={setError} />,
          key: data.article_id,
          classType: 'article-list-item'
        },
        topics: {
          card: <TopicListCard topic={data} />,
          key: data.slug,
          classType: 'list-item'
        },
        users: {
          card: <UserListCard displayLocation="user-list" user={data} />,
          key: data.username,
          classType: 'list-item'
        }
      };
      return (
        <li key={listRef[dataType].key} className={listRef[dataType].classType}>
          {listRef[dataType].card}
        </li>
      );
    });
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
        {dataType === 'topics' && (
          <li className="list-subhead">
            <h2>Topics you might like</h2>
          </li>
        )}
        {dataType === 'users' && (
          <li className="list-subhead">
            <h2>Click on a user to see their articles:</h2>
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
