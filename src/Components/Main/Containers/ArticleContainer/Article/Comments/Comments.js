import React, { useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import VoteControl from '../../../../../Controls/VoteControls/VoteControl';
import './Comments.css';

const Comments = () => {
  const [comments, setComments] = useState([
    {
      comment_id: 44,
      author: 'grumpy19',
      article_id: 1,
      votes: 4,
      created_at: '2017-11-20T08:58:48.322Z',
      body:
        'Error est qui id corrupti et quod enim accusantium minus. Deleniti quae ea magni officiis et qui suscipit non.'
    },
    {
      comment_id: 52,
      author: 'jessjelly',
      article_id: 1,
      votes: 10,
      created_at: '2017-07-31T08:14:13.076Z',
      body:
        'Consectetur deleniti sed. Omnis et dolore omnis aspernatur. Et porro accusantium. Tempora ullam voluptatum et rerum.'
    },
    {
      comment_id: 286,
      author: 'cooljmessy',
      article_id: 1,
      votes: 19,
      created_at: '2017-07-05T12:15:40.563Z',
      body:
        'Ut accusamus enim vel voluptate quae temporibus labore neque a. Reprehenderit iste est eos velit fugit vel quod velit.'
    },
    {
      comment_id: 86,
      author: 'tickle122',
      article_id: 1,
      votes: 14,
      created_at: '2016-09-11T02:59:15.171Z',
      body:
        'Et explicabo dignissimos officia dolore rerum aliquam corrupti. Culpa corporis earum et earum officia a est atque at. Quidem quo recusandae delectus autem possimus blanditiis optio. Sed culpa culpa. Exercitationem nemo aspernatur alias ut qui.'
    },
    {
      comment_id: 89,
      author: 'cooljmessy',
      article_id: 1,
      votes: 2,
      created_at: '2016-09-05T20:08:14.229Z',
      body:
        'Esse et expedita harum non. Voluptatibus commodi voluptatem. Minima velit suscipit numquam ea. Id vitae debitis aut incidunt odio quo quam possimus ipsum.'
    },
    {
      comment_id: 85,
      author: 'happyamy2016',
      article_id: 1,
      votes: 0,
      created_at: '2016-06-18T08:52:08.680Z',
      body:
        'Assumenda sit est blanditiis asperiores est minima. Placeat sequi tenetur autem consequatur soluta molestiae. Incidunt neque labore et dolorem et vel possimus nemo quidem.'
    },
    {
      comment_id: 33,
      author: 'cooljmessy',
      article_id: 1,
      votes: 4,
      created_at: '2016-05-13T06:34:27.403Z',
      body:
        'Explicabo perspiciatis voluptatem sunt tenetur maxime aut. Optio totam modi. Perspiciatis et quia.'
    },
    {
      comment_id: 31,
      author: 'weegembump',
      article_id: 1,
      votes: 11,
      created_at: '2016-02-01T02:29:55.551Z',
      body:
        'Sit sequi odio suscipit. Iure quisquam qui alias distinctio eos officia enim aut sit. Corrupti ut praesentium ut iste earum itaque qui. Dolores in ab rerum consequuntur. Id ab aliquid autem dolore.'
    }
  ]);

  return (
    <>
      <form className="add-comment-form"></form>
      <form className="sort-comments-form"></form>
      <ul className="comments">
        {comments.map(comment => {
          return (
            <li key={comment.comment_id} className="comment">
              <div className="comment-left-column">
                <VoteControl />
                <div className="comment-line-vertical" />
              </div>
              <div className="comment-right-column">
                <p className="comment-subhead">
                  <span className="comment-subhead-author">
                    {comment.author}
                  </span>
                  <span className="comment-subhead-votes">{` ${comment.votes} votes • `}</span>
                </p>
                <p className="comment-body">{comment.body}</p>
                <p className="article-subfoot">
                  <span className="article-subfoot-comcount">
                    <Icon icon="comment"></Icon>
                    Reply
                  </span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Comments;
