import React from 'react';
import ReactDOM from 'react-dom';
import configStore from './configReduxStore';
import { Provider } from 'react-redux';

import { UserSettingsProvider } from './components/Context/UserSettingsProvider';
import './index.css';
import App from './components/App/App';

const store = configStore();

ReactDOM.render(
  <Provider store={store}>
    <UserSettingsProvider>
      <App />
    </UserSettingsProvider>
  </Provider>,
  document.getElementById('root')
);
