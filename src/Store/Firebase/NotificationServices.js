import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';
import {CONSTANTS} from '../../constants';
import Firebase from './firebaseConfig';
import Axios from '../../network';

export async function requestUserPermission(userToken, userId) {
  // console.log('requestUserPermission ======= >>>>>>>>>>> ');
  Firebase();

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFcmToken(userToken, userId);
  }
}

const getFcmToken = async (userToken, userId) => {
  try {
    messaging()
      .getToken()
      .then(token => {
        SetFcmToken(token, userToken, userId);
      });

    messaging().onTokenRefresh(token => {
      SetFcmToken(token, userToken, userId);
    });
  } catch (error) {}
};

const SetFcmToken = async (token, userToken, userId) => {
  // console.log('set fcm token ==========>', token);

  if (userId !== undefined) {
    try {
      await database()
        .ref(CONSTANTS.FIREBASE.TOKEN)
        .child(userId.toString())
        .set(token)
        .then(() => {});
    } catch (error) {}
  }

  let config = {
    headers: {
      Authorization: userToken,
    },
  };
  let data = {
    device_token: token,
  };
  const onSuccess = ({data}) => {
    // console.log('user fcm token save', data);
  };
  const onFailure = error => {
    console.log('user fcm token error', error);
  };
  Axios.post(CONSTANTS.API_CALLS.SAVEDEVICETOKEN, data, config)
    .then(onSuccess)
    .catch(onFailure);
};

export const removeFcmTokenFromFirebase = async userId => {
  if (userId !== undefined) {
    try {
      await database()
        .ref(CONSTANTS.FIREBASE.TOKEN)
        .child(userId.toString())
        .set('')
        .then(() => console.log('Token removed from firebase..!!!!!.'));
    } catch (error) {
      console.log('error ====>', error);
    }
  }
};
