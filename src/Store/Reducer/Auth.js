import {LOGIN, AUTHENTICATE, LOGOUT, ACCESSTOKEN} from '../ActionType';

const initialState = {
  AccessToken: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        Login: action.Login,
      };
    case ACCESSTOKEN:
      return {
        ...state,
        AccessToken: action.token,
      };
    case LOGOUT:
      return {
        ...state,
        AccessToken: null,
      };
  }
  return state;
};
