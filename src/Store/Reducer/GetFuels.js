import {GETFUELS} from '../ActionType';

const initialState = {
  Data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GETFUELS:
      return {
        ...state,
        Data: action.data,
      };
    default:
      return state;
  }
};
