import React from 'react';
import ReactDOM from 'react-dom';
import configStore from './configReduxStore';
import { Provider } from 'react-redux';
import debounce from 'lodash.debounce';

import { initFeatureFlags } from './utils/split';
import { initCMS } from './utils/contentful';
import { loadState, saveState } from './utils/utils';
import App from './components/App/App';

import './index.css';

export const store = configStore(loadState());
// Initialise feature flag and CMS clients after store has been instantiated.
initFeatureFlags();
initCMS();

store.subscribe(
  debounce(() => {
    // filter out flag and CMS clients before saving redux store to web storage
    const { flags, CMS, ...restOfStore } = store.getState();
    saveState(restOfStore);
  }, 100)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
