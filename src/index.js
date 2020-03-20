import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import WindowReducer from './reducers/window';

import { UserSettingsProvider } from './components/Context/UserSettingsProvider';
import { SidebarProvider } from './components/Context/SidebarProvider';
import './index.css';
import App from './components/App/App';

const store = createStore(WindowReducer);

ReactDOM.render(
  <Provider store={store}>
    <UserSettingsProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </UserSettingsProvider>
  </Provider>,
  document.getElementById('root')
);
