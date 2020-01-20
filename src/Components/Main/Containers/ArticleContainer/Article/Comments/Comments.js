import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import * as api from '../../../../../../api';
import VoteControl from '../../../../../Controls/VoteControls/VoteControl';
import './Comments.css';

const Comments = ({ articleId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    api.getData(`articles/${articleId}/comments`, 'comments').then(comments => {
      setComments(comments);
    });
  }, []);

  return (
    <>
      <form className="add-comment-form"></form>
      <form className="sort-comments-form"></form>
      <ul className="comments">
        {comments.map(comment => {
          return (
            <li key={comment.comment_id} className="comment">
              <div className="comment-left-column">
                <VoteControl />
                <div className="comment-line-vertical" />
              </div>
              <div className="comment-right-column">
                <p className="comment-subhead">
                  <span className="comment-subhead-author">
                    {comment.author}
                  </span>
                  <span className="comment-subhead-votes">{` ${comment.votes} votes • `}</span>
                </p>
                <p className="comment-body">{comment.body}</p>
                <p className="article-subfoot">
                  <span className="article-subfoot-comcount">
                    <Icon icon="comment"></Icon>
                    Reply
                  </span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Comments;
