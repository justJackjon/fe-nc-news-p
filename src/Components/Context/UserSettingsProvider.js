import React, { Component, createContext } from 'react';

export const UserSettingsContext = createContext();

export class UserSettingsProvider extends Component {
  loadUserSettingsState = this.loadState.call(this, 'UserSettingsContext'); // saveState/loadState is also passed via the Context API
  saveUserSettingsState = this.saveState.bind(this, 'UserSettingsContext'); // to other components, so we implicitly bind it here.

  state = this.loadUserSettingsState || {
    loggedInUser: {
      username: 'grumpy19',
      avatar_url:
        'https://www.tumbit.com/profile-image/4/original/mr-grumpy.jpg',
      name: 'Paul Grump'
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
