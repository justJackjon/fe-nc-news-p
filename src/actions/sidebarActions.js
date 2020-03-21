import * as sidebarActionTypes from '../actiontypes/sidebarActionTypes';

export const setStickySidebar = stickySidebar => ({
  type: sidebarActionTypes.SET_STICKY_SIDEBAR,
  stickySidebar
});
