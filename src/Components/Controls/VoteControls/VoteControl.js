import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import './VoteControl.css';

const VoteControl = ({ voteCount, className, children }) => {
  return (
    <div className={className ? `${className} vote-control` : 'vote-control'}>
      <Icon className="upvote-control" icon="angle-up" size="2x" />
      {className?.includes('inc-votes') && <span>{voteCount}</span>}
      <Icon className="downvote-control" icon="angle-down" size="2x" />
    </div>
  );
};

export default VoteControl;
