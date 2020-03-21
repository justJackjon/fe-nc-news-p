import React from 'react';
import ReactDOM from 'react-dom';
import configStore from './configReduxStore';
import { Provider } from 'react-redux';

import { UserSettingsProvider } from './components/Context/UserSettingsProvider';
import { SidebarProvider } from './components/Context/SidebarProvider';
import './index.css';
import App from './components/App/App';

const store = configStore();

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
