import React, { Component } from 'react';
import { MainProvider } from '../Context/MainProvider';
import { MainContext } from '../Context/MainProvider';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faNewspaper,
  faArchive,
  faUsers,
  faHome,
  faCompass,
  faSignInAlt,
  faTimes,
  faAngleUp,
  faAngleDown,
  faComment,
  faImage,
  faAngleDoubleRight,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

import Header from '../Header/Header';
import Main from '../Main/Main';

import './reset.css';
import './App.css';
import '../Controls/Buttons/Buttons.css';

library.add(
  faBars,
  faNewspaper,
  faArchive,
  faUsers,
  faHome,
  faCompass,
  faSignInAlt,
  faTimes,
  faAngleUp,
  faAngleDown,
  faComment,
  faImage,
  faAngleDoubleRight,
  faSpinner
);

export class App extends Component {
  static contextType = MainContext;
  updateWindowDimensions = this.context.actions.updateWindowDimensions;

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    return (
      // <MainProvider>
      <div className="App">
        <Header />
        <Main />
      </div>
      // </MainProvider>
    );
  }
}

export default App;
