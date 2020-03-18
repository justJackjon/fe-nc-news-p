import React, { useContext, useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Link } from '@reach/router';

import { postCommentMarker } from '../../Cards/PostCommentCard/PostCommentCard';
import { UserSettingsContext } from '../../../Context/UserSettingsProvider';
import * as api from '../../../../utils/api';
import { timeSinceCreation } from '../../../../utils/utils';
import VoteControl from '../../../Controls/VoteControls/VoteControl';
import Modal from '../../../Modals/Modal';
import Button from '../../../Controls/Buttons/Button';

import './CommentCard.css';

const CommentCard = ({ comment, setArticle, setComments, setError }) => {
  const {
    loggedInUser: { username: currentUser }
  } = useContext(UserSettingsContext);

  const [votes, setVotes] = useState(comment.votes);
  const [openModal, setOpenModal] = useState(false);

  const scrollToPostComment = () => {
    window.scrollBy({
      left: 0,
      top: postCommentMarker.current.getBoundingClientRect().top,
      behavior: 'smooth'
    });
  };

  const closeModal = decision => {
    if (decision === 'delete') {
      handleDelete();
    }
    setOpenModal(false);
  };

  const handleDelete = () => {
    api
      .deleteData(`comments/${comment.comment_id}`)
      .catch(({ response: error }) => setError(error));
    // (Optimistically rendered)
    setArticle(prevState => {
      let { comment_count, ...restOfArticle } = prevState;
      return {
        comment_count: +comment_count - 1,
        ...restOfArticle
      };
    });
    setComments(prevState => {
      return prevState.filter(comnt => comnt.comment_id !== comment.comment_id);
    });
  };

  return (
    <>
      {openModal && (
        <Modal className="modal-xs">
          <Icon icon="exclamation-circle" size="2x" />
          <h1>ARE YOU SURE?</h1>
          <p>Would you like to delete this comment?</p>
          <p>This action is irreversible.</p>
          <Button
            className="btn-solid btn-lg"
            onClick={() => closeModal('delete')}
          >
            DELETE
          </Button>
          <Button className="btn-accept btn-lg" onClick={() => closeModal()}>
            KEEP
          </Button>
        </Modal>
      )}
      <li className="comment">
        <div className="comment-left-column">
          <VoteControl
            voteType="comments"
            voteCount={votes}
            id={comment.comment_id}
            setCommentVotes={setVotes}
            setError={setError}
          />
          <hr className="comment-line-vertical" />
        </div>
        <div className="comment-right-column">
          <p className="comment-subhead">
            <span className="comment-subhead-author">
              <Link to={`/users/${comment.author}`}>{comment.author}</Link>
            </span>
            <span className="comment-subhead-votes">{` ${votes} votes • `}</span>
            <span className="comment-subhead-created">{` posted ${timeSinceCreation(
              comment.created_at
            )}`}</span>
          </p>
          <p className="comment-body">{comment.body}</p>
          <p className="comment-subfoot">
            <span
              className="comment-subfoot-comcount"
              onClick={scrollToPostComment}
            >
              <Icon icon="comment"></Icon>
              Add Comment
            </span>
            {currentUser === comment.author && (
              <span
                className="comment-subfoot-delcom"
                onClick={() => setOpenModal(true)}
              >
                <Icon icon="trash-alt"></Icon>
                Delete Comment
              </span>
            )}
          </p>
        </div>
      </li>
    </>
  );
};

export default CommentCard;
