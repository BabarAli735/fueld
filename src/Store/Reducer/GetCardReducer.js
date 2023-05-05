import {GET_CARD} from '../ActionType';

const initialState = {
  SavedCards: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CARD:
      return {
        ...state,
        SavedCards: action.cards,
      };
    default:
      return state;
  }
};
