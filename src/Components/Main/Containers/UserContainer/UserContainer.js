import React, { useState, useEffect, useCallback } from 'react';
import * as api from '../../../../api';
import Loader from '../../../Utils/Loader/Loader';
import '../Containers.css';

const UserContainer = ({
  getAddtlData,
  userArticles,
  updateMainState,
  parent: { author },
  sort_by,
  currentSort,
  children
}) => {
  // const getAddtl = useCallback(() => {
  //   getAddtlData();
  // }, [getAddtlData]);

  // useEffect(() => {
  //     window.addEventListener('scroll', getAddtl);
  //     return () => {
  //       window.removeEventListener('scroll', getAddtl);
  //     };
  // }, [getAddtl, parent.path]);

  const [displayLoader, setDisplayLoader] = useState(false);

  const fetchUserArticles = useCallback(() => {
    setDisplayLoader(true);
    api
      .getData('/articles', 'articles', { params: { author, sort_by } })
      .then(userArticles => {
        if (userArticles.length) {
          updateMainState({ userArticles, currentSort: sort_by });
        } else {
          updateMainState({
            userArticles: [
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
            ],
            currentSort: sort_by
          });
        }
        setDisplayLoader(false);
      })
      .catch(({ response: error }) => {
        updateMainState({ error });
      });
  }, [author, sort_by, updateMainState]);

  useEffect(() => {
    if (userArticles[0]?.title === `No articles for '${author}'`) return;
    if (!userArticles.length) fetchUserArticles();
    if (userArticles.length) {
      if (userArticles.every(article => article.author !== author))
        fetchUserArticles();
    }
    if (sort_by !== currentSort) fetchUserArticles();
  }, [fetchUserArticles, userArticles, author, sort_by, currentSort]);

  return (
    <>
      {displayLoader ? (
        <Loader className="loading">
          <h1>LOADING JUICY ARTICLES...</h1>
        </Loader>
      ) : (
        <div className="main-content">
          <div className="main-content-container">{children}</div>
        </div>
      )}
    </>
  );
};

export default UserContainer;
