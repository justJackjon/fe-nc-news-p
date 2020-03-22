import React from 'react';

import SubHeader from '../SubHeader/SubHeader';
import MainContainer from '../Containers/MainContainer/MainContainer';

const UsersPage = props => {
  const { path, uri, sort_by, setSort_by } = props;
  return (
    <>
      <SubHeader
        path={path}
        uri={uri}
        sort_by={sort_by}
        setSort_by={setSort_by}
      />
      <MainContainer {...props} />
    </>
  );
};

export default UsersPage;
