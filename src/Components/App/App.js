import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import images from '../../assets';
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
  faSignOutAlt,
  faTimes,
  faAngleUp,
  faAngleDown,
  faComment,
  faImage,
  faAngleDoubleRight,
  faAngleDoubleUp,
  faSpinner,
  faCaretUp,
  faMoon,
  faInfoCircle,
  faCalendarCheck,
  faPoll,
  faComments,
  faSortDown,
  faCheck,
  faTrashAlt,
  faExclamationCircle,
  faThumbsDown
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import Header from '../Header/Header';
import Main from '../Main/Main';

import './reset.css';
import './App.css';
import '../Controls/Buttons/Buttons.css';
import '../Modals/Modal.css';

library.add(
  faBars,
  faNewspaper,
  faArchive,
  faUsers,
  faHome,
  faCompass,
  faSignInAlt,
  faSignOutAlt,
  faTimes,
  faAngleUp,
  faAngleDown,
  faComment,
  faImage,
  faAngleDoubleRight,
  faAngleDoubleUp,
  faSpinner,
  faCaretUp,
  faGithub,
  faLinkedin,
  faMoon,
  faInfoCircle,
  faCalendarCheck,
  faPoll,
  faComments,
  faSortDown,
  faCheck,
  faTrashAlt,
  faExclamationCircle,
  faThumbsDown
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
