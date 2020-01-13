import React from 'react';
import ReactDOM from 'react-dom';
import { MainProvider } from './Components/Context/MainProvider';
import { SearchProvider } from './Components/Context/SearchProvider';
import './index.css';
import App from './Components/App/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <MainProvider>
    <SearchProvider>
      <App />
    </SearchProvider>
  </MainProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
