import React, { Component } from 'react';
import SubHeader from './SubHeader/SubHeader';
import HomeFeedContainer from './Containers/HomeFeedContainer/HomeFeedContainer';
import './Main.css';

export class Main extends Component {
  render() {
    return (
      <main className="main">
        <SubHeader />
        <h2>MAIN COMPONENT</h2>
        <HomeFeedContainer />
      </main>
    );
  }
}

export default Main;
