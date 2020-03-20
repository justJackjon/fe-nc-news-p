import * as windowActionTypes from '../actiontypes/window';

const initialState = {
  windowDimensions: {
    windowWidth: 0,
    windowHeight: 0
  }
};

const WindowReducer = (state = initialState, action) => {
  switch (action.type) {
    case windowActionTypes.UPDATE_WINDOW_DIMENSIONS:
      return {
        windowDimensions: {
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight
        }
      };
    default:
      return state;
  }
};

export default WindowReducer;
