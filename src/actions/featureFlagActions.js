import * as featureFlagActionTypes from '../actiontypes/featureFlagActionTypes';

export const setFeatureFlagClient = client => ({
  type: featureFlagActionTypes.SET_FLAGS_CLIENT,
  client,
});

export const setFlagsReady = () => ({
  type: featureFlagActionTypes.SET_FLAGS_READY,
});

export const setFlagsTimedOut = () => ({
  type: featureFlagActionTypes.SET_FLAGS_TIMED_OUT,
});
