import React from 'react';
import { Link } from '@reach/router';
import './TopicCard.css';

const TopicCard = ({
  topic: {
    slug,
    description,
    img = `https://source.unsplash.com/244x175/?${slug}`
  }
}) => (
  <Link to={`/topics/${slug}`}>
    <div className="topic-card" style={{ backgroundImage: `url('${img}')` }}>
      <div className="topic-card-overlay">
        <div className="topic-card-content">
          <h2 className="featured-topic-title">{slug}</h2>
          <p className="featured-topic-desc">{description}</p>
        </div>
      </div>
    </div>
  </Link>
);

export default TopicCard;
