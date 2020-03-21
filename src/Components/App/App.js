import React, { useEffect } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { updateWindowDimensions } from '../../actions/windowActions';
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

const App = ({ dispatch }) => {
  useEffect(() => {
    dispatch(updateWindowDimensions());
    window.addEventListener('resize', () => dispatch(updateWindowDimensions()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
};

App.propTypes = {
  dispatch: func.isRequired
};

export default connect()(App);
