import React from 'react';
import ReactDOM from 'react-dom';
import { WindowProvider } from './Components/Context/WindowProvider';
import { UserSettingsProvider } from './Components/Context/UserSettingsProvider';
import { SidebarProvider } from './Components/Context/SidebarProvider';
import './index.css';
import App from './Components/App/App';

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
