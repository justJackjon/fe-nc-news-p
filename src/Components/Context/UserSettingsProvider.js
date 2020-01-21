import React, { Component, createContext } from 'react';
import placeholderAvatar from '../../placeholder-avatar.svg';

export const UserSettingsContext = createContext();

export class UserSettingsProvider extends Component {
  loadUserSettingsState = this.loadState.call(this, 'UserSettingsContext'); // saveState/loadState is also passed via the Context API
  saveUserSettingsState = this.saveState.bind(this, 'UserSettingsContext'); // to other components, so we implicitly bind it here.

  state = this.loadUserSettingsState || {
    loggedIn: false,
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

  logOut = () => {
    this.setState({
      loggedIn: false,
      loggedInUser: {
        username: 'You are not logged in.',
        avatar_url: placeholderAvatar,
        name: 'Create an account or login'
      }
    });
  };

  logInDefaultUser = event => {
    event.preventDefault();
    console.log('logging in default user...');
    // this.setState({
    //   loggedIn: true,
    //   loggedInUser: {
    //     username: 'jessjelly',
    //     avatar_url:
    //       'https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg',
    //     name: 'Jess Jelly'
    //   }
    // });
  };

  componentDidUpdate() {
    this.saveUserSettingsState();
  }

  render() {
    return (
      <UserSettingsContext.Provider
        value={{
          loggedInUser: this.state.loggedInUser,
          displayMode: this.state.displayMode,
          actions: {
            loadState: this.loadState,
            saveState: this.saveState
          }
        }}
      >
        {this.props.children}
      </UserSettingsContext.Provider>
    );
  }
}

export const { Consumer: UserSettingsConsumer } = UserSettingsContext;
