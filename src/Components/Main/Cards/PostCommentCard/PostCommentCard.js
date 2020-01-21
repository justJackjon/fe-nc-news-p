import React from 'react';
import Button from '../../../Controls/Buttons/Button';
import './PostCommentCard.css';

const PostCommentCard = () => {
  const loggedIn = false;

  const LogInToComment = () => (
    <div className="login-to-comment-container">
      <h3 className="login-to-comment-message">
        Log in or sign up to leave a comment
      </h3>
      <div className="login-to-comment-buttons">
        <Button className="btn-regular btn-lg comment-form-login">
          LOG IN
        </Button>
        <Button className="btn-solid btn-lg comment-form-signup">
          SIGN UP
        </Button>
      </div>
    </div>
  );

  const PostComment = () => (
    // include in form: onSubmit={handleSubmit}
    <form className="comment-form">
      <label>
        <input
          type="search"
          id="postComment"
          aria-label="Post comment"
          placeholder="What do you think?"
          // value={term}
          // onChange={handleTermChange}
          required
        />
      </label>
    </form>
  );

  return (
    <div className="post-comment-card-container">
      {loggedIn ? <PostComment /> : <LogInToComment />}
    </div>
  );
};

export default PostCommentCard;
