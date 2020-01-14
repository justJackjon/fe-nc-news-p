import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import './VoteControl.css';

const VoteControl = ({ className, children }) => {
  return (
    <div className={className ? `${className} vote-control` : 'vote-control'}>
      <Icon className="upvote-control" icon="angle-up" size="lg" />
      {className?.includes('inc-votes') && <span>69.7k</span>}
      <Icon className="downvote-control" icon="angle-down" size="lg" />
    </div>
  );
};

export default VoteControl;
