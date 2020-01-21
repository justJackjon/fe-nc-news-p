import React, { useCallback, useEffect } from 'react';
import '../Containers.css';

const HomeFeedContainer = ({ getAddtlData, parent, children }) => {
  const getAddtl = useCallback(() => {
    getAddtlData();
  }, [getAddtlData]);

  useEffect(() => {
    // Remove the conditional below when infinite scroll is setup for other data types too...
    if (parent.path === '/' || parent.path === '/articles') {
      window.addEventListener('scroll', getAddtl);
      return () => {
        window.removeEventListener('scroll', getAddtl);
      };
    }
  }, [getAddtl, parent.path]);

  return (
    <div className="main-content">
      <div className="main-content-container">{children}</div>
    </div>
  );
};

export default HomeFeedContainer;
