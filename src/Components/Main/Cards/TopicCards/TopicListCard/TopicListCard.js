import React from 'react';
import { Link } from '@reach/router';
import ncnLogo from '../../../../../ncnlogo-rb.svg';
import './TopicListCard.css';

const TopicListCard = ({ topic }) => {
  return (
    <div className="topic-list-container">
      <Link to={`${topic.slug}`}>
        <div className="topic-list-image-container">
          <img
            className="topic-list-image"
            src={`https://source.unsplash.com/48x48/?${topic.slug}`}
            alt="Topic Profile"
          />
        </div>
      </Link>
      <div className="topic-list-text">
        <h3 className="topic-list-slug">
          <Link to={`${topic.slug}`}>{topic.slug}</Link>
        </h3>
        <p className="topic-list-desc">
          <Link to={`${topic.slug}`}>{topic.description}</Link>
        </p>
      </div>
    </div>
  );
};

export default TopicListCard;
