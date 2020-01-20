import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import './Loader.css';

const Loader = () => {
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
    <div className="loading">
      <Icon icon="spinner" size="4x" pulse />
      <h1>LOADING JUICY ARTICLES...</h1>
      {wait === 'long' && (
        <h3 className="long-load-message">It's taking longer than usual...</h3>
      )}
      {wait === 'veryLong' && (
        <h3 className="long-load-message-2">Hang tight...</h3>
      )}
    </div>
  );
};

export default Loader;
