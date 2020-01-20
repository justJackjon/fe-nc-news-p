import React, { Component, createContext } from 'react';
import { UserSettingsContext } from './UserSettingsProvider';

export const SidebarContext = createContext();

export class SidebarProvider extends Component {
  static contextType = UserSettingsContext;
  actions = this.context.actions;
  loadSidebarState = this.actions.loadState.call(this, 'SidebarContext');
  saveSidebarState = this.actions.saveState.bind(this, 'SidebarContext');
  state = this.loadSidebarState || {
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

  componentDidUpdate() {
    this.saveSidebarState();
  }

  render() {
    return (
      <SidebarContext.Provider
        value={{
          stickySidebar: this.state.stickySidebar,
          stuckSidebar: this.state.stuckSidebar,
          actions: {
            setStickySidebar: this.setStickySidebar,
            setStuckSidebar: this.setStuckSidebar
          }
        }}
      >
        {this.props.children}
      </SidebarContext.Provider>
    );
  }
}

export const { Consumer: SidebarConsumer } = SidebarContext;
