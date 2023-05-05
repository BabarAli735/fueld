import {GET_RIDER_COORDINATION} from '../ActionType';
const initialState = {
  RiderCoordination: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RIDER_COORDINATION:
      return {
        ...state,
        RiderCoordination: action.RiderCoordination,
      };
  }
  return state;
};
