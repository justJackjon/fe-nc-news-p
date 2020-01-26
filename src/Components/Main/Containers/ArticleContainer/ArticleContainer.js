import React, { useState, useEffect, useCallback, createRef } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Link } from '@reach/router';
import * as api from '../../../../api';

import Loader from '../../../Utils/Loader/Loader';
import Article from '../ArticleContainer/Article/Article';

import '../Containers.css';
import './ArticleContainer.css';

export const articleHeader = createRef();

const ArticleContainer = ({
  parent: { articleId },
  children,
  article,
  articleComments,
  updateMainState
}) => {
  const [prevLocation] = useState(window.history.state?.from);

  const fetchArticle = useCallback(() => {
    api.getData(`/articles/${articleId}`, 'article').then(article => {
      updateMainState({ article });
    });
  }, [articleId, updateMainState]);

  useEffect(() => {
    if (!article) fetchArticle();
    else if (article.article_id !== +articleId) {
      fetchArticle();
    }
  }, [article, articleId, fetchArticle]);

  return (
    <>
      {!article ? (
        <Loader className="loading">
          <h1>LOADING JUICY ARTICLES...</h1>
        </Loader>
      ) : (
        <>
          <div ref={articleHeader} className="article-header">
            <h1>{article.title}</h1>
            <Link to={prevLocation || '/'}>
              <button className="article-close">
                <Icon icon="times" />
                <span>CLOSE</span>
              </button>
            </Link>
          </div>
          <div className="article-container">
            <div className="article-sub-container">
              <Article
                pathArticleId={articleId}
                article={article}
                updateMainState={updateMainState}
                articleComments={articleComments}
              />
              {children}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ArticleContainer;
