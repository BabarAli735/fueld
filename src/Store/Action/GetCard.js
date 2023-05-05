import {CONSTANTS} from '../../constants/theme';
import {GET_CARD} from '../ActionType';
import Axios from './../../network/index';
import utils from '../../utils';

export const getCreditCards = response => {
  return async (dispatch, getState) => {
    const token = getState().Auth.AccessToken;

    const onSuccess = ({data}) => {
      // console.log(data.data);
      dispatch({
        type: GET_CARD,
        cards: data.data,
      });

      response({success: 1, error: null});
    };

    const onFailure = error => {
      let errorMsg = utils.showResponseError(error);
      response({success: 0, error: errorMsg});
    };

    Axios.get(CONSTANTS.API_CALLS.GET_CARD, {
      headers: {
        Authorization: token,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };
};
