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
  updateArticleState
}) => {
  const {
    loggedInUser: user,
    loggedIn,
    actions: { setOpenAuthModal }
  } = useContext(UserSettingsContext);

  const [comment, setComment] = useState('');
  const addNewComment = updateMainState(null, true);

  const handleSubmit = event => {
    event.preventDefault();
    // (Optimistically rendered - only updates ArticleState and re-renders Article.js and children)
    addNewComment(prevState => {
      let { comment_count, ...restOfArticle } = prevState.article;

      const placeholderComment = {
        comment_id: Math.random(), // temporary unique id/React key - also disables voting buttons as comment_id < 1
        author: user.username,
        article_id: articleId,
        votes: 0,
        created_at: new Date().toISOString(),
        body: comment
      };

      updateArticleState({
        articleComments: [placeholderComment, ...prevState.articleComments],
        article: {
          comment_count: +comment_count + 1,
          ...restOfArticle
        }
      });
      return;
    });

    // (Updates MainState when POST request is successful - allows proper voting on comment on receipt of actual comment_id.
    // Re-renders Main.js and children)
    api
      .postData(`articles/${articleId}/comments`, 'comment', {
        username: user.username,
        body: comment
      })
      .then(comment => {
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
