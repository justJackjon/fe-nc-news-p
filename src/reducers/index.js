import { combineReducers } from 'redux';
import windowReducer from './windowReducer';
import sidebarReducer from './sidebarReducer';

const rootReducer = combineReducers({
  windowReducer,
  sidebarReducer
});

export default rootReducer;
