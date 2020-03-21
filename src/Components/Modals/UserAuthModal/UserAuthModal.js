import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import {
  closeModalAndGoBack,
  closeModalAndLogIn,
  closeModalAndLogOut
} from '../../../actions/userActions';
import Modal from '../Modal';
import Button from '../../Controls/Buttons/Button';

const UserAuthModal = ({ loggedIn, authModalRequestedBy, dispatch }) => {
  const logInModalHeader = {
    standard: (
      <>
        <Icon icon="info-circle" size="3x" />
        <h1>Welcome to NCNews</h1>
      </>
    ),
    voteControl: (
      <>
        <Icon icon="exclamation-circle" size="3x" />
        <h1>You must be logged in to do that.</h1>
      </>
    ),
    signUpButton: (
      <>
        <Icon icon="exclamation-circle" size="3x" />
        <h1>We're not accepting new registrations.</h1>
      </>
    )
  };

  const logInModalBody = (
    <>
      <p>
        As this application is for portfolio purposes only,{' '}
        <span className="strong-500">
          you cannot create an account at this time.
        </span>{' '}
        It is instead recommended that you login as the default user.
      </p>
      <h3>Would you like to login as the default user?</h3>
      <Button
        className="btn-accept btn-lg"
        onClick={event => dispatch(closeModalAndLogIn(event))}
        value={'logIn'}
      >
        LOGIN
      </Button>
    </>
  );

  const logOutModalHeader = (
    <>
      <Icon icon="info-circle" size="3x" />
      <h1>Thank you for using NCNews!</h1>
    </>
  );

  const logOutModalBody = (
    <>
      <p>
        Questions or comments?
        <br />
        Email{' '}
        <a
          className="log-out-contact strong-500"
          href="mailto:jackjon@redrobincreative.com?Subject=I%20found%20you%20on%20NCNews"
          target="_blank"
          rel="noopener noreferrer"
        >
          jackjon@redrobincreative.com
        </a>
      </p>
      <h3>Would you like to log out?</h3>
      <Button
        className="btn-accept btn-lg"
        onClick={event => dispatch(closeModalAndLogOut(event))}
      >
        LOG OUT
      </Button>
    </>
  );

  return (
    <Modal className="modal-sm modal-vw welcome-login-modal">
      {loggedIn
        ? logOutModalHeader
        : logInModalHeader[authModalRequestedBy] || logInModalHeader.standard}
      {loggedIn ? logOutModalBody : logInModalBody}
      <Button
        className="btn-solid btn-lg"
        onClick={event => dispatch(closeModalAndGoBack(event))}
      >
        GO BACK
      </Button>
    </Modal>
  );
};

const mapStateToProps = ({ user: { loggedIn, authModalRequestedBy } }) => ({
  loggedIn,
  authModalRequestedBy
});

export default connect(mapStateToProps)(UserAuthModal);
