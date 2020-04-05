import * as userActionTypes from '../actiontypes/userActionTypes';

export const loadState = () => ({
  type: userActionTypes.LOAD_STATE
});

export const saveState = stateItems => ({
  type: userActionTypes.SAVE_STATE,
  stateItems
});

export const setOpenAuthModal = (
  openAuthModal,
  authModalRequestedBy,
  event
) => ({
  type: userActionTypes.SET_OPEN_AUTH_MODAL,
  openAuthModal,
  authModalRequestedBy,
  event
});

export const closeModalAndGoBack = event => ({
  type: userActionTypes.CLOSE_MODAL_AND_GO_BACK,
  event
});

export const closeModalAndLogIn = event => ({
  type: userActionTypes.CLOSE_MODAL_AND_LOG_IN,
  event
});

export const closeModalAndLogOut = event => ({
  type: userActionTypes.CLOSE_MODAL_AND_LOG_OUT,
  event
});

export const generateUUID = () => ({
  type: userActionTypes.GENERATE_UUID
});
