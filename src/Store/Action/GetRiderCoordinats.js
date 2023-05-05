import {GET_RIDER_COORDINATION} from '../ActionType';
import Axios from './../../network/index';
import utils from '../../utils';
import {CONSTANTS} from '../../constants';

export const GetRiderCoordination = (id, response) => {
  return async (dispatch, getState) => {
    const token = getState().Auth.AccessToken;
    let confiq = {
      headers: {
        Authorization: token,
      },
      params: {
        rider_id: id,
      },
    };
    const onSuccess = ({data}) => {
      dispatch({
        type: GET_RIDER_COORDINATION,
        RiderCoordination: data.data,
      });

      response({success: 1, data: data, error: null});
    };

    const onFailure = error => {
      let errorMsg = utils.showResponseError(error);
      response({success: 0, data: null, error: errorMsg});
    };

    Axios.get(CONSTANTS.API_CALLS.Get_RiDE_Location, confiq)
      .then(onSuccess)
      .catch(onFailure);
  };
};
