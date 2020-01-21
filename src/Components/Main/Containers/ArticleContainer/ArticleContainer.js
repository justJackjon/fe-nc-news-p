import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  createRef
} from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import * as api from '../../../../api';

import Loader from '../../../Utils/Loader/Loader';
import Article from '../ArticleContainer/Article/Article';

import '../Containers.css';
import './ArticleContainer.css';

export const articleHeader = createRef();

const ArticleContainer = ({ parent: { articleId }, children }) => {
  const prevArticleId = useRef(articleId);
  const [article, setArticle] = useState(null);

  const fetchArticle = useCallback(() => {
    api.getData(`/articles/${articleId}`, 'article').then(article => {
      setArticle(article);
    });
  }, [articleId]);

  useEffect(() => {
    if (prevArticleId !== articleId) {
      fetchArticle();
      prevArticleId.current = articleId;
    }
  }, [articleId, fetchArticle]);

  return (
    <>
      {!article ? (
        <Loader />
      ) : (
        <>
          <div ref={articleHeader} className="article-header">
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
