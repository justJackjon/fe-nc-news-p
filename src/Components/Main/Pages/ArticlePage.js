import React from 'react';

import { WindowConsumer } from '../../Context/WindowProvider';
import SideBar from '../SharedComponents/SideBar/SideBar';
import ArticleContainer from '../Containers/ArticleContainer/ArticleContainer';

const ArticlePage = ({
  path,
  articleId,
  setError,
  users
  // getAddtlData,
  // loadAddtlData,
  // dataAvailable
}) => {
  return (
    <ArticleContainer articleId={articleId} setError={setError}>
      <WindowConsumer>
        {({ windowWidth }) => {
          const showSideBar = windowWidth > 1024;
          return showSideBar && <SideBar path={path} users={users} />;
        }}
      </WindowConsumer>
    </ArticleContainer>
  );
};

export default ArticlePage;
