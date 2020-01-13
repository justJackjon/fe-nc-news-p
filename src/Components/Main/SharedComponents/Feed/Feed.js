import React from 'react';
import ArticleCard from '../../Cards/ArticleCard/ArticleCard';
import './Feed.css';

const Feed = () => {
  return (
    <section className="feed">
      <h2>FEED</h2>
      <ul className="feed-list">
        <li>
          <ArticleCard />
        </li>
        <li>
          <ArticleCard />
        </li>
        <li>
          <ArticleCard />
        </li>
        <li>
          <ArticleCard />
        </li>
        <li>
          <ArticleCard />
        </li>
        <li>
          <ArticleCard />
        </li>
        <li>
          <ArticleCard />
        </li>
        <li>
          <ArticleCard />
        </li>
        <li>
          <ArticleCard />
        </li>
        <li>
          <ArticleCard />
        </li>
        <li>
          <ArticleCard />
        </li>
      </ul>
    </section>
  );
};

export default Feed;
