import React, { Component, useEffect } from 'react';
import { WindowContext } from '../Context/WindowProvider';
import { Router } from '@reach/router';
import debounce from 'lodash.debounce';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import * as api from '../../api';

import SubHeader from './SubHeader/SubHeader';
import HomeFeedContainer from './Containers/HomeFeedContainer/HomeFeedContainer';
import TopicContainer from './Containers/HomeFeedContainer/HomeFeedContainer';
import ArticleContainer from './Containers/ArticleContainer/ArticleContainer';
import UserContainer from './Containers/HomeFeedContainer/HomeFeedContainer';

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
    longLoad: false,
    veryLongLoad: false,
    loadAddtlData: false,
    dataAvailable: true,
    dataPage: 1,
    mountSidebar: true,
    mountAddtlCard: true,
    articles: [],
    topics: [],
    users: []
  };

  fetchNewData = dataType => {
    this.setStuckSidebar(true);
    this.setState({ loadAddtlData: true }, () => {
      api
        .getData([dataType], { p: this.state.dataPage + 1 })
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
          this.setStuckSidebar(false);
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
      fetchNewData('articles');
    }
  }, 100);

  componentDidMount() {
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
    setTimeout(() => this.setState({ longLoad: true }), 2500);
    setTimeout(() => this.setState({ veryLongLoad: true }), 5000);
  }

  componentWillUnmount() {
    // clean-up here - leave as placeholder
  }

  componentDidUpdate(_, prevState) {
    const { windowWidth, windowHeight } = this.context;
    const mountSidebar = windowWidth > 1024;
    const mountAddtlCard = windowHeight > 945;
    if (
      mountSidebar === prevState.mountSidebar &&
      mountAddtlCard === prevState.mountAddtlCard
    )
      return;
    this.setState({ mountSidebar, mountAddtlCard });
  }

  render() {
    const {
      error,
      initialLoad,
      longLoad,
      veryLongLoad,
      loadAddtlData,
      dataAvailable,
      mountSidebar,
      mountAddtlCard,
      articles,
      topics,
      users
    } = this.state;
    const infiniteFeedProps = { loadAddtlData, dataAvailable };

    // At a later stage different sidebar compositions (with different card combinations) can be added.
    const ComposedSideBar = () => (
      <SideBar>
        <UserProfileCard />
        {mountAddtlCard && <TopUsersCard users={users?.slice(0, 5)} />}
        {/* <PopularTopicsCard /> */}
      </SideBar>
    );

    const HomePage = () => {
      useEffect(() => {
        window.addEventListener('scroll', this.getAddtlData);
      }, []);

      useEffect(() => {
        return () => {
          window.removeEventListener('scroll', this.getAddtlData);
        };
      });

      return (
        <>
          <SubHeader />
          <HomeFeedContainer>
            <TrendingTopics topics={topics} />
            {mountSidebar && <ComposedSideBar />}
            <Feed
              dataType="articles"
              articles={articles}
              {...infiniteFeedProps}
            />
          </HomeFeedContainer>
        </>
      );
    };

    const ArticlesPage = props => {
      useEffect(() => {
        window.addEventListener('scroll', this.getAddtlData);
      }, []);

      useEffect(() => {
        return () => {
          window.removeEventListener('scroll', this.getAddtlData);
        };
      });

      return (
        <>
          <SubHeader parent={props} />
          <HomeFeedContainer>
            {/* <TrendingTopics topics={topics} /> */}
            {mountSidebar && <ComposedSideBar />}
            <Feed
              dataType="articles"
              articles={articles}
              {...infiniteFeedProps}
            />
          </HomeFeedContainer>
        </>
      );
    };

    const TopicsPage = props => (
      <>
        <SubHeader parent={props} />
        <TopicContainer>
          {mountSidebar && <ComposedSideBar />}
          <Feed dataType="topics" topics={topics} {...infiniteFeedProps} />
        </TopicContainer>
      </>
    );

    const ArticlePage = () => (
      <ArticleContainer>{mountSidebar && <ComposedSideBar />}</ArticleContainer>
    );

    const UsersPage = props => (
      <>
        <SubHeader parent={props} />
        <UserContainer>
          {mountSidebar && <ComposedSideBar />}
          <Feed dataType="users" users={users} {...infiniteFeedProps} />
        </UserContainer>
      </>
    );

    return (
      <main className="main">
        {initialLoad ? (
          <div className="loading">
            <Icon icon="spinner" size="4x" pulse />
            <h1>LOADING JUICY ARTICLES...</h1>
            {longLoad && (
              <h3 className="long-load-message">
                It's taking longer than usual...
              </h3>
            )}
            {veryLongLoad && (
              <h3 className="long-load-message-2">Hang tight...</h3>
            )}
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Router className="main-router" primary={false}>
            <HomePage path="/" />
            <TopicsPage path="/topics/:topic" />
            <ArticlesPage path="/articles/:article" />
            <ArticlePage path="/articles/example" />
            <UsersPage path="/users/:user" />
          </Router>
        )}
      </main>
    );
  }
}

export default Main;
