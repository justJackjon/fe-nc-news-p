import React from 'react';

import SubHeader from '../SubHeader/SubHeader';
import MainContainer from '../Containers/MainContainer/MainContainer';
import TrendingTopics from '../SharedComponents/TrendingTopics/TendingTopics';

const HomePage = props => {
  const { path, topics, sort_by, setSort_by } = props;

  return (
    <>
      <SubHeader path={path} sort_by={sort_by} setSort_by={setSort_by} />
      <MainContainer {...props}>
        <TrendingTopics topics={topics} />
      </MainContainer>
    </>
  );
};

export default HomePage;
