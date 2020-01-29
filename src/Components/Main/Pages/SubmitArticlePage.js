import React from 'react';

import { WindowConsumer } from '../../Context/WindowProvider';
import SubHeader from '../SubHeader/SubHeader';
import SideBar from '../SharedComponents/SideBar/SideBar';
import MainContainer from '../Containers/MainContainer/MainContainer';
import MessageCard from '../Cards/MessageCard/MessageCard';

const SubmitArticlePage = ({
  path,
  uri,
  sort_by,
  setSort_by,
  getAddtlData,
  users
}) => {
  return (
    <>
      <SubHeader
        path={path}
        uri={uri}
        sort_by={sort_by}
        setSort_by={setSort_by}
      />
      <MainContainer getAddtlData={getAddtlData} path={path}>
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
      </MainContainer>
    </>
  );
};

export default SubmitArticlePage;
