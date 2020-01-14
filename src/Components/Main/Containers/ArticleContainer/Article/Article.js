import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import VoteControl from '../../../../Controls/VoteControls/VoteControl';
import Comments from './Comments/Comments';
import './Article.css';

const Article = ({ article }) => {
  return (
    <>
      <div className="article-section">
        <article className="article">
          <div className="article-left-column">
            <VoteControl className="inc-votes" />
          </div>
          <div className="article-right-column">
            <p className="article-subhead">
              <span className="article-subhead-topic">{article.topic}</span>
              <span className="article-subhead-author">{` • Posted by ${article.author}`}</span>
            </p>
            <p className="article-body">{article.body}</p>
            <p className="article-subfoot">
              <span className="article-subfoot-comcount">
                <Icon icon="comment"></Icon>
                {`${article.comment_count} Comments`}
              </span>
            </p>
          </div>
        </article>
        <div className="comments-section">
          <Comments />
        </div>
      </div>
    </>
  );
};

export default Article;
