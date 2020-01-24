import React from 'react';

import ArticleCard from '../../../Cards/ArticleCard/ArticleCard';
import Comments from './Comments/Comments';

import './Article.css';

const Article = ({ article, articleComments, updateMainState }) => {
  return (
    <div className="article-and-comments">
      <ArticleCard article={article} mainArticle={true} />
      <Comments
        articleComments={articleComments}
        articleId={article.article_id}
        updateMainState={updateMainState}
      />
    </div>
  );
};

export default Article;
