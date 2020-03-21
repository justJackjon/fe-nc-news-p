import {
  createStore,
  // applyMiddleware,
  compose
} from 'redux';
import rootReducer from './reducers';

const configStore = initialState => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(rootReducer, initialState, composeEnhancers());
};

export default configStore;
