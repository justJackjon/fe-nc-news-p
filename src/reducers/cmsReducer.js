import * as cmsActionTypes from '../actiontypes/cmsActionTypes';

const cmsReducer = (state = null, action) => {
  switch (action.type) {
    case cmsActionTypes.SET_CMS_CLIENT:
      return action.client;
    default:
      return state;
  }
};

export default cmsReducer;
