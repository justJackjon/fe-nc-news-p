import React, { Component, createContext } from 'react';
// import { UserSettingsContext } from './UserSettingsProvider';

export const WindowContext = createContext();

export class WindowProvider extends Component {
  // static contextType = UserSettingsContext;
  // actions = this.context.actions;
  // loadWindowState = this.actions.loadState.call(this, 'WindowContext');
  // saveWindowState = this.actions.saveState.bind(this, 'WindowContext');
  // state = this.loadWindowState || {
  //   windowWidth: 0,
  //   windowHeight: 0
  // };

  state = {
    windowWidth: 0,
    windowHeight: 0
  };

  updateWindowDimensions = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  };

  componentDidUpdate() {
    // this.saveWindowState();
  }

  render() {
    return (
      <WindowContext.Provider
        value={{
          windowWidth: this.state.windowWidth,
          windowHeight: this.state.windowHeight,
          actions: {
            updateWindowDimensions: this.updateWindowDimensions
          }
        }}
      >
        {this.props.children}
      </WindowContext.Provider>
    );
  }
}

export const { Consumer: WindowConsumer } = WindowContext;
