import React, { useCallback, useEffect } from 'react';
import '../Containers.css';

const HomeFeedContainer = ({ getAddtlData, path, children }) => {
  const getAddtl = useCallback(() => {
    getAddtlData();
  }, [getAddtlData]);

  useEffect(() => {
    // Remove the conditional below when infinite scroll is setup for other data types too...
    if (path === '/' || path === '/articles') {
      window.addEventListener('scroll', getAddtl);
      return () => {
        window.removeEventListener('scroll', getAddtl);
      };
    }
  }, [getAddtl, path]);

  return (
    <div className="main-content">
      <div className="main-content-container">{children}</div>
    </div>
  );
};

export default HomeFeedContainer;
