import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import './Loader.css';

const Loader = ({ className, children }) => {
  const [wait, setWait] = useState(null);
  useEffect(() => {
    const timeoutOne = setTimeout(() => setWait('long'), 2500);
    const timeoutTwo = setTimeout(() => setWait('veryLong'), 5000);
    return () => {
      clearTimeout(timeoutOne);
      clearTimeout(timeoutTwo);
    };
  }, []);

  return (
    <div className={className}>
      <div className="loader-container">
        <Icon icon="spinner" size="4x" pulse />
        {children}
        {wait === 'long' && (
          <h3 className="long-load-message">
            It's taking longer than usual...
          </h3>
        )}
        {wait === 'veryLong' && (
          <h3 className="long-load-message">Hang tight...</h3>
        )}
      </div>
    </div>
  );
};

export default Loader;
