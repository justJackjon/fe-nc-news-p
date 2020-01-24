import React, { useContext, useState } from 'react';
import { Link } from '@reach/router';

import { UserSettingsContext } from '../../../Context/UserSettingsProvider';
import * as api from '../../../../api';
import Button from '../../../Controls/Buttons/Button';

import './PostCommentCard.css';

const PostCommentCard = ({ articleComments, articleId, updateMainState }) => {
  const {
    loggedInUser: user,
    loggedIn,
    actions: { setOpenAuthModal }
  } = useContext(UserSettingsContext);

  const [comment, setComment] = useState('');
  const addNewComment = updateMainState(null, true);

  const handleSubmit = event => {
    event.preventDefault();
    api.postData(`articles/${articleId}/comments`, 'comment', {
      username: user.username,
      body: comment
    });
    // (Optimistically rendered)
    addNewComment(prevState => {
      let { comment_count, ...restOfArticle } = prevState.article;
      return {
        articleComments: [comment, ...prevState.articleComments],
        article: {
          comment_count: +comment_count + 1,
          ...restOfArticle
        }
      };
    });
  };

  const LogInToComment = () => (
    <div className="login-to-comment-container">
      <h3 className="login-to-comment-message">
        Log in or sign up to leave a comment
      </h3>
      <div className="login-to-comment-buttons">
        <Button
          className="btn-regular btn-lg comment-form-login"
          onClick={event => setOpenAuthModal(true, 'PostCommentCard', event)}
        >
          LOG IN
        </Button>
        <Button
          className="btn-solid btn-lg comment-form-signup"
          onClick={event => setOpenAuthModal(true, 'PostCommentCard', event)}
        >
          SIGN UP
        </Button>
      </div>
    </div>
  );

  const PostComment = () => (
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
    <div className="post-comment-card-container">
      {loggedIn ? <PostComment /> : <LogInToComment />}
    </div>
  );
};

export default PostCommentCard;
