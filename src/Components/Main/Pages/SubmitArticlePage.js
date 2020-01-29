import React from 'react';

import SubHeader from '../SubHeader/SubHeader';
import MainContainer from '../Containers/MainContainer/MainContainer';
import MessageCard from '../Cards/MessageCard/MessageCard';

const SubmitArticlePage = props => {
  const { path, uri, sort_by, setSort_by } = props;
  return (
    <>
      <SubHeader
        path={path}
        uri={uri}
        sort_by={sort_by}
        setSort_by={setSort_by}
      />
      <MainContainer {...props}>
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
