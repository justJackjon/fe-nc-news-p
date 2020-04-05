import { combineReducers } from 'redux';
import window from './windowReducer';
import sidebar from './sidebarReducer';
import user from './userReducer';
import flags from './featureFlagReducer';

const rootReducer = combineReducers({
  window,
  sidebar,
  user,
  flags,
});

export default rootReducer;
