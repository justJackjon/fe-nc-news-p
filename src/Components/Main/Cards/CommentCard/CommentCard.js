import React, { useContext } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import { UserSettingsContext } from '../../../Context/UserSettingsProvider';
import * as api from '../../../../api';
import { timeSinceCreation } from '../../../../utils';
import VoteControl from '../../../Controls/VoteControls/VoteControl';

import './CommentCard.css';

const CommentCard = ({ comment, updateMainState }) => {
  const {
    loggedInUser: { username: currentUser }
  } = useContext(UserSettingsContext);

  const removeComment = updateMainState(null, true);

  return (
    <li className="comment">
      <div className="comment-left-column">
        <VoteControl />
        <div className="comment-line-vertical" />
      </div>
      <div className="comment-right-column">
        <p className="comment-subhead">
          <span className="comment-subhead-author">{comment.author}</span>
          <span className="comment-subhead-votes">{` ${comment.votes} votes • `}</span>
          <span className="comment-subhead-created">{` posted ${timeSinceCreation(
            comment.created_at
          )}`}</span>
        </p>
        <p className="comment-body">{comment.body}</p>
        <p className="comment-subfoot">
          <span className="comment-subfoot-comcount">
            <Icon icon="comment"></Icon>
            Add a Comment
          </span>
          {currentUser === comment.author && (
            <span
              className="comment-subfoot-delcom"
              onClick={() => {
                api.deleteData(`comments/${comment.comment_id}`);
                // (Optimistically rendered)
                removeComment(prevState => {
                  const { article, articleComments } = prevState;
                  let { comment_count, ...restOfArticle } = article;
                  const nextArticleComments = articleComments.filter(
                    comnt => comnt.comment_id !== comment.comment_id
                  );
                  return {
                    articleComments: nextArticleComments,
                    article: {
                      comment_count: +comment_count - 1,
                      ...restOfArticle
                    }
                  };
                });
              }}
            >
              <Icon icon="trash-alt"></Icon>
              Delete Comment
            </span>
          )}
        </p>
      </div>
    </li>
  );
};

export default CommentCard;
