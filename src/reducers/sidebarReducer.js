import * as sidebarActionTypes from '../actiontypes/sidebarActionTypes';

const initialState = {
  stickySidebar: false
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case sidebarActionTypes.SET_STICKY_SIDEBAR:
      const { stickySidebar } = action;
      return stickySidebar !== state.stickySidebar ? { stickySidebar } : null;
    default:
      return state;
  }
};

export default sidebarReducer;
