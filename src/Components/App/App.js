import React, { Component } from 'react';
import { WindowContext } from '../Context/WindowProvider';
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
  faSpinner,
  faCaretUp
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

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
  faSpinner,
  faCaretUp,
  faGithub
);

export class App extends Component {
  static contextType = WindowContext;
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
