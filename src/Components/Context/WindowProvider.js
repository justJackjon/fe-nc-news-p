import React, { Component, createContext } from 'react';
import { UserSettingsContext } from './UserSettingsProvider';

export const WindowContext = createContext();

export class WindowProvider extends Component {
  static contextType = UserSettingsContext;
  actions = this.context.actions;
  loadWindowState = this.actions.loadState.call(this, 'WindowContext');
  saveWindowState = this.actions.saveState.bind(this, 'WindowContext');
  state = this.loadWindowState || {
    windowWidth: 0,
    windowHeight: 0,
    stickySidebar: false,
    stuckSidebar: false
  };

  setStickySidebar = stickySidebar => {
    this.setState(prevState => {
      return stickySidebar !== prevState.stickySidebar
        ? { stickySidebar }
        : null;
    });
  };

  setStuckSidebar = stuckSidebar => {
    this.setState(prevState => {
      return stuckSidebar !== prevState.stuckSidebar ? { stuckSidebar } : null;
    });
  };

  updateWindowDimensions = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  };

  componentDidUpdate() {
    this.saveWindowState();
  }

  render() {
    return (
      <WindowContext.Provider
        value={{
          windowWidth: this.state.windowWidth,
          windowHeight: this.state.windowHeight,
          stickySidebar: this.state.stickySidebar,
          stuckSidebar: this.state.stuckSidebar,
          actions: {
            updateWindowDimensions: this.updateWindowDimensions,
            setStickySidebar: this.setStickySidebar,
            setStuckSidebar: this.setStuckSidebar
          }
        }}
      >
        {this.props.children}
      </WindowContext.Provider>
    );
  }
}

export const { Consumer: WindowConsumer } = WindowContext;
