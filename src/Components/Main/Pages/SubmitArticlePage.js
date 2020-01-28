import React from 'react';

import { WindowConsumer } from '../../Context/WindowProvider';
import SubHeader from '../SubHeader/SubHeader';
import SideBar from '../SharedComponents/SideBar/SideBar';
import HomeFeedContainer from '../Containers/HomeFeedContainer/HomeFeedContainer';
import MessageCard from '../Cards/MessageCard/MessageCard';

const SubmitArticlePage = ({ path, uri, sort_by, updateMainState, users }) => {
  return (
    <>
      <SubHeader
        path={path}
        uri={uri}
        sort_by={sort_by}
        updateMainState={updateMainState}
      />
      <HomeFeedContainer updateMainState={updateMainState} path={path}>
        <WindowConsumer>
          {({ windowWidth }) => {
            const showSideBar = windowWidth > 1024;
            return showSideBar && <SideBar users={users} />;
          }}
        </WindowConsumer>
        {/* RELEASE IN NEXT VERSION... */}
        <MessageCard
          icon="info-circle"
          title="We're still building this feature!"
          message="Check back soon."
        />
        {/* RELEASE IN NEXT VERSION... */}
      </HomeFeedContainer>
    </>
  );
};

export default SubmitArticlePage;
