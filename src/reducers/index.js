import { combineReducers } from 'redux';
import { splitReducer } from '@splitsoftware/splitio-redux';
import window from './windowReducer';
import sidebar from './sidebarReducer';
import user from './userReducer';
import CMS from './cmsReducer';

const rootReducer = combineReducers({
  flags: splitReducer,
  window,
  sidebar,
  user,
  CMS
});

export default rootReducer;
