import React, { useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import Article from '../ArticleContainer/Article/Article';

import '../Containers.css';
import './ArticleContainer.css';

const ArticleContainer = ({ children }) => {
  const [article, setArticle] = useState({
    article_id: 1,
    title: 'Running a Node App',
    body:
      'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
    votes: 0,
    topic: 'coding',
    author: 'jessjelly',
    created_at: '2016-08-18T12:07:52.389Z',
    comment_count: '8'
  });

  return (
    <>
      <div className="article-header">
        <h1>{article.title}</h1>
        <button className="article-close" onClick={() => window.history.back()}>
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
  );
};

export default ArticleContainer;
