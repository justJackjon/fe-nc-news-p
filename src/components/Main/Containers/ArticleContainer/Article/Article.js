import React from 'react';

import Loader from '../../../../Utils/Loader/Loader';
import ArticleCard from '../../../Cards/ArticleCard/ArticleCard';
import Comments from './Comments/Comments';

import './Article.css';

const Article = ({ pathArticleId, article, setArticle, setError }) => {
  return (
    <div className="article-and-comments">
      {+pathArticleId !== article.article_id ? (
        <Loader className="loading article-loader">
          <h1>COMING RIGHT UP!</h1>
        </Loader>
      ) : (
        <>
          <ArticleCard
            article={article}
            mainArticle={true}
            setError={setError}
          />
          <Comments
            articleId={article.article_id}
            setError={setError}
            setArticle={setArticle}
          />
        </>
      )}
    </div>
  );
};

export default Article;
