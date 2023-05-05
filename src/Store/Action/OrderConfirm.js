import { CONSTANTS } from "../../constants/theme";
import { ORDER_CONFIRM } from "../ActionType";
import Axios from "./../../network/index";
import utils from "../../utils";

export const OrderConfirm = (orderId, response) => {
  return async (dispatch, getState) => {
    const token = getState().Auth.AccessToken;

    console.log("OrderConfirm =======>>>>>>>token", token);

    let confiq = {
      headers: {
        Authorization: token,
      },
      params: {
        order_id: orderId,
      },
    };

    const onSuccess = ({ data }) => {
      console.log(
        " order confirm response  ======>",
        JSON.stringify(data.data)
      );

      dispatch({
        type: ORDER_CONFIRM,
        orderconfirm: data.data,
      });

      response({ success: 1, error: null });
    };

    const onFailure = (error) => {
      console.log("order confirm error ======>", error);
      let errorMsg = utils.showResponseError(error);
      response({ success: 0, error: errorMsg });
    };

    Axios.get(CONSTANTS.API_CALLS.ORDER_CONFIRM, confiq)
      .then(onSuccess)
      .catch(onFailure);
  };
};

export const OrderConfirmFromProps = (data) => {
  return async (dispatch, getState) => {
    dispatch({
      type: ORDER_CONFIRM,
      orderconfirm: data,
    });
  };
};
