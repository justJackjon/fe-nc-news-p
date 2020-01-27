import React from 'react';
import { navigate } from '@reach/router';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import Button from '../../../Controls/Buttons/Button';
import './MessageCard.css';

const MessageCard = ({ icon, title, message }) => {
  return (
    <section className="message-container">
      <Icon icon={icon} size="10x" />
      <div className="message-text-content">
        <h1 style={{ margin: '0.25rem' }}>{title}</h1>
        <p>{message}</p>
      </div>
      <Button className="btn-solid btn-lg" onClick={() => navigate(`/`)}>
        GO HOME
      </Button>
    </section>
  );
};

export default MessageCard;
