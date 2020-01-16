import React, { Component, createContext } from 'react';

export const MainContext = createContext();

export class MainProvider extends Component {
  loadMainState = this.loadState.call(this, 'MainContext'); // saveState/loadState is also passed via the Context API
  saveMainState = this.saveState.bind(this, 'MainContext'); // to other components, so we implicitly bind it here.
  state = this.loadMainState || {
    displayMode: 'light',
    windowWidth: 0,
    windowHeight: 0
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

  updateWindowDimensions = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  };

  componentDidUpdate() {
    this.saveMainState();
  }

  render() {
    return (
      <MainContext.Provider
        value={{
          displayMode: this.state.displayMode,
          windowWidth: this.state.windowWidth,
          windowHeight: this.state.windowHeight,
          actions: {
            loadState: this.loadState,
            saveState: this.saveState,
            updateWindowDimensions: this.updateWindowDimensions
          }
        }}
      >
        {this.props.children}
      </MainContext.Provider>
    );
  }
}

export const { Consumer: MainConsumer } = MainContext;
