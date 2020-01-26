import React, { Component } from 'react';
import { WindowContext } from '../Context/WindowProvider';
import { Router } from '@reach/router';
import debounce from 'lodash.debounce';

import * as api from '../../api';
import ScrollToTop from '../Utils/ScrollToTop';
import Loader from '../Utils/Loader/Loader';

import SubHeader from './SubHeader/SubHeader';
import HomeFeedContainer from './Containers/HomeFeedContainer/HomeFeedContainer';
import TopicContainer from './Containers/TopicContainer/TopicContainer';
import ArticleContainer from './Containers/ArticleContainer/ArticleContainer';
import UserContainer from './Containers/UserContainer/UserContainer';

import TrendingTopics from './SharedComponents/TrendingTopics/TendingTopics';
import Feed from './SharedComponents/Feed/Feed';
import SideBar from './SharedComponents/SideBar/SideBar';

// Sidebar components:
import UserProfileCard from '../../Components/Main/Cards/UserCards/UserProfileCard/UserProfileCard';
import TopUsersCard from '../../Components/Main/Cards/UserCards/TopUsersCard/TopUsersCard';
// import PopularTopicsCard from '../../Components/Main/Cards/TopicCards/PopularTopicsCard/PopularTopicsCard';

import './Main.css';

export class Main extends Component {
  static contextType = WindowContext;
  setStuckSidebar = this.context.actions.setStuckSidebar;
  state = {
    error: false,
    initialLoad: true,
    loadAddtlData: false,
    dataAvailable: true,
    dataPage: 1,
    articles: [],
    topicArticles: [],
    userArticles: [],
    sort_by: 'date',
    article: null,
    articleComments: [],
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
        .catch(err => {
          // this.setStuckSidebar(false);
          this.setState({
            error: err.message,
            loadAddtlData: false
          });
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
    Promise.all([
      api.getData('articles'),
      api.getData('topics'),
      api.getData('users')
    ]).then(data => {
      this.setState({
        articles: data[0],
        topics: data[1],
        users: data[2],
        initialLoad: false
      });
    });
  };

  componentDidMount() {
    this.getInitData();
    console.log(
      '**** tidy up comments into additional comment card component ****'
    );
    console.log('**** make sure you are fetching ALL comments ****');
    console.log(
      '**** add display notification on error/success of deleted comment ****'
    );
  }

  componentWillUnmount() {
    //
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(
      '**** tidy up comments into additional comment card component ****'
    );
    console.log('**** make sure you are fetching ALL comments ****');
    console.log(
      '**** add display notification on error/success of deleted comment ****'
    );
  }

  render() {
    const { windowWidth, windowHeight } = this.context;
    const {
      error,
      initialLoad,
      loadAddtlData,
      dataAvailable,
      articles,
      topicArticles,
      userArticles,
      sort_by,
      article,
      articleComments,
      topics,
      users
    } = this.state;
    const { getAddtlData, updateMainState } = this;
    const infiniteFeedProps = { loadAddtlData, dataAvailable };

    // At a later stage different sidebar compositions (with different card combinations) can be added.
    const ComposedSidebar = ({ parent: { ...props } }) => {
      const numOfTopUsers = props?.path === '/articles/:articleId' ? 3 : 5;
      return (
        <SideBar parent={{ ...props }}>
          <UserProfileCard />
          {windowHeight > 945 && (
            <TopUsersCard users={users?.slice(0, numOfTopUsers)} />
          )}
          {windowHeight <= 945 && windowHeight >= 840 && (
            <TopUsersCard users={users?.slice(0, 3)} />
          )}
          {/* <PopularTopicsCard /> */}
        </SideBar>
      );
    };
    // const LoadedFeed = () => (
    //   <Feed
    //     articles={articles}
    //     topics={topics}
    //     users={users}
    //     initialLoad={initialLoad}
    //     updateMainState={this.updateMainState}
    //     dataType="articles"
    //     parent={props}
    //     {...infiniteFeedProps}
    //   />
    // );

    const HomePage = props => (
      <>
        <SubHeader parent={props} />
        <HomeFeedContainer parent={props} getAddtlData={getAddtlData}>
          <TrendingTopics topics={topics} />
          {windowWidth > 1024 && <ComposedSidebar />}
          <Feed
            sort_by={sort_by}
            parent={props}
            articles={articles}
            topics={topics}
            users={users}
            initialLoad={initialLoad}
            updateMainState={updateMainState}
            dataType="articles"
            {...infiniteFeedProps}
          />
        </HomeFeedContainer>
      </>
    );

    const ArticlesPage = props => (
      <>
        <SubHeader parent={props} />
        <HomeFeedContainer parent={props} getAddtlData={getAddtlData}>
          {/* <TrendingTopics topics={topics} /> */}
          {windowWidth > 1024 && <ComposedSidebar />}
          <Feed
            sort_by={sort_by}
            parent={props}
            articles={articles}
            topics={topics}
            users={users}
            initialLoad={initialLoad}
            updateMainState={updateMainState}
            dataType="articles"
            {...infiniteFeedProps}
          />
        </HomeFeedContainer>
      </>
    );

    const ArticlePage = props => {
      return (
        <ArticleContainer
          parent={props}
          article={article}
          updateMainState={updateMainState}
          articleComments={articleComments}
        >
          {windowWidth > 1024 && <ComposedSidebar parent={props} />}
        </ArticleContainer>
      );
    };

    const TopicsPage = props => (
      <>
        <SubHeader parent={props} />
        <HomeFeedContainer parent={props}>
          {windowWidth > 1024 && <ComposedSidebar />}
          <Feed
            sort_by={sort_by}
            parent={props}
            articles={articles}
            topics={topics}
            users={users}
            initialLoad={initialLoad}
            updateMainState={updateMainState}
            dataType="topics"
            {...infiniteFeedProps}
          />
        </HomeFeedContainer>
      </>
    );

    const TopicPage = props => {
      return (
        <>
          <SubHeader parent={props} />
          <TopicContainer
            updateMainState={updateMainState}
            topicArticles={topicArticles}
            parent={props}
          >
            {windowWidth > 1024 && <ComposedSidebar />}
            <Feed
              sort_by={sort_by}
              parent={props}
              topics={topics}
              users={users}
              initialLoad={initialLoad}
              updateMainState={updateMainState}
              dataType="articles"
              articles={topicArticles}
              {...infiniteFeedProps}
            />
          </TopicContainer>
        </>
      );
    };

    const UsersPage = props => (
      <>
        <SubHeader parent={props} />
        <HomeFeedContainer parent={props}>
          {windowWidth > 1024 && <ComposedSidebar />}
          <Feed
            sort_by={sort_by}
            parent={props}
            articles={articles}
            topics={topics}
            users={users}
            initialLoad={initialLoad}
            updateMainState={updateMainState}
            dataType="users"
            {...infiniteFeedProps}
          />
        </HomeFeedContainer>
      </>
    );

    const UserPage = props => {
      return (
        <>
          <SubHeader parent={props} />
          <UserContainer
            updateMainState={updateMainState}
            userArticles={userArticles}
            parent={props}
          >
            {windowWidth > 1024 && <ComposedSidebar />}
            <Feed
              sort_by={sort_by}
              parent={props}
              topics={topics}
              users={users}
              initialLoad={initialLoad}
              updateMainState={updateMainState}
              dataType="articles"
              articles={userArticles}
              {...infiniteFeedProps}
            />
          </UserContainer>
        </>
      );
    };

    return (
      <main className="main">
        {initialLoad ? (
          <Loader className="loading">
            <h1>LOADING JUICY ARTICLES...</h1>
          </Loader>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Router className="route-container" primary={false}>
            <ScrollToTop path="/">
              <HomePage path="/" />
              <TopicsPage path="/topics" />
              <TopicPage path="/topics/:topic" />
              <ArticlesPage path="/articles" />
              <ArticlesPage path="/articles/sort_by/:sort_by" />
              <ArticlePage path="/articles/:articleId" />
              <UsersPage path="/users" />
              <UserPage path="/users/:author" />
            </ScrollToTop>
          </Router>
        )}
      </main>
    );
  }
}

export default Main;
