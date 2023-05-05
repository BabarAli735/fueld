import {IS_ORDER_CANCEL} from '../ActionType';

export const setOrderCancel = isOrderCancel => {
  return {
    type: IS_ORDER_CANCEL,
    isOrderCancel: isOrderCancel,
  };
};

// export const IsBookNow = location => {
//     return async (dispatch, getState) => {
//       dispatch({
//         type: OPEN_bOOKNOW_MODAL,
//         isBookNow: location,
//       });
//     };
//   };
