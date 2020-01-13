import React, { Component, createContext } from 'react';
import { MainContext } from './MainProvider';

export const SearchContext = createContext();

export class SearchProvider extends Component {
  static contextType = MainContext;
  actions = this.context.actions;
  loadSearchState = this.actions.loadState.call(this, 'SearchContext');
  saveSearchState = this.actions.saveState.bind(this, 'SearchContext');
  state = this.loadSearchState || {
    term: '',
    prevQuery: ''
  };

  componentDidUpdate() {
    this.saveSearchState();
  }

  render() {
    return (
      <SearchContext.Provider
        value={{
          term: this.state.term,
          prevQuery: this.state.prevQuery
        }}
      >
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}

export const { Consumer: SearchConsumer } = SearchContext;
