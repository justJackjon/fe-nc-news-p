import React, { createRef, useEffect } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import TopicCard from '../../Cards/TopicCards/TopicCard/TopicCard';
import './TrendingTopics.css';

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
      <div className="view-more-right" onClick={handleClick}>
        <Icon icon="angle-double-right"></Icon>
      </div>
    </nav>
  );
};

export default TendingTopics;
