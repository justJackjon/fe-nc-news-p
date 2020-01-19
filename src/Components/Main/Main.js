import React, { Component } from 'react';
import { WindowContext } from '../Context/WindowProvider';
import { Router } from '@reach/router';
import debounce from 'lodash.debounce';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import * as api from '../../api';

import SubHeader from './SubHeader/SubHeader';
import HomeFeedContainer from './Containers/HomeFeedContainer/HomeFeedContainer';
import TopicContainer from './Containers/HomeFeedContainer/HomeFeedContainer';
import ArticleContainer from './Containers/ArticleContainer/ArticleContainer';
import UserContainer from './Containers/HomeFeedContainer/HomeFeedContainer';

import TrendingTopics from './SharedComponents/TrendingTopics/TendingTopics';
import Feed from './SharedComponents/Feed/Feed';
import SideBar from './SharedComponents/SideBar/SideBar';

// Sidebar components:
import UserProfileCard from '../../Components/Main/Cards/UserCards/UserProfileCard/UserProfileCard';
import TopUsersCard from '../../Components/Main/Cards/UserCards/TopUsersCard/TopUsersCard';
import PopularTopicsCard from '../../Components/Main/Cards/TopicCards/PopularTopicsCard/PopularTopicsCard';

import './Main.css';

export class Main extends Component {
  static contextType = WindowContext;
  setStuckSidebar = this.context.actions.setStuckSidebar;
  state = {
    error: false,
    initialLoad: true,
    longLoad: false,
    veryLongLoad: false,
    loadAddtlData: false,
    dataAvailable: true,
    mountSidebar: true,
    mountAddtlCard: true,
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
      },
      {
        slug: 'NASA',
        description:
          'Explore the universe and discover our home planet with NASA.'
      },
      {
        slug: 'National Geographic',
        description:
          'Bringing the world to your coffee table since 1888. Let’s explore.'
      }
    ],
    users: [
      {
        username: 'tickle122',
        avatar_url:
          'https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg',
        name: 'Tom Tickle'
      },
      {
        username: 'grumpy19',
        avatar_url:
          'https://www.tumbit.com/profile-image/4/original/mr-grumpy.jpg',
        name: 'Paul Grump'
      },
      {
        username: 'happyamy2016',
        avatar_url:
          'https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729',
        name: 'Amy Happy'
      },
      {
        username: 'cooljmessy',
        avatar_url: 'https://i.imgur.com/WfX0Neu.jpg',
        name: 'Peter Messy'
      },
      {
        username: 'weegembump',
        avatar_url:
          'https://www.upandrunning.co.uk/media/catalog/product/cache/1/image/650x/040ec09b1e35df139433887a97daa66f/m/r/mr-bump.jpg',
        name: 'Gemma Bump'
      },
      {
        username: 'jessjelly',
        avatar_url:
          'https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg',
        name: 'Jess Jelly'
      }
    ]
  };

  fetchArticles = () => {
    this.setStuckSidebar(true);
    this.setState({ loadAddtlData: true }, () => {
      const { articles: existingData } = this.state;
      api
        .getArticles()
        .then(newArticles => {
          this.setState({
            articles: [...existingData, ...newArticles],
            dataAvailable: existingData.length < newArticles[0].total_count,
            loadAddtlData: false
          });
        })
        .catch(err => {
          this.setStuckSidebar(false);
          this.setState({
            error: err.message,
            loadAddtlData: false
          });
        });
    });
  };

  getAddtlData = debounce(() => {
    const {
      fetchArticles,
      state: { error, loadAddtlData, dataAvailable }
    } = this;

    if (error || loadAddtlData || !dataAvailable) return;

    const windowHeight = window.innerHeight;
    const amountScrolled = document.documentElement.scrollTop;
    const totalHeight = document.documentElement.offsetHeight;
    const twoThirds = windowHeight * 0.66;

    if (windowHeight + amountScrolled >= totalHeight - twoThirds) {
      fetchArticles();
    }
  }, 100);

  componentDidMount() {
    api.getArticles().then(articles => {
      this.setState({ articles, initialLoad: false });
    });

    setTimeout(() => this.setState({ longLoad: true }), 2000);
    setTimeout(() => this.setState({ veryLongLoad: true }), 5000);

    window.addEventListener('scroll', this.getAddtlData);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.getAddtlData);
  }

  componentDidUpdate(prevProps, prevState) {
    const { windowWidth, windowHeight } = this.context;

    const mountSidebar = windowWidth > 1024;
    const mountAddtlCard = windowHeight > 945;

    if (
      mountSidebar === prevState.mountSidebar &&
      mountAddtlCard === prevState.mountAddtlCard
    )
      return;

    this.setState({ mountSidebar, mountAddtlCard });
  }

  render() {
    const {
      error,
      initialLoad,
      longLoad,
      veryLongLoad,
      loadAddtlData,
      dataAvailable,
      mountSidebar,
      mountAddtlCard,
      articles,
      topics,
      users
    } = this.state;
    const infiniteFeedProps = { loadAddtlData, dataAvailable };

    // At a later stage different sidebar compositions (with different card combinations) can be added.
    const ComposedSideBar = () => (
      <SideBar>
        <UserProfileCard />
        {mountAddtlCard && <TopUsersCard users={users?.slice(0, 5)} />}
        {/* <PopularTopicsCard /> */}
      </SideBar>
    );

    const HomePage = () => (
      <>
        <SubHeader />
        <HomeFeedContainer>
          <TrendingTopics topics={topics} />
          {mountSidebar && <ComposedSideBar />}
          <Feed
            dataType="articles"
            articles={articles}
            {...infiniteFeedProps}
          />
        </HomeFeedContainer>
      </>
    );

    const TopicsPage = props => (
      <>
        <SubHeader parent={props} />
        <TopicContainer>
          {mountSidebar && <ComposedSideBar />}
          <Feed dataType="topics" topics={topics} {...infiniteFeedProps} />
        </TopicContainer>
      </>
    );

    const ArticlePage = () => (
      <ArticleContainer>{mountSidebar && <ComposedSideBar />}</ArticleContainer>
    );

    const UsersPage = props => (
      <>
        <SubHeader parent={props} />
        <UserContainer>
          {mountSidebar && <ComposedSideBar />}
          <Feed dataType="users" users={users} {...infiniteFeedProps} />
        </UserContainer>
      </>
    );

    return (
      <main className="main">
        {initialLoad ? (
          <div className="loading">
            <Icon icon="spinner" size="4x" pulse />
            <h1>LOADING JUICY ARTICLES...</h1>
            {longLoad && (
              <h3 className="long-load-message">
                It's taking longer than usual...
              </h3>
            )}
            {veryLongLoad && (
              <h3 className="long-load-message-2">Hang tight...</h3>
            )}
          </div>
        ) : error ? (
          <div style={{ color: '#900' }}>{error}</div>
        ) : (
          <Router className="main-router" primary={false}>
            <HomePage path="/" />
            <TopicsPage path="/topics/:topic" />
            <ArticlePage path="/articles" />
            <UsersPage path="/users/:user" />
          </Router>
        )}
      </main>
    );
  }
}

export default Main;
