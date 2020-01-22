import React, { useContext } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { UserSettingsContext } from '../../Context/UserSettingsProvider';
import Modal from '../Modal';
import Button from '../../Controls/Buttons/Button';

const UserAuthModal = ({ toggleDrawer }) => {
  const {
    loggedIn,
    actions: { setOpenAuthModal, closeModalAndLogIn, closeModalAndLogOut }
  } = useContext(UserSettingsContext);

  const goBack = () => {
    setOpenAuthModal(false);
    toggleDrawer(true);
  };

  const logInModalContent = (
    <>
      <h1>Welcome to NCNews</h1>
      <p>
        As this application is for portfolio purposes only, it is recommended
        that you login as the default user.
      </p>
      <h3>Would you like to login as the default user?</h3>
      <Button className="btn-accept btn-lg" onClick={closeModalAndLogIn}>
        LOGIN
      </Button>
    </>
  );

  const logOutModalContent = (
    <>
      <h1>Thank you for using NCNews!</h1>
      <p>Questions or comments? Email support@redrobincreative.com</p>
      <h3>Would you like to log out?</h3>
      <Button className="btn-accept btn-lg" onClick={closeModalAndLogOut}>
        LOG OUT
      </Button>
    </>
  );

  return (
    <Modal className="modal-sm modal-vw welcome-login-modal">
      {console.log("I'm here somewhere, you just can't see me!!!!")}
      <Icon icon="info-circle" size="3x" />
      {loggedIn ? logOutModalContent : logInModalContent}
      <Button className="btn-solid btn-lg" onClick={goBack}>
        GO BACK
      </Button>
    </Modal>
  );
};

export default UserAuthModal;
