import React, { Component } from 'react';
import { MainContext } from '../Context/MainProvider';
import { Router } from '@reach/router';

import SubHeader from './SubHeader/SubHeader';
import HomeFeedContainer from './Containers/HomeFeedContainer/HomeFeedContainer';
import TopicContainer from './Containers/HomeFeedContainer/HomeFeedContainer';
import ArticleContainer from './Containers/ArticleContainer/ArticleContainer';
import UserContainer from './Containers/HomeFeedContainer/HomeFeedContainer';

import TrendingTopics from './SharedComponents/TrendingTopics/TendingTopics';
import Feed from './SharedComponents/Feed/Feed';
import SideBar from './SharedComponents/SideBar/SideBar';

import './Main.css';

export class Main extends Component {
  state = {
    articles: [
      {
        article_id: 6,
        title:
          'JavaScript’s Apply, Call, and Bind Methods are Essential for JavaScript Professionals',
        votes: 0,
        topic: 'coding',
        author: 'grumpy19',
        created_at: '2018-03-14T10:27:39.137Z',
        comment_count: '11',
        total_count: 12
      },
      {
        article_id: 4,
        title: 'Making sense of Redux',
        votes: 0,
        topic: 'coding',
        author: 'jessjelly',
        created_at: '2017-12-24T05:38:51.240Z',
        comment_count: '9',
        total_count: 12
      },
      {
        article_id: 11,
        title: 'Designing Better JavaScript APIs',
        votes: 0,
        topic: 'coding',
        author: 'tickle122',
        created_at: '2017-11-10T16:41:01.780Z',
        comment_count: '5',
        total_count: 12
      },
      {
        article_id: 3,
        title: '22 Amazing open source React projects',
        votes: 0,
        topic: 'coding',
        author: 'happyamy2016',
        created_at: '2017-07-21T17:54:10.346Z',
        comment_count: '10',
        total_count: 12
      },
      {
        article_id: 2,
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        votes: 0,
        topic: 'coding',
        author: 'jessjelly',
        created_at: '2017-07-20T20:57:53.256Z',
        comment_count: '6',
        total_count: 12
      },
      {
        article_id: 12,
        title: 'The battle for Node.js security has only begun',
        votes: 0,
        topic: 'coding',
        author: 'tickle122',
        created_at: '2017-07-17T11:34:54.879Z',
        comment_count: '7',
        total_count: 12
      },
      {
        article_id: 9,
        title: 'Learn HTML5, CSS3, and Responsive WebSite Design in One Go',
        votes: 0,
        topic: 'coding',
        author: 'grumpy19',
        created_at: '2017-03-06T02:22:14.447Z',
        comment_count: '8',
        total_count: 12
      },
      {
        article_id: 7,
        title: 'Using React Native: One Year Later',
        votes: 0,
        topic: 'coding',
        author: 'tickle122',
        created_at: '2016-12-07T21:37:26.335Z',
        comment_count: '8',
        total_count: 12
      },
      {
        article_id: 10,
        title:
          'An Introduction to JavaScript Object Notation (JSON) in JavaScript and .NET',
        votes: 0,
        topic: 'coding',
        author: 'cooljmessy',
        created_at: '2016-10-29T02:24:09.225Z',
        comment_count: '8',
        total_count: 12
      },
      {
        article_id: 5,
        title: 'Please stop worrying about Angular 3',
        votes: 0,
        topic: 'coding',
        author: 'jessjelly',
        created_at: '2016-10-24T04:13:02.648Z',
        comment_count: '6',
        total_count: 12
      }
    ],
    topics: [
      {
        slug: 'coding',
        description: 'Code is love, code is life'
      },
      {
        slug: 'football',
        description: 'FOOTIE!'
      },
      {
        slug: 'cooking',
        description: 'Hey good looking, what you got cooking?'
      }
    ]
  };
  static contextType = MainContext;

  render() {
    const { windowWidth } = this.context;
    const { articles, topics } = this.state;

    const HomePage = () => {
      return (
        <>
          <SubHeader />
          <HomeFeedContainer>
            {windowWidth > 480 && <TrendingTopics />}
            {windowWidth > 1024 && <SideBar />}
            <Feed dataType="articles" articles={articles} />
          </HomeFeedContainer>
        </>
      );
    };
    const TopicPage = props => {
      return (
        <>
          <SubHeader parent={props} />
          <TopicContainer>
            {windowWidth > 1024 && <SideBar />}
            <Feed dataType="topics" topics={topics} />
          </TopicContainer>
        </>
      );
    };
    const ArticlePage = () => {
      return (
        <ArticleContainer>{windowWidth > 1500 && <SideBar />}</ArticleContainer>
      );
    };
    const UserPage = () => {
      return (
        <>
          <SubHeader />
          <UserContainer>
            {windowWidth > 1024 && <SideBar />}
            <Feed dataType="articles" articles={articles} />
          </UserContainer>
        </>
      );
    };

    return (
      <main className="main">
        <Router className="main-router" primary={false}>
          <HomePage path="/" />
          <TopicPage path="/topics/:topic" />
          <ArticlePage path="/articles" />
          <UserPage path="/users" />
        </Router>
      </main>
    );
  }
}

export default Main;
