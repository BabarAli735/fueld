import axios from "axios";
import { CONSTANTS } from "../../constants";
import utils from "../../utils";
import { ALLNOTIFICATIONS } from "../ActionType";

export const GetAllNotifications = (response) => {
  return async (dispatch, getState) => {
    const token = getState().Auth.AccessToken;

    axios
      .get(
        `${CONSTANTS.API_CALLS.BASE_URL}${CONSTANTS.API_CALLS.GETNOTIFICATIONS}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(({ data }) => {
        // console.log('sdasdsdasdas ====== >>>>>> ', data);
        dispatch({
          type: ALLNOTIFICATIONS,
          AllNotifications: data.data,
        });

        response({ success: 1, error: null });
      })
      .catch((error) => {
        let errorMsg = utils.showResponseError(error);
        response({ success: 0, error: errorMsg });
      });
  };
};
