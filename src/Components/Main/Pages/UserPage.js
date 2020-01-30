import React, { useState, useRef, useEffect, useCallback } from 'react';

import * as api from '../../../api';

import SubHeader from '../SubHeader/SubHeader';
import MainContainer from '../Containers/MainContainer/MainContainer';
import Loader from '../../Utils/Loader/Loader';

const UserPage = props => {
  const {
    path,
    uri,
    author,
    sort_by,
    setSort_by,
    currentSort,
    setCurrentSort,
    setError
  } = props;

  const [displayLoader, setDisplayLoader] = useState(false);
  const [userArticles, setUserArticles] = useState([]);

  const fetchUserArticles = useCallback(() => {
    setDisplayLoader(true);
    api
      .getData('/articles', 'articles', { params: { author, sort_by } })
      .then(userArticles => {
        if (userArticles.length) setUserArticles(userArticles);
        else
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
        setCurrentSort(sort_by);
        setDisplayLoader(false);
      })
      .catch(({ response: error }) => setError(error));
  }, [author, sort_by, setCurrentSort, setError]);

  const prevAuthor = useRef(author);

  useEffect(() => {
    if (userArticles[0]?.title === `No articles for '${author}'`) return;
    if (!userArticles.length) fetchUserArticles();
    if (sort_by !== currentSort) fetchUserArticles();
    if (prevAuthor.current !== author) {
      fetchUserArticles();
      prevAuthor.current = author;
    }
  }, [fetchUserArticles, userArticles, author, sort_by, currentSort, path]);

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
          <MainContainer userArticles={userArticles} {...props} />
        </>
      )}
    </>
  );
};

export default UserPage;
