import React, { createRef } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import TopicCard from '../../Cards/TopicCards/TopicCard/TopicCard';
import './TrendingTopics.css';

const topicList = createRef();

const TendingTopics = ({ topics }) => {
  return (
    <nav className="trending-topics">
      <ul ref={topicList} className="topic-list">
        {topics?.map(topic => (
          <li key={topic.slug} className="topic-item">
            <TopicCard topic={topic} />
          </li>
        ))}
      </ul>
      <div
        className="view-more-right"
        onClick={() =>
          topicList.current.scroll({
            left: 1000,
            behavior: 'smooth'
          })
        }
      >
        <Icon icon="angle-double-right"></Icon>
      </div>
    </nav>
  );
};

export default TendingTopics;
