import {
  initSplitSdk,
  getSplitNames,
  getTreatments
} from '@splitsoftware/splitio-redux';
import { store } from '../index';
import { generateUUID } from '../actions/userActions';

export const initFeatureFlags = () => {
  let {
    user: { UUID }
  } = store.getState();

  if (!UUID) {
    store.dispatch(generateUUID());
    UUID = store.getState().user.UUID;
  }

  const config = {
    development: {
      authorizationKey: process.env.REACT_APP_SPLIT_STAGING_API_KEY
    },
    test: { authorizationKey: process.env.REACT_APP_SPLIT_STAGING_API_KEY },
    production: { authorizationKey: process.env.REACT_APP_SPLIT_PROD_API_KEY }
  };

  store
    .dispatch(
      initSplitSdk({
        config: {
          core: {
            ...config[process.env.NODE_ENV || 'development'],
            key: UUID
          },
          startup: {
            readyTimeout: 1.5
          }
        }
      })
    )
    .then(() => {
      const splitNames = getSplitNames();
      store.dispatch(getTreatments({ splitNames }));
    });

  return store.getState().flags;
};
