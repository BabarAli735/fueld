import {MESSAGEINDICATOR, NOTOFICATIONINDICATOR} from '../ActionType';

export const handleMessageNotification = state => {
  return {
    type: MESSAGEINDICATOR,
    message: state,
  };
};

export const handlekilledStateNotification = state => {
  return {
    type: NOTOFICATIONINDICATOR,
    notification: state,
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
