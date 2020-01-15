import React from 'react';
import TopicCard from '../../Cards/TopicCards/TopicCard/TopicCard';
import './TrendingTopics.css';

const TendingTopics = () => {
  return (
    <nav className="trending-topics">
      <h2>TENDING TOPICS</h2>
      <ul className="topic-list">
        <li className="topic-item">
          <TopicCard />
        </li>
        <li>
          <TopicCard />
        </li>
        <li>
          <TopicCard />
        </li>
        <li>
          <TopicCard />
        </li>
      </ul>
    </nav>
  );
};

export default TendingTopics;
