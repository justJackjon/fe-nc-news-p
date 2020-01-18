import React, { forwardRef } from 'react';

const Modal = forwardRef((props, ref) => (
  <div className="modal-container">
    <div {...props} ref={ref}>
      {props.children}
    </div>
  </div>
));

export default Modal;
