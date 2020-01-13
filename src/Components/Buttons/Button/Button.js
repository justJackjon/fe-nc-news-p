import React from 'react';
import '../Buttons.css';
import './Button.css';

const Button = ({ className, children }) => {
  return (
    <button className={className}>
      <span>{children}</span>
    </button>
  );
};

export default Button;
