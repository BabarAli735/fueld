import {ACCESSTOKEN, LOGIN, LOGOUT, USERPROFILE} from '../ActionType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from '../../network/index';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';

import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';
import ErrorView from '../../components/modals/ErrorView';
import axios from 'axios';

export const LoginUser = (email, password, response) => {
  return async (dispatch, getState) => {
    var postData = {email: email, password: password};

    const formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);

    const onSuccess = ({data}) => {
      if (data.status === 2) {
        response({success: 2, data: data.data, error: null});
      } else {
        response({success: 1, data: data.data, error: null});
        dispatch({
          type: ACCESSTOKEN,
          token: data.data.token,
        });
        saveDataToStorage(data.data.token);
      }
    };

    const onFailure = error => {
      // console.log('error ===============>>>>>>.', error);
      let errorMsg = utils.showResponseError(error);
      response({success: 0, data: null, error: errorMsg});
    };

    axios
      .post(
        `${CONSTANTS.API_CALLS.BASE_URL}${CONSTANTS.API_CALLS.LOGIN}`,
        formData,
      )
      .then(onSuccess)
      .catch(onFailure);
  };
};

export const VerifyOtpAndLogin = (email, otp, response) => {
  return async (dispatch, getState) => {
    var postData = {email: email, otp: otp};

    const onSuccess = ({data}) => {
      dispatch({
        type: ACCESSTOKEN,
        token: data.data.token,
      });

      saveDataToStorage(data.data.token);

      response({success: 1, error: null});
    };

    const onFailure = error => {
      let errorMsg = utils.showResponseError(error);
      // response({success: 0, error: errorMsg});
    };

    Axios.post(CONSTANTS.API_CALLS.VERIFY_OTP, postData)
      .then(onSuccess)
      .catch(onFailure);
  };
};

const saveDataToStorage = userData => {
  AsyncStorage.setItem('user', JSON.stringify(userData));
};

export const Authorization = data => {
  return async (dispatch, getState) => {
    dispatch({
      type: ACCESSTOKEN,
      token: data,
    });
  };
};

export const Logout = data => {
  return async (dispatch, getState) => {
    const token = getState().Auth.AccessToken;
    const user = getState().Profile.UserProfile;

    const onSuccess = ({data}) => {
      if (data.status === 1) {
        dispatch({
          type: ACCESSTOKEN,
          token: null,
        });
        dispatch({
          type: USERPROFILE,
          userprofile: {},
        });

        removeDataFromStorage();
      }
    };

    const onFailure = error => {};

    Axios.get(CONSTANTS.API_CALLS.SIGN_OUT, {
      headers: {
        Authorization: token,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };
};

const removeDataFromStorage = userData => {
  AsyncStorage.removeItem('user', () => {});
};

const RemoveFCMToken = async userId => {
  if (userId !== undefined) {
    try {
      await database()
        .ref(CONSTANTS.FIREBASE.TOKEN)
        .child(userId.toString())
        .set('')
        .then(() => {});
    } catch (error) {}
  }
};

// Google Login Here
export const GoogleLoginUser = (data, responsee) => {
  let name = data.displayName;
  let email = data.email;
  let socialToken = data.uid;

  var postData = {email: email, name: name, social_token: socialToken};

  return (dispatch, getState) => {
    Axios.post(`${CONSTANTS.API_CALLS.GOOGLE_LOGIN}`, postData)
      .then(response => {
        // console.log('responseeeeeeee==>>>>', response.data.data);
        dispatch({
          type: LOGIN,
          Login: response.data.data,
        });
        dispatch({
          type: ACCESSTOKEN,
          token: response.data.data.token,
        });
        saveDataToStorage(response.data.data.token);

        // if user is not verified then 2 else 1
        if (data.status === 2) {
          responsee({success: 2, error: null});
        } else {
          responsee({success: 1, error: null});
        }
      })
      .catch(error => {
        let errorMsg = utils.showResponseError(error);
        responsee({success: 0, error: errorMsg});
      });
  };
};

// Facebook Login Here
export const FacebookLoginUser = (data, responsee) => {
  let name = data.displayName;
  let email = data.email;
  let socialToken = data.uid;

  var postData = {email: email, name: name, social_token: socialToken};
  return (dispatch, getState) => {
    Axios.post(CONSTANTS.API_CALLS.FACEBOOK_LOGIN, postData)
      .then(response => {
        dispatch({
          type: LOGIN,
          Login: response.data.data,
        });
        dispatch({
          type: ACCESSTOKEN,
          token: response.data.data.token,
        });
        saveDataToStorage(response.data.data.token);

        // if user is not verified then 2 else 1
        if (data.status === 2) {
          responsee({success: 2, error: null});
        } else {
          responsee({success: 1, error: null});
        }
      })
      .catch(error => {
        let errorMsg = utils.showResponseError(error);
        responsee({success: 0, error: errorMsg});
      });
  };
};

// Apple Login Here
export const AppleLoginUser = (data, responsee) => {
  let name = data.displayName;
  let email = data.email;
  let socialToken = data.uid;

  var postData = {email: email, name: name, social_token: socialToken};

  return (dispatch, getState) => {
    Axios.post(`${CONSTANTS.API_CALLS.APPLE_LOGIN}`, postData)
      .then(response => {
        dispatch({
          type: LOGIN,
          Login: response.data.data,
        });
        dispatch({
          type: ACCESSTOKEN,
          token: response.data.data.token,
        });
        saveDataToStorage(response.data.data.token);

        // if user is not verified then 2 else 1
        if (data.status === 2) {
          responsee({success: 2, error: null});
        } else {
          responsee({success: 1, error: null});
        }
      })
      .catch(error => {
        let errorMsg = utils.showResponseError(error);
        responsee({success: 0, error: errorMsg});
      });
  };
};
