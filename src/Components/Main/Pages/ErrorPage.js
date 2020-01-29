import React from 'react';

import { WindowConsumer } from '../../Context/WindowProvider';
import SideBar from '../SharedComponents/SideBar/SideBar';
import MainContainer from '../Containers/MainContainer/MainContainer';
import MessageCard from '../Cards/MessageCard/MessageCard';

const ErrorPage = ({ users }) => {
  return (
    <>
      <MainContainer>
        <WindowConsumer>
          {({ windowWidth }) => {
            const showSideBar = windowWidth > 1024;
            return showSideBar && <SideBar users={users} />;
          }}
        </WindowConsumer>
        <MessageCard icon="thumbs-down" title="404" message="Page not found." />
      </MainContainer>
    </>
  );
};

export default ErrorPage;
