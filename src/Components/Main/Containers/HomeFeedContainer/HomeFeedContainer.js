import React from 'react';
import '../Containers.css';
import './HomeFeedContainer.css';

const HomeFeedContainer = ({ children }) => {
  return <div className="home-feed-container main-container">{children}</div>;
};

export default HomeFeedContainer;
