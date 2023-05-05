import {MESSAGEINDICATOR, NOTOFICATIONINDICATOR} from '../ActionType';

const initialState = {
  messageIndicator: false,
  notificationIndicator: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MESSAGEINDICATOR:
      return {
        ...state,
        messageIndicator: action.message,
      };
    case NOTOFICATIONINDICATOR:
      return {
        ...state,
        notificationIndicator: action.notification,
      };
  }
  return state;
};
