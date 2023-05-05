import {Dimensions, Platform, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const {width, height} = Dimensions.get('window');

/* *************** Colors ********** */

export const COLORS = {
  // base colors
  secondary: '#f3f3f1',
  primary: '#30426a',
  transparent: 'transparent',

  // normal colors
  black: '#000000',
  blackWith50Opacity: '#00000080',
  white: '#FFFFFF',
  iceBlue: '#f0f3f5',
  brownGrey: '#959595',
  mushroom: '#a4a3a3',
  red: '#E8292A',
  turqoise: '#06a6ca',
  turqoiseBlue: '#00b9ce',
  darkBlueGrey: '#30426a40',
  startColor: '#fcba03',
};

const appTheme = {COLORS};

export default appTheme;

/* * Fonts * */
export const FONTFAMILY = {
  Light: 'Poppins-Light',
  Medium: 'Poppins-Medium',
  Bold: 'Poppins-Bold',
  Ionicons: 'Ionicons',
  AntDesign: 'AntDesign',
  Entypo: 'Entypo',
  FontAwesome: 'FontAwesome',
  Feather: 'Feather',
  MaterialIcons: 'MaterialIcons',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  Octicons: 'Octicons',
  SimpleLineIcons: 'SimpleLineIcons',
  EvilIcons: 'EvilIcons',
};

/* * Images * */
export const IMAGES = {
  ArrowRight: require('../assets/ArrowRight.png'),
  Buildings: require('../assets/Buildings.png'),
  Buildings2: require('../assets/Buildings2.png'),
  ButtonFacebook: require('../assets/ButtonFacebook.png'),
  ButtonGoogle: require('../assets/ButtonGoogle.png'),
  ButtonHighlight: require('../assets/ButtonHighlight.png'),
  ButtonUnhighlight: require('../assets/ButtonUnhighlight.png'),
  IconApple: require('../assets/IconApple.png'),
  LogoFueldUser: require('../assets/logoFueldUser.png'),
  LogoFueldUser1: require('../assets/logoFueldUser1.png'),
  LogoSplash: require('../assets/LogoSplash.png'),
  user1: require('../assets/user1.png'),
  fire: require('../assets/fire.png'),
  truck: require('../assets/track.png'),
  world: require('../assets/world.png'),
  card_fuel: require('../assets/card-fuel.png'),
  track_car: require('../assets/track-car.png'),
  clock: require('../assets/clock.png'),
  CreditCard: require('../assets/creditCard.png'),
  PayPall: require('../assets/PayPall.png'),
  Fueldpump: require('../assets/Fueldpump.png'),
  LocationMarkerPin: require('../assets/LocationMarkerPin.png'),
  markerLoaderWithOutBg: require('../assets/markerLoaderWithOutBg.gif'),
};

/* * Screens * */
export const SCREENS = {
  Auth: 'Auth',
  Splash: 'Splash',
  Login: 'Login',
  SignUp: 'SignUp',
  Verification: 'Verification',
  ResetPassword: 'ResetPassword',
  ForgotPassword: 'ForgotPassword',
  Profile: 'Profile',
  Notifications: 'Notifications',
  DrawerNavigator: 'DrawerNavigator',
  Home: 'Home',
  EditProfile: 'EditProfile',
  Chat: 'Chat',
  Rating: 'Rating',
  AboutApp: 'AboutApp',
  TermsAndConditions: 'TermsAndConditions',
  RideDetails: 'RideDetails',
  Notifications: 'Notifications',
  Profile: 'Profile',
  Wallet: 'Wallet',
  SelectQuantity: 'SelectQuantity',
  Booking_Confirm: 'Booking_Confirm',
  Order_Tracking: 'Order_Tracking',
  TuturialScreens: 'TuturialScreens',
  NearBy: 'NearBy',
  Support: 'Support',
  AllReviews: 'AllReviews',
  OrderDetails: 'OrderDetails',
  AddCard: 'AddCard',
};

export const SIZES = {
  // global sizes
  five: height * 0.0055,
  ten: height * 0.011,
  fifteen: height * 0.017,
  twenty: height * 0.023,
  twentyWidth: width * 0.04,
  twentyFive: height * 0.03,
  fifty: height * 0.075,
  fiftyWidth: width * 0.125,

  // font sizes
  h16: width * 0.034,
  h18: width * 0.038,
  h20: width * 0.042,
  h22: width * 0.048,
  h24: width * 0.055,
  body08: width * 0.024,
  body10: width * 0.028,
  body12: width * 0.032,
  body14: width * 0.036,
  body16: width * 0.04,
  body18: width * 0.045,
};

export const FONTS = {
  boldFont16: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h16,
    color: COLORS.black,
  },
  boldFont18: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h18,
    color: COLORS.black,
  },
  boldFont20: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h20,
    color: COLORS.black,
  },
  boldFont22: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h22,
    color: COLORS.black,
  },
  boldFont24: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h24,
    color: COLORS.black,
  },
  mediumFont10: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body10},
  mediumFont12: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body12},
  mediumFont14: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body14},
  mediumFont16: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body16},
  mediumFont18: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body18},
  lightFont08: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body08},
  lightFont10: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body10},
  lightFont12: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body12},
  lightFont14: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body14},
  lightFont16: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body16},
  lightFont18: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body18},
};

export const STYLES = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    flex: 1,
  },
  splashLogo: {
    width: SIZES.fifteen * 13,
    height: SIZES.fifteen * 13,
    alignSelf: 'center',
  },
  loginView: {
    flex: 1,
    width: '100%',
    marginTop: SIZES.twenty,
    paddingHorizontal: SIZES.twenty,
  },
  lightText: {
    fontFamily: FONTFAMILY.Light,
  },
  mediumText: {
    fontFamily: FONTFAMILY.Medium,
  },
  boldText: {
    fontFamily: FONTFAMILY.Bold,
  },
  headingText: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.twenty + 5,
    color: COLORS.black,
  },
  paragraphText: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: SIZES.fifteen - 1,
    color: COLORS.black,
  },
  drawerItem: {
    paddingHorizontal: SIZES.fifteen + 3,
    paddingVertical: SIZES.fifteen,
    alignItems: 'center',
    borderRadius: SIZES.fifteen,
  },
  drawerIcon: {
    fontSize: SIZES.fifteen + 10,
  },
  drawerText: {
    fontSize: SIZES.fifteen,
    fontFamily: FONTFAMILY.Medium,
    color: COLORS.black,
    marginHorizontal: SIZES.fifteen - 5,
  },
  horLine: {
    height: 0.4,
    flex: 1,
    backgroundColor: COLORS.mushroom,
  },
  CardStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 60,
    borderRadius: SIZES.ten,
    marginHorizontal: SIZES.five / 2,
    paddingHorizontal: SIZES.five / 2,
    marginVertical: SIZES.five * 1.3,
    color: COLORS.black,
  },
  CardImage: {
    height: width * 0.1,
    width: width * 0.1,
  },
});

/* * Api Path * */
export const CONSTANTS = {
  DESINATIONS: {
    FORGOT_PASSWORD: 'forgot_password',
    SIGN_UP: 'sign_up',
    ORDER_NOW: 'order_now',
    SCHEDULE: 'schedule',
    BOOKING_DETAILS: 'bd',
    BOOKING_CONFIRMED: 'bc',
  },

  /* * Cache keys * */
  CACHE: {
    IS_FIRST_TIME: 'is_first_time',
  },

  /* * FirebaseConstants * */
  FIREBASE: {
    CHAT: 'Chat',
    MESSAGES: 'messages',
    USERS: 'Users',
    CHATHEADS: 'ChatHeads',
    READ: 'read',
    TOKEN: 'Tokens',
    FCM: 'https://fcm.googleapis.com/fcm/send',
  },

  /* * Api Calls * */
  API_CALLS: {
    BASE_URL: 'http://fueld.reignsol.net/api/v1',
    IMAGE_URL: 'http://fueld.reignsol.net',

    REGISTER: '/customer/register',
    LOGIN: '/customer/login',
    VERIFY_OTP: '/customer/verify-otp',
    RESEND_OTP: '/customer/resend-otp',
    FORGOT_PASSWORD: '/customer/forgot-password',
    RESET_PASSWORD: '/customer/reset-password',
    CHANGE_PASSWORD: '/customer/change-password',
    GOOGLE_LOGIN: '/customer/social/google',
    FACEBOOK_LOGIN: '/customer/social/facebook',
    APPLE_LOGIN: '/customer/social/apple',
    SAVEDEVICETOKEN: '/customer/saveUserDeviceToken',
    GET_PROFILE: '/customer/getProfile',
    UPDATE_PROFILE: '/customer/update-profile',
    SIGN_OUT: '/customer/sign-out',
    GETFUELS: '/customer/getFuels',
    PLACE_ORDER: 'customer/orderPlaced',
    ORDER_CONFIRM: 'customer/orderDetails',
    CONCEL_ORDER: 'customer/cancelOrder',
    CONTENT: '/contents',
    ALLREVIEWS: '/customer/getAllReviewsByRider',
    ADDREVIEWS: '/customer/addReviews',
    ADD_CARD: '/customer/addCard',
    GET_CARD: '/customer/getCards',
    GETNOTIFICATIONS: '/customer/notifications',
    Get_RiDE_Location: '/customer/getLatestRiderCoordinates?',
  },

  Token: {
    accessToken: '',
  },

  RideStatus: {
    accepted: 'accepted',
    arrived: 'arrived',
    complete: 'complete',
  },
};
