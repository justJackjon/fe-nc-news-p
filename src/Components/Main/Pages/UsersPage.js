import React, { useCallback, useEffect } from 'react';

import * as api from '../../../api';
import { WindowConsumer } from '../../Context/WindowProvider';

import SubHeader from '../SubHeader/SubHeader';
import SideBar from '../SharedComponents/SideBar/SideBar';
import MainContainer from '../Containers/MainContainer/MainContainer';
import Feed from '../SharedComponents/Feed/Feed';

const UsersPage = ({
  path,
  uri,
  users,
  setUsers,
  sort_by,
  setSort_by,
  setError,
  // getAddtlData,
  loadAddtlData,
  dataAvailable
}) => {
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
      <MainContainer path={path}>
        <WindowConsumer>
          {({ windowWidth }) => {
            const showSideBar = windowWidth > 1024;
            return showSideBar && <SideBar users={users} />;
          }}
        </WindowConsumer>
        <Feed
          sort_by={sort_by}
          path={path}
          users={users}
          setError={setError}
          dataType="users"
          loadAddtlData={loadAddtlData}
          dataAvailable={dataAvailable}
        />
      </MainContainer>
    </>
  );
};

export default UsersPage;
