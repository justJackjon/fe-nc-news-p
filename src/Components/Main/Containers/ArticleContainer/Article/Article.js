import React from 'react';

import ArticleCard from '../../../Cards/ArticleCard/ArticleCard';
import Comments from './Comments/Comments';

import './Article.css';

const Article = ({ article }) => {
  return (
    <div className="article-and-comments">
      <ArticleCard article={article} mainArticle={true} />
      <Comments />
    </div>
  );
};

export default Article;
