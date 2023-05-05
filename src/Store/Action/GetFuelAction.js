import {CONSTANTS} from '../../constants/theme';
import {GETFUELS} from '../ActionType';
import Axios from './../../network/index';
import utils from '../../utils';

export const GetFuels = response => {
  return async (dispatch, getState) => {
    const token = getState().Auth.AccessToken;

    const onSuccess = ({data}) => {
      dispatch({
        type: GETFUELS,
        data: data.data.records,
      });

      response({success: 1, data: data.data.records, error: null});
    };

    const onFailure = error => {
      let errorMsg = utils.showResponseError(error);
      response({success: 0, data: null, error: errorMsg});
    };

    Axios.get(CONSTANTS.API_CALLS.GETFUELS, {
      headers: {
        Authorization: token,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };
};
