import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Link } from '@reach/router';

import VoteControl from '../../../Controls/VoteControls/VoteControl';

import './ArticleCard.css';

const ArticleCard = ({ article, mainArticle }) => {
  const timeSinceCreation = created => {
    let diffInSeconds = Math.abs(Date.now() - Date.parse(created)) / 1000;

    const years = Math.floor(diffInSeconds / 31540000);
    if (years) return `around ${years} year${years > 1 ? 's' : ''} ago`;
    diffInSeconds -= years * 31540000;

    const days = Math.floor(diffInSeconds / 86400);
    if (days) return `${days} day${days > 1 ? 's' : ''} ago`;
    diffInSeconds -= days * 86400;

    const hours = Math.floor(diffInSeconds / 3600) % 24;
    if (hours) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    diffInSeconds -= hours * 3600;

    const minutes = Math.floor(diffInSeconds / 60) % 60;
    if (minutes) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    // diffInSeconds -= minutes * 60;

    // const seconds = diffInSeconds % 60; // in theory the modulus is not required

    return `just now`;
  };
  return (
    <article className="article-card">
      <div
        className={
          mainArticle ? 'article-left-column' : 'article-card-left-column'
        }
      >
        <VoteControl voteCount={article.votes} className="inc-votes" />
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
        <Link to={`/articles/${article.article_id}`}>
          {!mainArticle && (
            <h2 className="article-card-title">{article?.title}</h2>
          )}
          <p className="article-body">{article.body}</p>
          <p className="article-subfoot">
            <span className="article-subfoot-comcount">
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
