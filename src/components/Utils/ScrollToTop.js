import React from 'react';

const ScrollToTop = ({ className, children, location }) => {
  React.useEffect(
    () =>
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      }),
    [location.pathname]
  );
  return <div className={className}>{children}</div>;
};

export default ScrollToTop;
