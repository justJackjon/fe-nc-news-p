import React from 'react';
import ReactDOM from 'react-dom';
import { MainProvider } from './Components/Context/MainProvider';
import { UserSettingsProvider } from './Components/Context/UserSettingsProvider';
import { SearchProvider } from './Components/Context/SearchProvider';
import './index.css';
import App from './Components/App/App';

ReactDOM.render(
  <MainProvider>
    <UserSettingsProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </UserSettingsProvider>
  </MainProvider>,
  document.getElementById('root')
);
