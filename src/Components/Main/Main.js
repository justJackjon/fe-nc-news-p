import React, { useState, useEffect } from 'react';
import { Router } from '@reach/router';

import * as api from '../../utils/api';
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
  const [refresh, setRefresh] = useState(false);
  const [initLoad, setInitLoad] = useState(true);
  const [initData, setInitData] = useState({
    articles: [],
    topics: [],
    users: []
  });
  const [error, setError] = useState(false);
  const [sort_by, setSort_by] = useState('created_at');
  const [currParams, setCurrParams] = useState({
    sort_by: 'created_at',
    topic: undefined,
    author: undefined
  });

  const getInitData = () => {
    Promise.all([
      api.getData('articles'),
      api.getData('topics'),
      api.getData('users')
    ])
      .then(data => {
        setInitData({
          articles: data[0],
          topics: data[1],
          users: data[2]
        });
        setInitLoad(false);
      })
      .catch(({ response: error }) => {
        setError(error);
        setInitLoad(false);
      });
  };

  useEffect(() => {
    getInitData();
  }, []);

  const mainProps = {
    initData,
    refresh,
    setRefresh,
    error, // may not need this - infinite load MIGHT use it in Feed.js
    setError,
    sort_by,
    setSort_by,
    currParams,
    setCurrParams
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
            <ErrorPage default />
          </ScrollToTop>
        </Router>
      )}
    </main>
  );
};

export default Main;
