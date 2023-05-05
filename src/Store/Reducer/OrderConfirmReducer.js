import {ORDER_CONFIRM} from '../ActionType';

const initialState = {
  OrderConfirm: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_CONFIRM:
      return {
        ...state,
        OrderConfirm: action.orderconfirm,
      };
    default:
      return state;
  }
};
