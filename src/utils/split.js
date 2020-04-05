import { store } from '../index';
import { generateUUID } from '../actions/userActions';
import { SplitFactory } from '@splitsoftware/splitio';
import {
  setFeatureFlagClient,
  setFlagsReady,
  setFlagsTimedOut,
} from '../actions/featureFlagActions';

export const initFeatureFlags = () => {
  let {
    user: { UUID },
  } = store.getState();

  if (!UUID) {
    store.dispatch(generateUUID());
    UUID = store.getState().user.UUID;
  }

  const config = {
    development: {
      authorizationKey: process.env.REACT_APP_SPLIT_STAGING_API_KEY,
    },
    test: { authorizationKey: process.env.REACT_APP_SPLIT_STAGING_API_KEY },
    production: { authorizationKey: process.env.REACT_APP_SPLIT_PROD_API_KEY },
  };

  const factory = SplitFactory({
    core: {
      ...config[process.env.NODE_ENV || 'development'],
      key: UUID,
    },
    startup: {
      readyTimeout: 1.5,
    },
  });

  const splitClient = factory.client();

  splitClient.on(splitClient.Event.SDK_READY, () => {
    store.dispatch(setFlagsReady());
  });

  splitClient.on(splitClient.Event.SDK_READY_TIMED_OUT, () => {
    store.dispatch(setFlagsTimedOut());
  });

  store.dispatch(setFeatureFlagClient(splitClient));

  return splitClient;
};
