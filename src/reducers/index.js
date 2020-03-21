import { combineReducers } from 'redux';
import window from './windowReducer';
import sidebar from './sidebarReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  window,
  sidebar,
  user
});

export default rootReducer;
