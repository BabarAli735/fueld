import {APPLOADING} from '../ActionType';

export const setAppLoading = isLoading => {
  return async (dispatch, getState) => {
    dispatch({
      type: APPLOADING,
      isLoading: isLoading,
    });
    //   saveApplicationState(Status);
  };
};
