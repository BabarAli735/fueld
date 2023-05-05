import {RIDESTATUS} from '../ActionType';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const RideStatus = Status => {
  return async (dispatch, getState) => {
    dispatch({
      type: RIDESTATUS,
      status: Status,
    });
    //   saveApplicationState(Status);
  };
};

const saveApplicationState = userData => {
  AsyncStorage.setItem('appstate', userData);
};
const saveOrderId = id => {
  AsyncStorage.setItem('id', id);
};
