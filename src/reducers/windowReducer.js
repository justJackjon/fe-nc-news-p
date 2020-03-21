import * as windowActionTypes from '../actiontypes/windowActionTypes';

const initialState = {
  dimensions: {
    windowWidth: 0,
    windowHeight: 0
  }
};

const windowReducer = (state = initialState, action) => {
  switch (action.type) {
    case windowActionTypes.UPDATE_WINDOW_DIMENSIONS:
      return {
        dimensions: {
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight
        }
      };
    default:
      return state;
  }
};

export default windowReducer;
