import React, { useState, useEffect, useCallback } from 'react';
import { Router } from '@reach/router';
import debounce from 'lodash.debounce';

import * as api from '../../api';
import ScrollToTop from '../Utils/ScrollToTop';
import Loader from '../Utils/Loader/Loader';

// Pages
import HomePage from './Pages/HomePage';
import TopicsPage from './Pages/TopicsPage';
import TopicPage from './Pages/TopicPage';
import ArticlesPage from './Pages/ArticlesPage';
import ArticlePage from './Pages/ArticlePage';
import UsersPage from './Pages/UsersPage';
import UserPage from './Pages/UserPage';
import SubmitArticlePage from './Pages/SubmitArticlePage';
import ErrorPage from './Pages/ErrorPage';

import MessageCard from '../Main/Cards/MessageCard/MessageCard';

import './Main.css';

const Main = () => {
  const [initLoad, setInitLoad] = useState(true);
  // const [initData, setInitData] = useState({
  //   articles: [],
  //   topics: [],
  //   users: []
  // });
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [loadAddtlData, setLoadAddtlData] = useState(false);
  const [dataAvailable, setDataAvailable] = useState(true);
  const [dataPage, setDataPage] = useState(1);
  const [sort_by, setSort_by] = useState('created_at');
  const [currentSort, setCurrentSort] = useState('created_at');

  const fetchNewData = (endPoint, dataType) => {
    // this.setStuckSidebar(true);
    setLoadAddtlData(true);
    api
      .getData(endPoint, dataType, { params: { p: dataPage + 1 } })
      .then(newData => {
        if (dataType === 'articles')
          setArticles(prevState => {
            const newTotal = prevState.length + newData.length;
            setDataAvailable(newTotal < newData[0].total_count);
            setDataPage(dataPage + 1);
            setLoadAddtlData(false);
            return [...prevState, ...newData];
          });
      })
      .catch(({ response: error }) => {
        // this.setStuckSidebar(false);
        setError(error);
        setLoadAddtlData(true);
      });
  };

  const getAddtlData = debounce(() => {
    if (error || loadAddtlData || !dataAvailable) return;

    const windowHeight = window.innerHeight;
    const amountScrolled = document.documentElement.scrollTop;
    const totalHeight = document.documentElement.offsetHeight;
    const twoThirds = windowHeight * 0.66;

    if (windowHeight + amountScrolled >= totalHeight - twoThirds) {
      fetchNewData('articles', 'articles');
    }
  }, 100);

  const getInitData = () => {
    Promise.all([
      api.getData('articles'),
      api.getData('topics'),
      api.getData('users')
    ])
      .then(data => {
        setArticles(data[0]);
        setTopics(data[1]);
        setUsers(data[2]);
        setInitLoad(false);
      })
      .catch(({ response: error }) => {
        setError(error);
        setInitLoad(false);
      });
  };

  const refreshArticles = useCallback(() => {
    api
      .getData('/articles', 'articles', {
        params: { sort_by }
      })
      .then(articles => setArticles(articles))
      .catch(({ response: error }) => setError(error));
  }, [sort_by]);

  useEffect(() => {
    getInitData();
  }, []);

  useEffect(() => {
    if (currentSort !== sort_by) {
      refreshArticles();
      setCurrentSort(sort_by);
    }
  }, [sort_by, refreshArticles, currentSort]);

  const mainProps = {
    initLoad,
    setInitLoad,
    articles,
    setArticles,
    topics,
    setTopics,
    users,
    setUsers,
    error,
    setError,
    loadAddtlData,
    setLoadAddtlData,
    dataAvailable,
    setDataAvailable,
    dataPage,
    setDataPage,
    sort_by,
    setSort_by,
    currentSort,
    setCurrentSort,
    getAddtlData
  };

  return (
    <main className="main">
      {initLoad ? (
        <Loader className="loading">
          <h1>LOADING JUICY ARTICLES...</h1>
        </Loader>
      ) : error ? (
        <MessageCard
          icon="exclamation-circle"
          title={`${error.status} Error`}
          message={error.data.msg}
        />
      ) : (
        <Router className="route-container" primary={false}>
          <ScrollToTop path="/">
            <HomePage path="/" {...mainProps} />
            <TopicsPage path="/topics" {...mainProps} />
            <TopicPage path="/topics/:topic" {...mainProps} />
            <ArticlesPage path="/articles" {...mainProps} />
            <ArticlePage path="/articles/:articleId" {...mainProps} />
            <UsersPage path="/users" {...mainProps} />
            <UserPage path="/users/:author" {...mainProps} />
            <SubmitArticlePage path="/post" {...mainProps} />
            <ErrorPage default users={users} />
          </ScrollToTop>
        </Router>
      )}
    </main>
  );
};

export default Main;
