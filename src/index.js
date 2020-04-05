import React from 'react';
import ReactDOM from 'react-dom';
import configStore from './configReduxStore';
import { Provider } from 'react-redux';
import debounce from 'lodash.debounce';

import { initFeatureFlags } from './utils/split';
import { loadState, saveState } from './utils/utils';
import App from './components/App/App';

import './index.css';

export const store = configStore(loadState());
// Initialise feature flag client after store has been instantiated.
initFeatureFlags();

store.subscribe(
  debounce(() => {
    // filter out split client before saving redux store to web storage
    const { flags, ...restOfStore } = store.getState();
    saveState(restOfStore);
  }, 100)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
