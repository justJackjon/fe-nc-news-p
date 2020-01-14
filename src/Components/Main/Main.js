import React, { Component } from 'react';
import { MainContext } from '../Context/MainProvider';
import { Router } from '@reach/router';

import SubHeader from './SubHeader/SubHeader';
import HomeFeedContainer from './Containers/HomeFeedContainer/HomeFeedContainer';
import TopicContainer from './Containers/HomeFeedContainer/HomeFeedContainer';
import ArticleContainer from './Containers/ArticleContainer/ArticleContainer';
import UserContainer from './Containers/HomeFeedContainer/HomeFeedContainer';

import TrendingTopics from './SharedComponents/TrendingTopics/TendingTopics';
import Feed from './SharedComponents/Feed/Feed';
import SideBar from './SharedComponents/SideBar/SideBar';

import './Main.css';

export class Main extends Component {
  static contextType = MainContext;

  render() {
    const { windowWidth } = this.context;
    const HomePage = () => {
      return (
        <HomeFeedContainer>
          {windowWidth > 480 && <TrendingTopics />}
          {windowWidth > 1024 && <SideBar />}
          <Feed />
        </HomeFeedContainer>
      );
    };
    const TopicPage = () => {
      return (
        <TopicContainer>
          {windowWidth > 1024 && <SideBar />}
          <Feed />
        </TopicContainer>
      );
    };
    const ArticlePage = () => {
      return (
        <ArticleContainer>{windowWidth > 1024 && <SideBar />}</ArticleContainer>
      );
    };
    const UserPage = () => {
      return (
        <UserContainer>
          {windowWidth > 1024 && <SideBar />}
          <Feed />
        </UserContainer>
      );
    };

    return (
      <main className="main">
        <SubHeader />
        <h2>MAIN COMPONENT</h2>

        <Router primary={false}>
          <HomePage path="/" />
          <TopicPage path="/topics" />
          <ArticlePage path="/articles" />
          <UserPage path="/users" />
        </Router>
      </main>
    );
  }
}

export default Main;
