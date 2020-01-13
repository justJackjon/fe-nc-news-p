import React, { Component } from 'react';
import { MainContext } from '../Context/MainProvider';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import Header from '../Header/Header';
import Main from '../Main/Main';

import './App.css';

library.add(faBars);

export class App extends Component {
  static contextType = MainContext;
  updateWindowDimensions = this.context.actions.updateWindowDimensions;

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
