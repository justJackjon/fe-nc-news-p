import React, { useState } from 'react';

import Loader from '../../../../Utils/Loader/Loader';
import ArticleCard from '../../../Cards/ArticleCard/ArticleCard';
import Comments from './Comments/Comments';

import './Article.css';

const Article = ({
  pathArticleId,
  article,
  articleComments,
  updateMainState
}) => {
  // prevents re-rednering ALL children of 'Main.js'
  const [articleState, setArticleState] = useState({
    article,
    articleComments
  });

  return (
    <div className="article-and-comments">
      {+pathArticleId !== articleState.article.article_id ? (
        <Loader className="loading article-loader">
          <h1>COMING RIGHT UP!</h1>
        </Loader>
      ) : (
        <>
          <ArticleCard
            article={articleState.article}
            mainArticle={true}
            updateMainState={updateMainState}
          />
          <Comments
            articleComments={articleState.articleComments}
            articleId={articleState.article.article_id}
            updateMainState={updateMainState}
            updateArticleState={setArticleState}
          />
        </>
      )}
    </div>
  );
};

export default Article;
