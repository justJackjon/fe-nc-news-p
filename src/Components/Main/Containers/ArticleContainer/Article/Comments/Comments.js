import React, { useState, useEffect, createRef, useCallback } from 'react';

import * as api from '../../../../../../api';
import PostCommentCard from '../../../../Cards/PostCommentCard/PostCommentCard';
import CommentCard from '../../../../Cards/CommentCard/CommentCard';

import './Comments.css';

export const commentsMarker = createRef();

const Comments = ({ articleId, setError, setArticle }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = useCallback(() => {
    api
      .getData(`articles/${articleId}/comments`, 'comments')
      .then(articleComments => setComments(articleComments))
      .catch(({ response: error }) => setError(error));
  }, [articleId, setError]);

  useEffect(() => {
    if (!comments.length) fetchComments();
    else if (comments[0].article_id !== +articleId) {
      fetchComments();
    }
  }, [comments, articleId, fetchComments]);

  return (
    <>
      <PostCommentCard
        articleId={articleId}
        setError={setError}
        setArticle={setArticle}
        setComments={setComments}
      />
      <div ref={commentsMarker} className="comments-marker" />
      <hr className="comments-list-top-divider" />
      <ul className="comments">
        {comments.map(comment => {
          return (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              setArticle={setArticle}
              setComments={setComments}
              setError={setError}
            />
          );
        })}
      </ul>
    </>
  );
};

export default Comments;
