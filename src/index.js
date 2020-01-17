import React from 'react';
import ReactDOM from 'react-dom';
import { WindowProvider } from './Components/Context/WindowProvider';
import { UserSettingsProvider } from './Components/Context/UserSettingsProvider';
import { SearchProvider } from './Components/Context/SearchProvider';
import './index.css';
import App from './Components/App/App';

ReactDOM.render(
  <UserSettingsProvider>
    <SearchProvider>
      <WindowProvider>
        <App />
      </WindowProvider>
    </SearchProvider>
  </UserSettingsProvider>,
  document.getElementById('root')
);
