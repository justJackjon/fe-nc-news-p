import React, { Component } from 'react';
import { MainContext } from '../Context/MainProvider';
import { Router } from '@reach/router';

import SubHeader from './SubHeader/SubHeader';
import HomeFeedContainer from './Containers/HomeFeedContainer/HomeFeedContainer';

import TrendingTopics from './SharedComponents/TrendingTopics/TendingTopics';
import Feed from './SharedComponents/Feed/Feed';
import SideBar from './SharedComponents/SideBar/SideBar';

import './Main.css';

export class Main extends Component {
  static contextType = MainContext;
  render() {
    const HomeFeed = () => {
      return (
        <HomeFeedContainer>
          {this.context.windowWidth > 480 && <TrendingTopics />}
          {this.context.windowWidth > 1024 && <SideBar />}
          <Feed />
        </HomeFeedContainer>
      );
    };

    return (
      <main className="main">
        <SubHeader />
        <h2>MAIN COMPONENT</h2>

        <Router>
          <HomeFeed path="/" />
        </Router>
      </main>
    );
  }
}

export default Main;
