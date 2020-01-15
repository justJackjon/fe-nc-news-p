import React from 'react';
import '../Containers.css';

const HomeFeedContainer = ({ children }) => {
  return (
    <div className="main-content">
      <div className="main-content-container">{children}</div>
    </div>
  );
};

export default HomeFeedContainer;
