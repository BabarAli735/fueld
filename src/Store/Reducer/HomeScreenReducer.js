import {IS_ORDER_CANCEL} from '../ActionType';

const initialState = {
  isOrderCancel: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_ORDER_CANCEL:
      return {
        ...state,
        isOrderCancel: action.isOrderCancel,
      };
    default:
      return state;
  }
};
