import React, { useState, useCallback, useEffect } from 'react';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash.debounce';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Link } from '@reach/router';

import * as api from '../../../../api';

import Loader from '../../../Utils/Loader/Loader';
import ArticleCard from '../../Cards/ArticleCard/ArticleCard';
import TopicListCard from '../../Cards/TopicCards/TopicListCard/TopicListCard';
import UserListCard from '../../Cards/UserCards/UserListCard/UserListCard';

import './Feed.css';

const Feed = ({
  path,
  initData,
  topic,
  author,
  sort_by,
  currParams,
  setCurrParams,
  refresh,
  setRefresh,
  setError
}) => {
  const [displayLoader, setDisplayLoader] = useState(false);
  const [articles, setArticles] = useState(initData.articles);
  const [topics, setTopics] = useState(initData.topics);
  const [users, setUsers] = useState(initData.users);
  const [loadingAddtlData, setLoadingAddtlData] = useState(false);
  const [infScroll, setInfScroll] = useState({
    dataAvailable: true,
    dataPage: 1
  });

  // [dataType, dataSource, setMethod]
  const pathRef = {
    '/': ['articles', articles, setArticles],
    '/topics': ['topics', topics, setTopics],
    '/topics/:topic': ['articles', articles, setArticles],
    '/articles': ['articles', articles, setArticles],
    '/users': ['users', users, setUsers],
    '/users/:author': ['articles', articles, setArticles]
  };
  // Determines what kind of data the Feed will display...
  const [dataType, dataSource, setMethod] = pathRef[path];

  // Sets a placeholder card advising the client there are no articles in the db:
  const noArticles = useCallback(() => {
    const forTopic = path === '/topics/:topic';
    setMethod([
      {
        article_id: forTopic ? `../topics/${topic}` : `../users/${author}`,
        title: `No articles for '${forTopic ? topic : author}'`,
        body: null,
        votes: null,
        topic: forTopic ? topic : 'N/A',
        author: 'the server',
        created_at: new Date().toISOString(),
        comment_count: 'No'
      }
    ]);
  }, [author, path, setMethod, topic]);

  const refreshData = useCallback(() => {
    setDisplayLoader(true);
    api
      .getData(dataType, dataType, {
        params: { sort_by, topic, author }
      })
      .then(data => {
        if (data.length) setMethod(data);
        else noArticles();
      })
      .catch(({ response: error }) => {
        if (error.status === 404 && dataType === 'articles') noArticles();
        else setError(error);
      })
      .finally(() => {
        setDisplayLoader(false);
        setCurrParams({ sort_by, topic, author });
        setInfScroll({
          dataAvailable: true,
          dataPage: 1
        });
      });
  }, [
    author,
    dataType,
    noArticles,
    setCurrParams,
    setError,
    setMethod,
    sort_by,
    topic
  ]);

  useEffect(() => {
    if (!refresh) setRefresh(true);
    // ONLY on mount:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // used Lodash instead of long conditional...
    if (!isEqual(currParams, { sort_by, topic, author }) && refresh)
      refreshData();
  }, [author, currParams, refresh, refreshData, sort_by, topic]);

  ///////////////////////// INFINITE LOADING... /////////////////////////
  const fetchNewData = (dataType, totalCount) => {
    setLoadingAddtlData(true);
    api
      .getData(dataType, dataType, {
        params: { ...currParams, p: infScroll.dataPage + 1 }
      })
      .then(newData => {
        setMethod(prevState => {
          const dbCount = newData[0] && newData[0][totalCount];
          const localCount = prevState.length + newData.length;
          const addToLocal = dbCount > prevState.length;
          setInfScroll(prevState => ({
            dataAvailable: localCount < dbCount,
            dataPage: addToLocal ? prevState.dataPage + 1 : prevState.dataPage
          }));
          return addToLocal ? [...prevState, ...newData] : [...prevState];
        });
      })
      .then(() => setLoadingAddtlData(false))
      .catch(({ response: error }) => setError(error));
  };

  const getAddtlData = debounce(() => {
    if (displayLoader || loadingAddtlData || !infScroll.dataAvailable) return;

    const { scrollTop, offsetHeight } = document.documentElement;
    const { innerHeight } = window;
    const amountScrolled = innerHeight + scrollTop;
    const reqTrigger = offsetHeight - (innerHeight + 0.66);

    if (amountScrolled >= reqTrigger) fetchNewData('articles', 'total_count');
  }, 100);

  const getAddtl = useCallback(() => {
    getAddtlData();
  }, [getAddtlData]);

  useEffect(() => {
    if (path === '/topics/:topic') return;
    // ^^ pagination bug for articles by topic in back end - remove condition when fixed //
    if (dataType === 'articles' || dataType === 'comments') {
      window.addEventListener('scroll', getAddtl);
      return () => window.removeEventListener('scroll', getAddtl);
    }
  }, [dataType, getAddtl, path]);

  const feedList = () => {
    return dataSource?.map(data => {
      const propRef = {
        articles: { key: data.article_id, className: 'article-list-item' },
        topics: { key: data.slug, className: 'list-item' },
        users: { key: data.username, className: 'list-item' }
      };
      const cardRef = {
        articles: <ArticleCard article={data} setError={setError} />,
        topics: <TopicListCard topic={data} />,
        users: <UserListCard displayLocation="user-list" user={data} />
      };
      return <li {...propRef[dataType]}> {cardRef[dataType]} </li>;
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
    <>
      {displayLoader ? (
        <Loader className="loading article-loader feed-loader">
          <h1>COMING RIGHT UP!</h1>
        </Loader>
      ) : (
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
            {loadingAddtlData && (
              <>
                <Icon icon="spinner" size="4x" pulse />
                <h3>LOADING MORE {dataType.toUpperCase()}...</h3>
              </>
            )}
            {!infScroll.dataAvailable && dataType === 'articles' && (
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
      )}
    </>
  );
};

export default Feed;
