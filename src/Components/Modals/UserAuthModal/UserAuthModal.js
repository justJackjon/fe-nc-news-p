import React, { useContext } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { UserSettingsContext } from '../../Context/UserSettingsProvider';
import Modal from '../Modal';
import Button from '../../Controls/Buttons/Button';

const UserAuthModal = ({ toggleDrawer }) => {
  const {
    loggedIn,
    actions: { closeModalAndGoBack, closeModalAndLogIn, closeModalAndLogOut }
  } = useContext(UserSettingsContext);

  const logInModalContent = (
    <>
      <h1>Welcome to NCNews</h1>
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
        onClick={event => closeModalAndLogIn(event)}
        value={'logIn'}
      >
        LOGIN
      </Button>
    </>
  );

  const logOutModalContent = (
    <>
      <h1>Thank you for using NCNews!</h1>
      <p>Questions or comments? Email support@redrobincreative.com</p>
      <h3>Would you like to log out?</h3>
      <Button
        className="btn-accept btn-lg"
        onClick={event => closeModalAndLogOut(event)}
      >
        LOG OUT
      </Button>
    </>
  );

  return (
    <Modal className="modal-sm modal-vw welcome-login-modal">
      <Icon icon="info-circle" size="3x" />
      {loggedIn ? logOutModalContent : logInModalContent}
      <Button
        className="btn-solid btn-lg"
        onClick={event => closeModalAndGoBack(event)}
      >
        GO BACK
      </Button>
    </Modal>
  );
};

export default UserAuthModal;
