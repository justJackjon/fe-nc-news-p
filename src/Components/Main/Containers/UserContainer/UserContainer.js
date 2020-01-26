import React, { useState, useEffect, useCallback } from 'react';
import * as api from '../../../../api';
import Loader from '../../../Utils/Loader/Loader';
import '../Containers.css';

const UserContainer = ({
  getAddtlData,
  userArticles,
  updateMainState,
  parent: { author },
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
      .getData('/articles', 'articles', { params: { author } })
      .then(userArticles => {
        if (userArticles.length) {
          updateMainState({ userArticles });
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
            ]
          });
        }
        setDisplayLoader(false);
      });
  }, [updateMainState, author]);

  useEffect(() => {
    if (userArticles[0]?.title === `No articles for '${author}'`) return;
    if (!userArticles.length) fetchUserArticles();
    if (userArticles.length) {
      if (userArticles.every(article => article.author !== author))
        fetchUserArticles();
    }
  }, [fetchUserArticles, userArticles, author]);

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
