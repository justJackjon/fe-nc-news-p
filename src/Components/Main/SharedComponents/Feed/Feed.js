import React, { useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Link } from '@reach/router';
import * as api from '../../../../api';

import ArticleCard from '../../Cards/ArticleCard/ArticleCard';
import TopicListCard from '../../Cards/TopicCards/TopicListCard/TopicListCard';
import UserListCard from '../../Cards/UserCards/UserListCard/UserListCard';

import './Feed.css';

const Feed = ({
  dataType,
  articles,
  topics,
  users,
  loadAddtlData,
  dataAvailable,
  parent,
  updateArticles
}) => {
  const previousSortBy = useRef(parent?.sort_by);

  const refreshFeed = useCallback(() => {
    api
      .getData('/articles', 'articles', {
        params: { sort_by: parent.sort_by }
      })
      .then(articles => {
        updateArticles(articles);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parent?.sort_by]);

  useEffect(() => {
    console.log(previousSortBy.current, '<-------------------------');
    console.log(parent?.sort_by, '<-------------------------');
    console.log(
      previousSortBy.current !== parent?.sort_by,
      '<-------------------------'
    );
    if (previousSortBy.current !== parent?.sort_by) {
      refreshFeed();
      previousSortBy.current = parent.sort_by;
    }
    return () => {
      console.log(
        'unnnmmmmmmmooooooooooounnnnnnnnnnnnnntiiiiiiiiiiiinnnnnnnnnnggggggg'
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parent?.sort_by, refreshFeed]);

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

  const sortByRef = {
    created_at: 'DATE',
    comment_count: 'COMMENTS',
    votes: 'VOTES'
  };

  return (
    <section className="feed">
      <ul className="feed-list">
        {parent?.sort_by && (
          <li className="article-list-item sort-by-notification">
            <h3>
              ARTICLES SORTED BY {sortByRef[parent?.sort_by]}{' '}
              <Icon icon="check" />
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
            <Link to={`/${dataType}`}>
              <span className="end-feed-submit"> add one?</span>
            </Link>
          </h3>
        )}
        {dataType !== 'articles' && (
          <h3>
            Would you like to
            <Link to={`/${dataType}`}>
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
