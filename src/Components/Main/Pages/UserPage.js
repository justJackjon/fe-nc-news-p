import React, { useState, useEffect, useCallback } from 'react';

import * as api from '../../../api';
import { WindowConsumer } from '../../Context/WindowProvider';

import Loader from '../../Utils/Loader/Loader';
import SubHeader from '../SubHeader/SubHeader';
import SideBar from '../SharedComponents/SideBar/SideBar';
import MainContainer from '../Containers/MainContainer/MainContainer';
import Feed from '../SharedComponents/Feed/Feed';

const UserPage = ({
  path,
  uri,
  author,
  topics,
  users,
  sort_by,
  setSort_by,
  currentSort,
  setCurrentSort,
  setError,
  // getAddtlData,
  loadAddtlData,
  dataAvailable
}) => {
  const [displayLoader, setDisplayLoader] = useState(false);
  const [userArticles, setUserArticles] = useState([]);

  const fetchUserArticles = useCallback(() => {
    setDisplayLoader(true);
    api
      .getData('/articles', 'articles', { params: { author, sort_by } })
      .then(userArticles => {
        if (userArticles.length) setUserArticles(userArticles);
        else {
          setUserArticles([
            {
              article_id: `../users/${author}`,
              title: `No articles for '${author}'`,
              body: null,
              votes: null,
              topic: 'N/A',
              author: 'the server',
              created_at: new Date().toISOString(),
              comment_count: 'No'
            }
          ]);
        }
        setCurrentSort(sort_by);
        setDisplayLoader(false);
      })
      .catch(({ response: error }) => setError(error));
  }, [author, sort_by, setCurrentSort, setError]);

  useEffect(() => {
    if (userArticles[0]?.title === `No articles for '${author}'`) return;
    if (!userArticles.length) fetchUserArticles();
    if (sort_by !== currentSort) fetchUserArticles();
  }, [fetchUserArticles, userArticles, author, sort_by, currentSort]);

  return (
    <>
      {displayLoader ? (
        <Loader className="loading">
          <h1>LOADING JUICY ARTICLES...</h1>
        </Loader>
      ) : (
        <>
          <SubHeader
            path={path}
            uri={uri}
            sort_by={sort_by}
            setSort_by={setSort_by}
          />
          <MainContainer>
            <WindowConsumer>
              {({ windowWidth }) => {
                const showSideBar = windowWidth > 1024;
                return showSideBar && <SideBar users={users} />;
              }}
            </WindowConsumer>
            <Feed
              sort_by={sort_by}
              path={path}
              topics={topics}
              users={users}
              setError={setError}
              articles={userArticles}
              dataType="articles"
              loadAddtlData={loadAddtlData}
              dataAvailable={dataAvailable}
            />
          </MainContainer>
        </>
      )}
    </>
  );
};

export default UserPage;
