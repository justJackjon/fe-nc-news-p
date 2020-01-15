import React from 'react';
import '../Containers.css';

const UserContainer = ({ children }) => {
  return (
    <div className="main-content">
      <div className="main-content-container">{children}</div>;
    </div>
  );
};

export default UserContainer;
