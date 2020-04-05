import * as userActionTypes from '../actiontypes/userActionTypes';
import placeholderAvatar from '../assets/global/images/placeholder-avatar.svg';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  loggedIn: false,
  openAuthModal: false,
  authModalRequestedBy: '',
  displayNotification: '',
  loggedInUser: {
    username: 'You are not logged in.',
    avatar_url: placeholderAvatar,
    name: 'Create an account or login'
  },
  displayMode: 'light'
};

const userReducer = (state = initialState, action) => {
  const { event } = action;

  switch (action.type) {
    case userActionTypes.SET_OPEN_AUTH_MODAL:
      const { openAuthModal, authModalRequestedBy } = action;
      event && event.preventDefault();
      return { ...state, openAuthModal, authModalRequestedBy };

    case userActionTypes.CLOSE_MODAL_AND_GO_BACK:
      if (event && state.authModalRequestedBy !== 'mainNavigation') {
        event.preventDefault();
      }
      return { ...state, openAuthModal: false, authModalRequestedBy: '' };

    case userActionTypes.CLOSE_MODAL_AND_LOG_IN:
      event && event.preventDefault();
      return {
        ...state,
        loggedIn: true,
        openAuthModal: false,
        displayNotification: 'Success - logged in as jessjelly',
        loggedInUser: {
          username: 'jessjelly',
          avatar_url:
            'https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg',
          name: 'Jess Jelly'
        }
      };

    case userActionTypes.CLOSE_MODAL_AND_LOG_OUT:
      event && event.preventDefault();
      return {
        ...state,
        loggedIn: false,
        openAuthModal: false,
        displayNotification: 'Success - you are now logged out',
        loggedInUser: {
          username: 'You are not logged in.',
          avatar_url: placeholderAvatar,
          name: 'Create an account or login'
        }
      };

    case userActionTypes.GENERATE_UUID:
      return {
        ...state,
        UUID: uuidv4()
      };

    default:
      return state;
  }
};

export default userReducer;
