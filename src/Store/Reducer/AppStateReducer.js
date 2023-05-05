import {RIDESTATUS} from '../ActionType';

const initialState = {
  RideStatus: 'Pending',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RIDESTATUS:
      return {
        ...state,
        RideStatus: action.status,
      };

    default:
      return state;
  }
};
