import React, { useCallback, useEffect } from 'react';

import * as api from '../../../api';

import SubHeader from '../SubHeader/SubHeader';
import MainContainer from '../Containers/MainContainer/MainContainer';

const UsersPage = props => {
  const { path, uri, setUsers, sort_by, setSort_by, setError } = props;

  const getUsers = useCallback(() => {
    api
      .getData('users')
      .then(users => setUsers(users))
      .catch(({ response: error }) => setError(error));
  }, [setError, setUsers]);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
