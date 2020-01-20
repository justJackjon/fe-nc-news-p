import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import * as api from '../../../../api';

import Loader from '../../../Utils/Loader/Loader';
import Article from '../ArticleContainer/Article/Article';

import '../Containers.css';
import './ArticleContainer.css';

const ArticleContainer = ({ parent: { articleId }, children }) => {
  const [article, setArticle] = useState(null);

  const fetchArticle = () => {
    api.getData(`/articles/${articleId}`, 'article').then(article => {
      setArticle(article);
    });
  };

  useEffect(() => {
    if (!article) fetchArticle();
    if (article?.article_id !== articleId) fetchArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!article ? (
        <Loader />
      ) : (
        <>
          <div className="article-header">
            <h1>{article.title}</h1>
            <button
              className="article-close"
              onClick={() => window.history.back()}
            >
              <Icon icon="times" />
              <span>CLOSE</span>
            </button>
          </div>
          <div className="article-container">
            <div className="article-sub-container">
              <Article article={article} />
              {children}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ArticleContainer;
