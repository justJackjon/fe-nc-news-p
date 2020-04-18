import * as cmsActionTypes from '../actiontypes/cmsActionTypes';

export const setCMSclient = client => ({
  type: cmsActionTypes.SET_CMS_CLIENT,
  client
});
