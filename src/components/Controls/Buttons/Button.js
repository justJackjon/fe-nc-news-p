import React, { forwardRef } from 'react';

const Button = forwardRef((props, ref) => (
  <button {...props} ref={ref}>
    <span>{props.children}</span>
  </button>
));

export default Button;
