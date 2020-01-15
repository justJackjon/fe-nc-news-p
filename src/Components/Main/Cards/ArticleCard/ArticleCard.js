import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import VoteControl from '../../../Controls/VoteControls/VoteControl';
import './ArticleCard.css';

const ArticleCard = ({ article, mainArticle }) => {
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
          <span className="article-subhead-topic">{article.topic}</span>
          <span className="article-subhead-author">{` • Posted by ${article.author}`}</span>
        </p>
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
      </div>
    </article>
  );
};

export default ArticleCard;
