import React, { useEffect, createRef, useCallback } from 'react';

import * as api from '../../../../../../api';
import PostCommentCard from '../../../../Cards/PostCommentCard/PostCommentCard';
import CommentCard from '../../../../Cards/CommentCard/CommentCard';

import './Comments.css';

export const commentsMarker = createRef();

const Comments = ({
  articleComments,
  articleId,
  updateMainState,
  updateArticleState
}) => {
  const fetchComments = useCallback(() => {
    api
      .getData(`articles/${articleId}/comments`, 'comments')
      .then(articleComments => {
        updateMainState({ articleComments });
      })
      .catch(({ response: error }) => {
        updateMainState({ error });
      });
  }, [articleId, updateMainState]);

  useEffect(() => {
    if (!articleComments.length) fetchComments();
    else if (articleComments[0].article_id !== +articleId) {
      fetchComments();
    }
  }, [articleComments, articleId, fetchComments]);

  return (
    <>
      <PostCommentCard
        articleId={articleId}
        updateMainState={updateMainState}
        updateArticleState={updateArticleState}
      />
      <div ref={commentsMarker} className="comments-marker" />
      <hr className="comments-list-top-divider" />
      <ul className="comments">
        {articleComments.map(comment => {
          return (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              updateMainState={updateMainState}
            />
          );
        })}
      </ul>
    </>
  );
};

export default Comments;
