import React, {useEffect, useState} from 'react';
import {
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import RNRestart from 'react-native-restart';
import RNExitApp from 'react-native-exit-app';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {COLORS, FONTS, SCREENS, SIZES} from '../constants';
import Splash from '../screen/Auth/Splash';
import Login from '../screen/Auth/Login';
import ForgotPassword from '../screen/Auth/ForgotPassword';
import ResetPassword from './../screen/Auth/ResetPassword';
import Verification from './../screen/Auth/Verification';
import AboutApp from '../screen/content/AboutApp';
import OrderDetails from '../screen/OrderDetails';
import OrderTracking from '../screen/OrderTracking';
import TermsAndConditions from '../screen/content/TermsAndConditions';
import RideDetails from './../screen/Details/RideDetails';
import Notifications from './../screen/Notifications/Notifications';
import Home from '../screen/home/Home';
import DrawerNavigator from '../navigation/drawer/index';
import Booking_Confirm from '../screen/BookingConfirmed';
import TuturialScreens from '../screen/Auth/TuturialScreens';
import AllReviews from '../screen/Reviews/index';
import Rating from '../screen/Reviews/Rating';
import firebaseConfig from '../Store/Firebase/firebaseConfig';
import AddCard from '../screen/AddCard';

// Redux import Here
import * as OrderConfirmAction from '../Store/Action/OrderConfirm';
import * as IndicatorAction from '../Store/Action/IndicatorAction';
import * as AuthActions from '../Store/Action/Login';
import * as ProfileAction from '../Store/Action/UserProfile';
import * as NotificationAction from '../Store/Action/NotificationAction';
import * as RideStatus from '../Store/Action/AppStatAction';
import * as AppLoadingAction from '../Store/Action/AppLoading';

import Chat from '../screen/Chat/Chat';
import Card from '../components/Card';
import Row from '../components/Row';
import ButtonRadius10 from '../components/ButtonRadius10';
import RiderArrivedModal from '../components/modals/RiderArrivedModal';
import {StatusBar} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export default function MainNavigation() {
  const Stack = createStackNavigator();
  const dispatcher = useDispatch();
  const navRef = React.useRef();

  const Auth = useSelector(state => state.Auth.AccessToken);
  const APPLOADING = useSelector(state => state.AppLoading.isLoading);

  console.log('APPLOADING', APPLOADING);
  const [isRiderArrived, setisRiderArrived] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPermission, setShowPermission] = useState(false);
  const [reload, setReload] = useState('Allow Access');

  useEffect(() => {
    // notificationListener();
    getUserAccessToken();
  }, [Auth]);

  const whenInUseLocation = async () => {
    request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
      console.log(result);

      if (result === 'granted') {
        checkStatusForIos(result);
      } else if (result === 'blocked') {
        setShowPermission(true);
      }
    });
  };

  /*  ###################################   ###################################* */
  /*  ***************** FIREBASE NOTIFICATIION LISTENERS START ***************** */
  /*  ###################################   ###################################* */
  const notificationListener = async () => {
    messaging().onNotificationOpenedApp(rm => {
      console.log('Notification caused app to open from background', rm);

      if (Auth !== null) {
        chechNotification(rm.data);
      }
    });

    // Check forGround
    messaging().onMessage(async rm => {
      console.log('Notification in foreground', rm);
      chechNotification(rm.data);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(rm => {
        if (rm) {
          // console.warn("Notification caused app to open from quit ", rm);
          // console.log("getInitialNotification======", rm);
          chechNotification(rm.data);
          _handleMessageNotification();
          handlekilledStateNotification();
        }
      })
      .catch(error => {
        console.log('getInitialNotification ======> ', error);
      });
  };

  /*  ###################################   ###################################* */
  /*  ***************** FIREBASE NOTIFICATIION LISTENERS END ******************* */
  /*  ###################################   ###################################* */
  const chechNotification = data => {
    console.log('chechNotification', data);

    switch (data.trigger_type) {
      case 'accept_order':
        onOrderConfirm(data.trigger_id, 'accept_order');
        break;
      case 'arrived':
        onOrderConfirm(data.trigger_id, 'arrived');
        setisRiderArrived(true);
        break;
      case 'completed':
        RideComplete(data.trigger_id, 'completed');

        break;
      case 'rider_review_order':
        break;
    }
  };

  const RideComplete = async (id, type) => {
    AsyncStorage.setItem('hasArrived', type);
    await dispatcher(
      OrderConfirmAction.OrderConfirm(id, res => {
        if (res.success === 1) {
          navRef?.current?.navigate(SCREENS.Rating);
        }
      }),
    );
  };

  const openSettings = () => {
    if (reload === 'Allow Access') {
      if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:');
      } else {
        Linking.openSettings();
      }
      setTimeout(() => {
        setReload('Reload');
      }, 500);
    } else {
      RNRestart.Restart();
    }
  };

  // Check platform then check if location permissions are granted or not
  const checkPlatfrom = async () => {
    if (Platform.OS === 'ios') {
      getPermissionStatus();
    } else {
      androidLocationPermission();
    }
  };

  // Get permission status for iOS
  const getPermissionStatus = () => {
    check(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then(result => {
        checkStatusForIos(result);
      })
      .catch(error => {
        console.log('Get Permision status  =========>', error);
        console.log('Open Modal Setting Button =========>1');
        setShowPermission(true);
      });
  };

  // Check Permision Status if Granted then Get Location if Denied Again Put Request For Allow Location Permission
  const checkStatusForIos = async result => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        // console.log(
        //   'This feature is not available (on this device / in this context)',
        // );
        setShowPermission(true);
        break;
      case RESULTS.DENIED:
        // console.log(
        //   'The permission has not been requested / is denied but requestable',
        // );
        requestPermissionForIos();
        break;
      case RESULTS.LIMITED:
        // console.log('The permission is limited: some actions are possible');
        setShowPermission(true);
        break;
      case RESULTS.GRANTED:
        // console.log('The permission is granted');
        getUserAccessToken();

        // console.log('open application');
        break;
      case RESULTS.BLOCKED:
        //   console.log('The permission is BLOCKED');
        //   console.log('Open Modal Setting Button =========>2');
        whenInUseLocation();
        // setShowPermission(true);
        break;
    }
  };

  // Request For location Permision in Ios only
  const requestPermissionForIos = async () => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(result => {
      console.log(result);
      checkStatusForIos(result);
    });
  };

  // Request For location Permision in android only
  const androidLocationPermission = async () => {
    const locationGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (locationGranted === 'never_ask_again' || locationGranted === 'denied') {
      setShowPermission(true);
    } else {
      getUserAccessToken();
    }
  };

  /*  ###################################   ###################################* */
  /*  ************************ GET ACCESS TOKEN IN ASYNC *********************** */
  /*  ###################################   ###################################* */
  const getUserAccessToken = async () => {
    setShowPermission(false);

    const value = await AsyncStorage.getItem('user');
    // console.log('access  token ======>', value);

    const accessToken = JSON.parse(value);
    if (accessToken !== undefined || accessToken !== null) {
      tryLogin(accessToken);
    }

    setTimeout(() => {
      notificationListener();
      setApploading();
    }, 2000);
  };

  const setApploading = async () => {
    await dispatcher(AppLoadingAction.setAppLoading(false));
  };
  /*  ###################################   ###################################* */
  /*  *********************** TRY TO LOGUN AUTHENCATE USER ********************** */
  /*  ###################################   ###################################* */
  const tryLogin = async data => {
    await dispatcher(AuthActions.Authorization(data));

    await dispatcher(
      ProfileAction.GetProfile(response => {
        console.log(response);
      }),
    );
    await dispatcher(
      NotificationAction.GetAllNotifications(response => {
        // console.log('dguadgasdghashb ====== >>>>> ', response);
        if (response.success === 1) {
          // alert("agyi");
        }
      }),
    );
    // notificationListener();
  };

  /*  ###################################   ###################################* */
  /*  *********************** USE TO CALL ORDER CONFIRM DATA ANG NAVIGATION TO ORDER CONFIRM SCREEN ********************** */
  /*  ###################################   ###################################* */
  const onOrderConfirm = async (id, type) => {
    AsyncStorage.setItem('hasArrived', type);

    await dispatcher(
      OrderConfirmAction.OrderConfirm(id, res => {
        console.log('OrderConfirmAction res', res);
        if (res.success === 1) {
          navRef?.current?.navigate(SCREENS.Order_Tracking);
        }
      }),
    );
  };

  const _handleMessageNotification = async () => {
    await dispatcher(IndicatorAction.handleMessageNotification(true));
  };

  const handlekilledStateNotification = async () => {
    await dispatcher(IndicatorAction.handlekilledStateNotification(true));
  };

  if (showPermission) {
    return (
      <View style={{flex: 1, backgroundColor: COLORS.blackWith50Opacity}}>
        <Modal visible={true}>
          <Card
            style={{
              borderRadius: SIZES.fifteen,
              padding: SIZES.fifteen,
              backgroundColor: COLORS.secondary,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={[FONTS.mediumFont12, {color: COLORS.primary}]}>
              Please allow location access to continue
            </Text>
            <Row style={{marginTop: SIZES.ten}}>
              <ButtonRadius10
                label={reload}
                style={{flex: 1, marginRight: SIZES.ten}}
                onPress={() => openSettings()}
              />
              <ButtonRadius10
                label={'Cancel'}
                isBrightButton
                style={{flex: 1, marginLeft: SIZES.ten}}
                onPress={() => RNExitApp.exitApp()}
              />
            </Row>
          </Card>
        </Modal>
      </View>
    );
  }

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={COLORS.transparent}
        barStyle={'dark-content'}
      />
      <View
        style={{
          height: getStatusBarHeight(),
          backgroundColor: COLORS.secondary,
        }}
      />
      {APPLOADING ? (
        <>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.primary,
            }}>
            <ActivityIndicator size="large" color={COLORS.white} />
          </View>
        </>
      ) : (
        <>
          <NavigationContainer ref={navRef}>
            <Stack.Navigator
              screenOptions={{headerShown: false}}
              // initialRouteName={SCREENS.AddCard}
            >
              {Auth !== null ? (
                <>
                  <Stack.Screen
                    name={SCREENS.DrawerNavigator}
                    component={DrawerNavigator}
                  />

                  <Stack.Screen name={SCREENS.Chat} component={Chat} />
                  <Stack.Screen name={SCREENS.AboutApp} component={AboutApp} />
                  <Stack.Screen
                    name={SCREENS.TermsAndConditions}
                    component={TermsAndConditions}
                  />
                  <Stack.Screen
                    name={SCREENS.RideDetails}
                    component={RideDetails}
                  />
                  <Stack.Screen
                    name={SCREENS.AllReviews}
                    component={AllReviews}
                  />
                  <Stack.Screen name={SCREENS.Rating} component={Rating} />
                  <Stack.Screen
                    name={SCREENS.Notifications}
                    component={Notifications}
                  />
                  <Stack.Screen
                    name={SCREENS.Booking_Confirm}
                    component={Booking_Confirm}
                  />
                  <Stack.Screen name={SCREENS.Home} component={Home} />
                  <Stack.Screen
                    name={SCREENS.Order_Tracking}
                    component={OrderTracking}
                  />
                  <Stack.Screen name={SCREENS.AddCard} component={AddCard} />
                  <Stack.Screen
                    name={SCREENS.OrderDetails}
                    component={OrderDetails}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen name={SCREENS.Splash} component={Splash} />
                  {/* // Auth Screens here */}
                  <Stack.Screen
                    name={SCREENS.TuturialScreens}
                    component={TuturialScreens}
                  />
                  <Stack.Screen name={SCREENS.Login} component={Login} />
                  <Stack.Screen
                    name={SCREENS.ForgotPassword}
                    component={ForgotPassword}
                  />
                  <Stack.Screen
                    name={SCREENS.ResetPassword}
                    component={ResetPassword}
                  />
                  <Stack.Screen
                    name={SCREENS.Verification}
                    component={Verification}
                  />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>

          <RiderArrivedModal
            visibility={isRiderArrived}
            setVisibility={setisRiderArrived}
          />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
