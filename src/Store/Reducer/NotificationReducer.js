import {ALLNOTIFICATIONS} from '../ActionType';
const initialState = {
  AllNotifications: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ALLNOTIFICATIONS:
      return {
        ...state,
        AllNotifications: action.AllNotifications,
      };
  }
  return state;
};
