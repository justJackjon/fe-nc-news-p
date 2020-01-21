import React, { createRef, useEffect, useRef, useContext } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { UserSettingsContext } from '../../Context/UserSettingsProvider';
import './UserNotificationBar.css';

const notificationBar = createRef();

const UserNotificationBar = props => {
  const { displayNotification } = useContext(UserSettingsContext);
  const prevNotification = useRef(displayNotification);

  useEffect(() => {
    const fadeOutAndRemove = () => {
      notificationBar.current.classList.remove('fade-out');
      notificationBar.current.classList.remove('remove');
      setTimeout(() => {
        notificationBar.current.classList.add('fade-out');
      }, 2000);
      setTimeout(() => {
        notificationBar.current.classList.add('remove');
      }, 2450);
    };
    if (notificationBar.current) fadeOutAndRemove();
    prevNotification.current = displayNotification;
    // return fadeOutAndRemove;
  });

  return (
    prevNotification.current !== displayNotification && (
      <div {...props} ref={notificationBar}>
        <h3 className="notification-bar-message">
          {displayNotification}
          <Icon icon="check" />
          {props.children}
        </h3>
      </div>
    )
  );
};

export default UserNotificationBar;
