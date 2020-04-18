import React, { memo, useState, createRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { selectTreatmentValue } from '@splitsoftware/splitio-redux';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import TopicCard from '../../Cards/TopicCards/TopicCard/TopicCard';
import Button from '../../../Controls/Buttons/Button';
import loaderImg from '../../../../assets/global/images/infinity-loader.svg';

import './FeaturedTopics.css';

const topicList = createRef();

const TendingTopics = memo(({ topics: defaultTopics, flags, CMS }) => {
  const cmsCarousel =
    selectTreatmentValue(flags, 'contentful_carousel') === 'on';

  const getInitTopics = () => {
    if (cmsCarousel) {
      return Array(5).fill({
        slug: 'Loading Topics...',
        description: '',
        img: loaderImg
      });
    } else return defaultTopics;
  };

  const [carouselTopics, setCarouselTopics] = useState(getInitTopics());

  const handleClick = () =>
    topicList.current.scroll({
      left: 1024,
      behavior: 'smooth'
    });

  const horizontalScroll = event => {
    event.preventDefault();
    if (topicList.current) {
      topicList.current.scrollBy({
        left: event.deltaY > 0 ? +250 : -250,
        behavior: 'smooth'
      });
    }
  };

  useEffect(
    () => {
      if (topicList.current) {
        // So far as I can tell, React does not support passive event listeners.
        // See https://github.com/facebook/react/issues/6436 for further info.
        topicList.current.addEventListener('wheel', horizontalScroll, {
          passive: false
        });
      }
      if (cmsCarousel) {
        CMS.getEntries({
          content_type: 'trendingTopicCard',
          order: 'fields.slot'
        })
          .then(({ items }) => {
            return items.map(item => {
              const img = `https:${item.fields.img.fields.file.url}`;
              return { ...item.fields, img };
            });
          })
          .then(carouselTopics => {
            setCarouselTopics(carouselTopics);
          });
      }
      return () =>
        topicList.current.removeEventListener('wheel', horizontalScroll);
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <nav className="featured-topics">
      <ul ref={topicList} className="topic-list">
        {carouselTopics?.map(topic => (
          <li
            key={
              topic.slug.includes('Loading Topics...')
                ? Math.random()
                : topic.slug
            }
            className="topic-item"
          >
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
});

const mapStateToProps = ({ flags, CMS }) => ({
  flags,
  CMS
});

export default connect(mapStateToProps)(TendingTopics);
