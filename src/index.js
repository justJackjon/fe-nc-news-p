import React from 'react';
import ReactDOM from 'react-dom';
import configStore from './configReduxStore';
import { Provider } from 'react-redux';
import debounce from 'lodash.debounce';

import { loadState, saveState } from './utils/utils';
import './index.css';
import App from './components/App/App';

const store = configStore(loadState());

store.subscribe(
  debounce(() => {
    saveState(store.getState());
  }, 100)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
