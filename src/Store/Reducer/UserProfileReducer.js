import {USERPROFILE} from '../ActionType';

const initialState = {
  UserProfile: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERPROFILE:
      return {
        ...state,
        UserProfile: action.userprofile,
      };
  }
  return state;
};
