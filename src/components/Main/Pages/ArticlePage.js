import React from 'react';
import { connect } from 'react-redux';

import SideBar from '../SharedComponents/SideBar/SideBar';
import ArticleContainer from '../Containers/ArticleContainer/ArticleContainer';

const ArticlePage = ({
  path,
  articleId,
  setError,
  initData,
  dimensions: { windowWidth }
  // getAddtlData,
  // loadAddtlData,
  // dataAvailable
}) => (
  <ArticleContainer articleId={articleId} setError={setError}>
    {windowWidth > 1024 && <SideBar path={path} users={initData.users} />}
  </ArticleContainer>
);

const mapStateToProps = ({ window: { dimensions } }) => ({ dimensions });

export default connect(mapStateToProps)(ArticlePage);
