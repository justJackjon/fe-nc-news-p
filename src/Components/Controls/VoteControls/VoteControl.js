import React, { useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import * as api from '../../../api';
import './VoteControl.css';

const VoteControl = ({
  voteType,
  voteCount,
  id,
  className,
  setCommentVotes
}) => {
  const [votes, setVotes] = useState(voteCount);
  const handleVote = vote => {
    api.patchData(`${voteType}/${id}`, voteType.slice(-1), {
      inc_votes: vote
    });
    // (Optimistic rendering)
    if (setCommentVotes) setCommentVotes(votes + vote);
    setVotes(votes + vote);
  };

  return (
    <div className={className ? `${className} vote-control` : 'vote-control'}>
      <Icon
        className="upvote-control"
        icon="angle-up"
        size="2x"
        onClick={() => handleVote(1)}
      />
      {className?.includes('inc-votes') && <span>{votes}</span>}
      <Icon
        className="downvote-control"
        icon="angle-down"
        size="2x"
        onClick={() => handleVote(-1)}
      />
    </div>
  );
};

export default VoteControl;
