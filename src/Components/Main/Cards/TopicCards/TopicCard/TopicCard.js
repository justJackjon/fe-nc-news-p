import React from 'react';
import { Link } from '@reach/router';
import './TopicCard.css';

const TopicCard = ({ topic }) => {
  return (
    <Link to={`/topics/${topic.slug}`}>
      <div
        className="topic-card"
        style={{
          backgroundImage: `url('https://source.unsplash.com/244x175/?${topic.slug}')`
        }}
      >
        <div className="topic-card-overlay">
          <div className="topic-card-content">
            <h2 className="trending-topic-title">{topic.slug}</h2>
            <p className="trending-topic-desc">{topic.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TopicCard;
