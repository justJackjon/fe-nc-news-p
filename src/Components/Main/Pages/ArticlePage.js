import React, { useEffect } from 'react';

import { WindowConsumer } from '../../Context/WindowProvider';
import SideBar from '../SharedComponents/SideBar/SideBar';
import ArticleContainer from '../Containers/ArticleContainer/ArticleContainer';

const ArticlePage = props => {
  const {
    updateMainState,
    users
    // getAddtlData,
    // loadAddtlData,
    // dataAvailable
  } = props;

  return (
    <ArticleContainer parent={props} updateMainState={updateMainState}>
      <WindowConsumer>
        {({ windowWidth }) => {
          const showSideBar = windowWidth > 1024;
          return showSideBar && <SideBar parent={props} users={users} />;
        }}
      </WindowConsumer>
    </ArticleContainer>
  );
};

export default ArticlePage;
