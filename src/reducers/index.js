import { combineReducers } from 'redux';
import window from './windowReducer';
import sidebar from './sidebarReducer';

const rootReducer = combineReducers({
  window,
  sidebar
});

export default rootReducer;
