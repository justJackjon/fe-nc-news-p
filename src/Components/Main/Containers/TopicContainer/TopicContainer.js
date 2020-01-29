import React from 'react';
import '../Containers.css';

const TopicContainer = ({ children }) => (
  <div className="main-content">
    <div className="main-content-container">{children}</div>
  </div>
);

export default TopicContainer;
