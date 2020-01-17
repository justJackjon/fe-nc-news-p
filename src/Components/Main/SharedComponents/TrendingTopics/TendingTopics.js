import React, { createRef, useEffect } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import TopicCard from '../../Cards/TopicCards/TopicCard/TopicCard';
import './TrendingTopics.css';
import Button from '../../../Controls/Buttons/Button';

const TendingTopics = ({ topics }) => {
  const topicList = createRef();
  // So far as I can tell, React does not support passive event listeners.
  // See https://github.com/facebook/react/issues/6436 for further info.
  useEffect(
    () =>
      topicList.current.addEventListener(
        'wheel',
        event => {
          event.preventDefault();
          if (topicList) {
            topicList.current.scrollBy({
              left: event.deltaY > 0 ? +250 : -250,
              behavior: 'smooth'
            });
          }
        },
        { passive: false }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleClick = () =>
    topicList.current.scroll({
      left: 1024,
      behavior: 'smooth'
    });

  return (
    <nav className="trending-topics">
      <ul ref={topicList} className="topic-list">
        {topics?.map(topic => (
          <li key={topic.slug} className="topic-item">
            <TopicCard topic={topic} />
          </li>
        ))}
      </ul>
      <Button
        className="btn-direction view-more-right"
        onClick={handleClick}
        aria-label="Scroll right"
      >
        <Icon icon="angle-double-right"></Icon>
      </Button>
    </nav>
  );
};

export default TendingTopics;
