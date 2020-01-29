import React, { Component } from 'react';
import { WindowContext } from '../Context/WindowProvider';
import { Router, createMemorySource, createHistory } from '@reach/router';
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

export class Main extends Component {
  static contextType = WindowContext;
  setStuckSidebar = this.context.actions.setStuckSidebar;
  state = {
    history: null,
    error: false,
    initialLoad: true,
    loadAddtlData: false,
    dataAvailable: true,
    dataPage: 1,
    articles: [],
    userArticles: [],
    sort_by: 'created_at',
    currentSort: 'created_at',
    topics: [],
    users: []
  };

  updateMainState = (nextState, usePrev) => {
    return usePrev ? this.setState.bind(this) : this.setState({ ...nextState });
  };

  fetchNewData = (endPoint, dataType) => {
    // this.setStuckSidebar(true);
    this.setState({ loadAddtlData: true }, () => {
      api
        .getData(endPoint, dataType, { params: { p: this.state.dataPage + 1 } })
        .then(newData => {
          this.setState(prevState => {
            const { [dataType]: existingData } = prevState;
            const newTotal = existingData.length + newData.length;
            return {
              [dataType]: [...existingData, ...newData],
              dataAvailable: newTotal < newData[0].total_count,
              dataPage: prevState.dataPage + 1,
              loadAddtlData: false
            };
          });
        })
        .catch(({ response: error }) => {
          // this.setStuckSidebar(false);
          this.setState({ error, loadAddtlData: false });
        });
    });
  };

  getAddtlData = debounce(() => {
    const {
      fetchNewData,
      state: { error, loadAddtlData, dataAvailable }
    } = this;

    if (error || loadAddtlData || !dataAvailable) return;

    const windowHeight = window.innerHeight;
    const amountScrolled = document.documentElement.scrollTop;
    const totalHeight = document.documentElement.offsetHeight;
    const twoThirds = windowHeight * 0.66;

    if (windowHeight + amountScrolled >= totalHeight - twoThirds) {
      fetchNewData('articles', 'articles');
    }
  }, 100);

  getInitData = () => {
    const source = createMemorySource(window.location.pathname);
    const history = createHistory(source);
    Promise.all([
      api.getData('articles'),
      api.getData('topics'),
      api.getData('users')
    ])
      .then(data => {
        this.setState({
          history,
          articles: data[0],
          topics: data[1],
          users: data[2],
          initialLoad: false
        });
      })
      .catch(({ response: error }) => {
        this.setState({ initialLoad: false, error });
      });
  };

  componentDidMount() {
    this.getInitData();
  }

  refreshArticles() {
    const { sort_by } = this.state;
    api
      .getData('/articles', 'articles', {
        params: { sort_by }
      })
      .then(articles => {
        this.setState({ articles });
      })
      .catch(({ response: error }) => {
        this.setState({ error });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort_by !== this.state.sort_by) this.refreshArticles();
  }

  render() {
    const {
      error,
      initialLoad,
      loadAddtlData,
      dataAvailable,
      articles,
      userArticles,
      sort_by,
      currentSort,
      topics,
      users
    } = this.state;
    const { getAddtlData, updateMainState } = this;

    const mainProps = {
      error,
      initialLoad,
      loadAddtlData,
      dataAvailable,
      articles,
      userArticles,
      sort_by,
      currentSort,
      topics,
      users,
      getAddtlData,
      updateMainState
    };

    return (
      <main className="main">
        {initialLoad ? (
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
              {/* <HomePage path="/" sort_by={sort_by} updateMainState={updateMainState} getAddtlData={getAddtlData} topics={topics} users={users} articles={articles} loadAddtlData={loadAddtlData} dataAvailable={dataAvailable} /> */}
              <HomePage path="/" {...mainProps} />
              <TopicsPage path="/topics" {...mainProps} />
              <TopicPage path="/topics/:topic" {...mainProps} />
              <ArticlesPage path="/articles" {...mainProps} />
              <ArticlesPage path="/articles/sort_by/:sort_by" {...mainProps} />
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
  }
}

export default Main;
