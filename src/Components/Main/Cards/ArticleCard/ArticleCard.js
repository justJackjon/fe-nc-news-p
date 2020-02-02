import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Link } from '@reach/router';

import { timeSinceCreation } from '../../../../utils';
import VoteControl from '../../../Controls/VoteControls/VoteControl';
import { commentsMarker } from '../../Containers/ArticleContainer/Article/Comments/Comments';
import './ArticleCard.css';

const ArticleCard = ({ article, mainArticle, setError }) => {
  const handleClick = () => {
    if (/\/articles\/\d+/.test(window.location.pathname)) {
      window.scrollBy({
        left: 0,
        top: commentsMarker.current.getBoundingClientRect().top,
        behavior: 'smooth'
      });
    }
  };

  return (
    <article className="article-card">
      <div
        className={
          mainArticle ? 'article-left-column' : 'article-card-left-column'
        }
      >
        {article.votes && (
          <VoteControl
            voteType="articles"
            voteCount={article.votes}
            id={article.article_id}
            className="inc-votes"
            setError={setError}
          />
        )}
      </div>
      <div className="article-right-column">
        <p className="article-subhead">
          <Link to={`/topics/${article.topic}`}>
            <span className="article-subhead-topic">{article.topic}</span>
          </Link>
          <span className="article-subhead-author">{` • Posted by ${article.author}`}</span>
          <span className="article-subhead-created">{` ${timeSinceCreation(
            article.created_at
          )}`}</span>
        </p>
        <Link
          to={`/articles/${article.article_id}`}
          state={{ from: window.location.pathname }}
        >
          {!mainArticle && (
            <h2 className="article-card-title">{article?.title}</h2>
          )}
          <p className="article-body">{article.body}</p>
          <p className="article-subfoot">
            <span className="article-subfoot-comcount" onClick={handleClick}>
              <Icon icon="comment"></Icon>
              {`${article.comment_count} Comments`}
            </span>
          </p>
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;
