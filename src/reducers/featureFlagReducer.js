import * as featureFlagActionTypes from '../actiontypes/featureFlagActionTypes';

const initialState = {
  ready: false,
  timedOut: false,
};

const featureFlagReducer = (state = initialState, action) => {
  switch (action.type) {
    case featureFlagActionTypes.SET_FLAGS_CLIENT:
      const { client } = action;
      return { ...state, client };
    case featureFlagActionTypes.SET_FLAGS_READY:
      return { ...state, ready: true };
    case featureFlagActionTypes.SET_FLAGS_TIMED_OUT:
      return { ...state, timedOut: true };
    default:
      return state;
  }
};

export default featureFlagReducer;
