import React, { useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import MainNavigation from '../MainNavigation/MainNavigation';
import Modal from '../../Modals/Modal';
import Button from '../../Controls/Buttons/Button';
import './HeaderControls.css';

const HeaderControls = () => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const toggleDrawer = (event, value) => {
    setOpen(event.target?.checked || value || false);
  };

  const handleChange = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <form className="main-header-controls">
      <label className="toggle-switch">
        <input
          type="checkbox"
          id="toggleDark"
          aria-label="Toggle Dark Mode"
          onChange={handleChange}
          checked={false}
        />
        <span className="slider"></span>
      </label>
      {openModal && (
        <Modal className="modal-sm modal-vw">
          <Icon icon="info-circle" size="4x" />
          <h1>This feature is on it's way!</h1>
          <p>Hang tight, DARK MODE is coming soon.</p>

          <Button className="btn-solid btn-lg" onClick={handleClose}>
            OK
          </Button>
        </Modal>
      )}
      <label className="hamburger-menu">
        <Icon
          icon={open ? 'times' : 'bars'}
          size="lg"
          className="hambuger-icon"
        />
        <input
          type="checkbox"
          id="toggleDrawer"
          aria-label="Toggle Main Menu"
          checked={open}
          onChange={toggleDrawer}
        />
        <MainNavigation toggleDrawer={toggleDrawer} />
      </label>
    </form>
  );
};

export default HeaderControls;
