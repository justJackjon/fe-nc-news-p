import React, { Component, createContext } from 'react';
import placeholderAvatar from '../../placeholder-avatar.svg';

export const UserSettingsContext = createContext();

export class UserSettingsProvider extends Component {
  loadUserSettingsState = this.loadState.call(this, 'UserSettingsContext'); // saveState/loadState is also passed via the Context API
  saveUserSettingsState = this.saveState.bind(this, 'UserSettingsContext'); // to other components, so we implicitly bind it here.

  state = this.loadUserSettingsState || {
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

  loadState(stateName) {
    const state = JSON.parse(sessionStorage.getItem(stateName));
    if (!state) return null;
    return { ...state };
  }

  saveState(stateName, stateItems) {
    const state = stateItems || this.state;
    sessionStorage.setItem(stateName, JSON.stringify(state));
  }

  setOpenAuthModal = (openAuthModal, authModalRequestedBy, event) => {
    event && event.preventDefault();
    this.setState({ openAuthModal, authModalRequestedBy });
  };

  closeModalAndGoBack = event => {
    if (event && this.state.authModalRequestedBy !== 'mainNavigation') {
      event.preventDefault();
    }
    this.setOpenAuthModal(false, '');
  };

  closeModalAndLogIn = event => {
    event && event.preventDefault();
    this.setOpenAuthModal(false);
    this.logInDefaultUser();
  };

  closeModalAndLogOut = event => {
    event && event.preventDefault();
    this.setOpenAuthModal(false);
    this.logOut();
  };

  logInDefaultUser = () => {
    this.setState({
      loggedIn: true,
      displayNotification: 'Success - logged in as jessjelly',
      loggedInUser: {
        username: 'jessjelly',
        avatar_url:
          'https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg',
        name: 'Jess Jelly'
      }
    });
  };

  logOut = () => {
    this.setState({
      loggedIn: false,
      displayNotification: 'Success - you are now logged out',
      loggedInUser: {
        username: 'You are not logged in.',
        avatar_url: placeholderAvatar,
        name: 'Create an account or login'
      }
    });
  };

  componentDidUpdate() {
    this.saveUserSettingsState();
  }

  render() {
    return (
      <UserSettingsContext.Provider
        value={{
          loggedIn: this.state.loggedIn,
          openAuthModal: this.state.openAuthModal,
          authModalRequestedBy: this.state.authModalRequestedBy,
          displayNotification: this.state.displayNotification,
          loggedInUser: this.state.loggedInUser,
          displayMode: this.state.displayMode,
          actions: {
            loadState: this.loadState,
            saveState: this.saveState,
            setOpenAuthModal: this.setOpenAuthModal,
            closeModalAndGoBack: this.closeModalAndGoBack,
            closeModalAndLogIn: this.closeModalAndLogIn,
            closeModalAndLogOut: this.closeModalAndLogOut,
            logInDefaultUser: this.logInDefaultUser,
            logOut: this.logOut
          }
        }}
      >
        {this.props.children}
      </UserSettingsContext.Provider>
    );
  }
}

export const { Consumer: UserSettingsConsumer } = UserSettingsContext;
