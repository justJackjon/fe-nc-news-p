import React, { useContext, useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Link } from '@reach/router';

import { UserSettingsContext } from '../../../../Context/UserSettingsProvider';
import UserListCard from '../UserListCard/UserListCard';
import Modal from '../../../../Modals/Modal';
import Button from '../../../../Controls/Buttons/Button';

import './UserProfileCard.css';

const UserProfileCard = () => {
  const { loggedInUser: user, loggedIn } = useContext(UserSettingsContext);
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      {openModal && (
        <Modal className="modal-sm modal-vw welcome-login-modal">
          <Icon icon="info-circle" size="3x" />
          <h1>Welcome to NCNews</h1>
          <p>
            As this application is for portfolio purposes only, it is
            recommended that you login as the default user.
          </p>
          <h3>Would you like to login as the default user?</h3>
          <Button className="btn-accept btn-lg" onClick={handleClose}>
            LOGIN
          </Button>
          <Button className="btn-solid btn-lg" onClick={handleClose}>
            GO BACK
          </Button>
        </Modal>
      )}
      <div className="user-profile-card">
        <div className="user-profile-cover-image"></div>
        <UserListCard
          displayLocation="user-profile"
          user={user}
          loggedIn={loggedIn}
        >
          <button className="btn-lg btn-regular" onClick={handleClick}>
            {loggedIn ? 'LOG OUT' : 'LOG IN'}
          </button>
          <button className="btn-lg btn-solid" onClick={handleClick}>
            {loggedIn ? 'NEW POST' : 'SIGN UP'}
          </button>
        </UserListCard>
      </div>
    </>
  );
};

export default UserProfileCard;
