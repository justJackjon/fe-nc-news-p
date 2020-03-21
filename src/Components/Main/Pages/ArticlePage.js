import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';

import SideBar from '../SharedComponents/SideBar/SideBar';
import ArticleContainer from '../Containers/ArticleContainer/ArticleContainer';

const ArticlePage = ({
  path,
  articleId,
  setError,
  initData,
  windowDimensions: { windowWidth }
  // getAddtlData,
  // loadAddtlData,
  // dataAvailable
}) => (
  <ArticleContainer articleId={articleId} setError={setError}>
    {windowWidth > 1024 && <SideBar path={path} users={initData.users} />}
  </ArticleContainer>
);

ArticlePage.propTypes = {
  windowDimensions: object.isRequired
};

const mapStateToProps = ({ windowDimensions }) => ({ windowDimensions });

export default connect(mapStateToProps)(ArticlePage);
