import React, { Component, createContext } from 'react';
import { MainContext } from './MainProvider';

export const UserSettingsContext = createContext();

export class UserSettingsProvider extends Component {
  static contextType = MainContext;
  actions = this.context.actions;
  loadUserSettingsState = this.actions.loadState.call(
    this,
    'UserSettingsContext'
  );
  saveUserSettingsState = this.actions.saveState.bind(
    this,
    'UserSettingsContext'
  );
  state = this.loadUserSettingsState || {
    loggedInUser: {
      username: 'tickle122',
      avatar_url:
        'https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg',
      name: 'Tom Tickle'
    },
    displayMode: 'light'
  };

  componentDidUpdate() {
    this.saveUserSettingsState();
  }

  render() {
    return (
      <UserSettingsContext.Provider
        value={{
          loggedInUser: this.state.loggedInUser,
          displayMode: this.state.displayMode
        }}
      >
        {this.props.children}
      </UserSettingsContext.Provider>
    );
  }
}

export const { Consumer: UserSettingsConsumer } = UserSettingsContext;
