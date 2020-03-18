import React from 'react';
import ReactDOM from 'react-dom';
import { WindowProvider } from './components/Context/WindowProvider';
import { UserSettingsProvider } from './components/Context/UserSettingsProvider';
import { SidebarProvider } from './components/Context/SidebarProvider';
import './index.css';
import App from './components/App/App';

ReactDOM.render(
  <UserSettingsProvider>
    <WindowProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </WindowProvider>
  </UserSettingsProvider>,
  document.getElementById('root')
);
