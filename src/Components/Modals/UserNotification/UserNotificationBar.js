import React, { createRef, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import './UserNotificationBar.css';

const notificationBar = createRef();

const UserNotificationBar = ({
  displayNotification,
  children,
  dispatch,
  ...restOfProps
}) => {
  const prevNotification = useRef(displayNotification);

  useEffect(() => {
    const fadeOutAndRemove = () => {
      notificationBar.current.classList.remove('fade-out');
      notificationBar.current.classList.remove('remove');
      setTimeout(() => {
        notificationBar?.current &&
          notificationBar.current.classList.add('fade-out');
      }, 2000);
      setTimeout(() => {
        notificationBar?.current &&
          notificationBar.current.classList.add('remove');
      }, 2450);
    };
    if (notificationBar.current) fadeOutAndRemove();
    prevNotification.current = displayNotification;
  });

  return (
    prevNotification.current !== displayNotification && (
      <div {...restOfProps} ref={notificationBar}>
        <h3 className="notification-bar-message">
          {displayNotification}
          <Icon icon="check" />
          {children}
        </h3>
      </div>
    )
  );
};

const mapStateToProps = ({ user: { displayNotification } }) => ({
  displayNotification
});

export default connect(mapStateToProps)(UserNotificationBar);
