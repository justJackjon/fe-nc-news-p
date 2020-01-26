import React, { useContext, useState, useRef } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import * as api from '../../../api';
import { UserSettingsContext } from '../../Context/UserSettingsProvider';
import Modal from '../../Modals/Modal';
import Button from '../../Controls/Buttons/Button';

import './VoteControl.css';

const VoteControl = ({
  voteType,
  voteCount,
  id,
  className,
  setCommentVotes
}) => {
  const {
    loggedIn,
    actions: { setOpenAuthModal }
  } = useContext(UserSettingsContext);
  const prevVotes = useRef(voteCount);
  const [votes, setVotes] = useState(voteCount);
  const [openModal, setOpenModal] = useState(false);

  const closeModal = decision => {
    if (decision === 'remove') {
      api.patchData(`${voteType}/${id}`, voteType.slice(-1), {
        inc_votes: prevVotes.current - votes
      });
      // (Optimistic rendering)
      if (setCommentVotes) setCommentVotes(prevVotes.current);
      setVotes(prevVotes.current);
    }
    setOpenModal(false);
  };

  const handleClick = (vote, event) => {
    if (!loggedIn) setOpenAuthModal(true, 'voteControl', event);
    if (votes !== prevVotes.current) {
      setOpenModal(true);
      return;
    }
    api.patchData(`${voteType}/${id}`, voteType.slice(-1), {
      inc_votes: vote
    });
    // (Optimistic rendering)
    if (setCommentVotes) setCommentVotes(votes + vote);
    setVotes(votes + vote);
  };

  return (
    <>
      {openModal && (
        <Modal className="modal-xs">
          <Icon icon="exclamation-circle" size="2x" />
          <h3>You have already voted.</h3>
          <p>Would you like to remove your current vote?</p>
          <Button
            className="btn-solid btn-lg"
            onClick={() => closeModal('remove')}
          >
            REMOVE
          </Button>
          <Button
            className="btn-accept btn-lg"
            onClick={() => closeModal('keep')}
          >
            KEEP
          </Button>
        </Modal>
      )}
      <div className={className ? `${className} vote-control` : 'vote-control'}>
        <button
          className="vote-control-button upvote-icon"
          aria-label="upvote"
          onClick={event => handleClick(1, event)}
        >
          <Icon icon="angle-up" size="2x" />
        </button>
        {className?.includes('inc-votes') && <span>{votes}</span>}
        <button
          className="vote-control-button downvote-icon"
          aria-label="downvote"
          onClick={event => handleClick(-1, event)}
        >
          <Icon icon="angle-down" size="2x" />
        </button>
      </div>
    </>
  );
};

export default VoteControl;
