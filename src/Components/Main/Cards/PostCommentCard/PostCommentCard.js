import React, { createRef, useContext, useState } from 'react';
import { Link } from '@reach/router';

import { UserSettingsContext } from '../../../Context/UserSettingsProvider';
import * as api from '../../../../api';
import Button from '../../../Controls/Buttons/Button';

import './PostCommentCard.css';

export const postCommentMarker = createRef();

const PostCommentCard = ({
  articleId,
  updateMainState,
  setArticle,
  setComments
}) => {
  const {
    loggedInUser: user,
    loggedIn,
    actions: { setOpenAuthModal }
  } = useContext(UserSettingsContext);

  const [comment, setComment] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const tempId = Math.random(); // temporary unique id/React key - also should disable voting buttons as comment_id < 1
    // (Optimistically rendered)
    setComments(prevState => {
      const placeholderComment = {
        comment_id: tempId,
        author: user.username,
        article_id: articleId,
        votes: 0,
        created_at: new Date().toISOString(),
        body: comment
      };
      return [placeholderComment, ...prevState];
    });

    setArticle(prevState => {
      let { comment_count, ...restOfArticle } = prevState;
      return {
        comment_count: comment_count + 1,
        ...restOfArticle
      };
    });

    // (Updates when POST request is successful - allows proper voting on comment on receipt of actual comment_id.
    api
      .postData(`articles/${articleId}/comments`, 'comment', {
        username: user.username,
        body: comment
      })
      .then(comment => {
        setComments(prevState => {
          const prevComments = prevState.filter(
            comment => comment.comment_id !== tempId
          );
          return [comment, ...prevComments];
        });
      })
      .catch(({ response: error }) => {
        updateMainState({ error });
      });
  };

  const LogInToComment = (
    <div className="login-to-comment-container">
      <h3 className="login-to-comment-message">
        Log in or sign up to leave a comment
      </h3>
      <div className="login-to-comment-buttons">
        <Button
          className="btn-regular btn-lg comment-form-login"
          onClick={event => setOpenAuthModal(true, 'postCommentCard', event)}
        >
          LOG IN
        </Button>
        <Button
          className="btn-solid btn-lg comment-form-signup"
          onClick={event => setOpenAuthModal(true, 'signUpButton', event)}
        >
          SIGN UP
        </Button>
      </div>
    </div>
  );

  const PostComment = (
    <div className="comment-form-container">
      <label
        id="postCommentLabel"
        htmlFor="postComment"
        className="comment-form-label"
      >
        <span>Comment as user</span>
      </label>{' '}
      <Link className="comment-as-username" to={`/users/${user.username}`}>
        {user.username}
      </Link>
      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          type="textarea"
          rows="5"
          id="postComment"
          aria-labelledby="postCommentLabel"
          aria-label="Post comment"
          placeholder="What do you think?"
          value={comment}
          onChange={event => setComment(event.target.value)}
          required
        />
        <div className="comment-button-container">
          <Button className="btn-md btn-solid">COMMENT</Button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      <div ref={postCommentMarker} className="post-comment-card-marker" />
      <div className="post-comment-card-container">
        {loggedIn ? PostComment : LogInToComment}
      </div>
    </>
  );
};

export default PostCommentCard;
