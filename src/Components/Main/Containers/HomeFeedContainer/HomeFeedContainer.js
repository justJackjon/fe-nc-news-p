import React from 'react';
import TrendingTopics from '../../SharedComponents/TrendingTopics/TendingTopics';
import Feed from '../../SharedComponents/Feed/Feed';
import SideBar from '../../SharedComponents/SideBar/SideBar';
import '../Containers.css';
import './HomeFeedContainer.css';

const HomeFeedContainer = () => {
  return (
    <div className="home-feed-container main-container">
      <TrendingTopics />
      <Feed />
      <SideBar />
    </div>
  );
};

export default HomeFeedContainer;
