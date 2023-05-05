import React, {useState, useRef, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import appleAuth, {
  AppleButton,
  AppleAuthError,
  AppleRequestScope,
  AppleRequestOperation,
} from '@invertase/react-native-apple-authentication';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import FBSDK, {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useDispatch} from 'react-redux';
import ButtonRadius10 from '../../components/ButtonRadius10';
import EditText from '../../components/EditText';
import Loader from '../../components/Loader';
import MyTouchableOpacity from '../../components/MyTouchableOpacity';
import Row from '../../components/Row';
import utils from '../../utils';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
} from '../../constants';
import ErrorView from '../../components/modals/ErrorView';
import * as AuthActions from '../../Store/Action/Login';
import Axios from '../../network/index';

export default function Login({navigation}) {
  const [selectedTab, setSelectedTab] = useState(0);

  /* Login States Start */
  const [email, setEmail] = useState('user@yopmail.com');
  const [password, setPassword] = useState('123456');
  /* Login States End */

  /* Sign Up States Start */
  const [signUpFullName, setSignUpFullName] = useState('Rider');
  const [signUpEmail, setSignUpEmail] = useState('user@yopmail.com');
  const [signUpPassword, setSignUpPassword] = useState('12345678');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('123456');
  /* Sign Up States End */

  const [socialEmail, setSocialEmail] = useState('');
  const [socialName, setSocialName] = useState('');
  const [socialToken, setSocialToken] = useState('');
  const [facebookUser, setFacebookUser] = useState();

  const [showLoader, setShowLoader] = useState(false);
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const dispatcher = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '330132419174-ab0vjvmtctu2vu97pujvjgh5nv5ht8s7.apps.googleusercontent.com',
    });
  }, []);

  const signUpUser = async () => {
    if (utils.isEmptyOrSpaces(signUpFullName)) {
      setErrorMsg('Invalid Full Name');
      return;
    }

    if (!utils.validateEmail(signUpEmail)) {
      setErrorMsg('Invalid Email');
      return;
    }

    if (utils.isEmptyOrSpaces(signUpPassword)) {
      setErrorMsg('Invalid Password');
      return;
    }

    if (signUpPassword.length < 6) {
      setErrorMsg('Password should not be less than 6 digits');
      return;
    }

    if (signUpConfirmPassword !== signUpPassword) {
      setErrorMsg('Passwords did not match');
      return;
    }

    var postData = {
      name: signUpFullName,
      email: signUpEmail,
      password: signUpPassword,
      password_confirmation: signUpConfirmPassword,
      verified_by: 'email',
    };

    const onSuccess = ({data}) => {
      setShowLoader(false);
      navigation.navigate(SCREENS.Verification, {
        from: CONSTANTS.DESINATIONS.SIGN_UP,
        email: data.data.email,
      });
    };

    const onFailure = error => {
      setShowLoader(false);
      let msg = utils.showResponseError(error);
      setErrorMsg(JSON.stringify(msg));
    };

    setShowLoader(true);
    Axios.post(CONSTANTS.API_CALLS.REGISTER, postData)
      .then(onSuccess)
      .catch(onFailure);
  };

  // useEffect to show error modal which depends on errorMsg
  useEffect(() => {
    if (errorMsg !== '') {
      setErrorVisibility(true);
    }
  }, [errorMsg]);

  // login api call
  const loginUser = async () => {
    if (!utils.validateEmail(email)) {
      setErrorMsg('Invalid Email');
      return;
    }

    if (utils.isEmptyOrSpaces(password)) {
      setErrorMsg('Invalid Password');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password should not be less than 6 digits');
      return;
    }

    setShowLoader(true);

    // login api redux action
    await dispatcher(
      AuthActions.LoginUser(email, password, response => {
        console.log('LoginUser ===================== get respone ', response);
        setShowLoader(false);
        switch (response.success) {
          case 0:
            setErrorMsg(JSON.stringify(response.error));
            break;
          case 1:
            console.log('Logged In Success');
            break;
          case 2:
            navigation.navigate(SCREENS.Verification, {
              from: CONSTANTS.DESINATIONS.SIGN_UP,
              email: response.data.email,
            });
            break;
          default:
            setErrorMsg('Invalid Credentials');
            break;
        }
      }),
    );
  };

  // Google Login
  async function onGoogleButtonPress() {
    // setShowLoader(true);
    auth().signOut();
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth()
      .signInWithCredential(googleCredential)
      .then(async res => {
        // setShowLoader(false);

        // Google login api redux action
        await dispatcher(
          AuthActions.GoogleLoginUser(res.user, response => {
            setShowLoader(false);

            switch (response.success) {
              // successfully logged in
              case 1:
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: SCREENS.DrawerNavigator,
                    },
                  ],
                });
                break;

              // user not verified
              case 2:
                navigation.navigate(SCREENS.Verification, {
                  from: CONSTANTS.DESINATIONS.SIGN_UP,
                  email: email,
                });
                break;

              case 0:
                setErrorMsg(JSON.stringify(response.error));
                break;

              default:
                setErrorMsg('Invalid Credentials');
                break;
            }
          }),
        );
      })
      .catch(e => {
        setShowLoader(false);
      });
  }

  //Apple Login Method
  async function onAppleButtonPress() {
    // setShowLoader(true);
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      // throw 'Apple Sign-In failed - no identify token returned';
    }

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(appleCredential)
      .then(async res => {
        // setShowLoader(false);
        setSocialEmail(res.user.email);
        setSocialName(
          res.user.displayName === null
            ? res.user.email.split('@')[0]
            : res.user.displayName,
        );
        setSocialToken(res.user.uid);
        // Apple login API Redux
        await dispatcher(
          AuthActions.AppleLoginUser(res.user, response => {
            setShowLoader(false);

            switch (response.success) {
              // successfully logged in
              case 1:
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: SCREENS.DrawerNavigator,
                    },
                  ],
                });
                break;

              // user not verified
              case 2:
                navigation.navigate(SCREENS.Verification, {
                  from: CONSTANTS.DESINATIONS.SIGN_UP,
                  email: email,
                });
                break;

              case 0:
                setErrorMsg(JSON.stringify(response.error));
                break;

              default:
                setErrorMsg('Invalid Credentials');
                break;
            }
          }),
        );
      })
      .catch(e => {
        // setShowLoader(false);
      });
  }

  // FaceBook Login
  async function onFacebookButtonPress() {
    setShowLoader(true);

    auth().signOut();
    LoginManager.logOut();

    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      setShowLoader(false);
      return;
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      setShowLoader(false);
      return;
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(facebookCredential)
      .then(async res => {
        setFacebookUser(res.user);
        await dispatcher(
          AuthActions.FacebookLoginUser(res.user, response => {
            setShowLoader(false);

            switch (response.success) {
              // successfully logged in
              case 1:
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: SCREENS.DrawerNavigator,
                    },
                  ],
                });
                break;

              // user not verified
              case 2:
                navigation.navigate(SCREENS.Verification, {
                  from: CONSTANTS.DESINATIONS.SIGN_UP,
                  email: email,
                });
                break;

              case 0:
                setErrorMsg(JSON.stringify(response.error));
                break;

              default:
                setErrorMsg('Invalid Credentials');
                break;
            }
          }),
        );
      })
      .catch(e => {
        setShowLoader(false);
      });
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.secondary,
        paddingHorizontal: SIZES.fifteen,
        paddingTop: getStatusBarHeight(true),
      }}>
      {/* Row of Tabs Start */}
      <Row
        style={{
          marginHorizontal: SIZES.twentyFive * 1.5,
          justifyContent: 'space-between',
          marginTop: SIZES.twentyFive * 1.5,
          zIndex: 1,
        }}>
        {/* Sign In Tab Start */}
        <MyTouchableOpacity
          activeOpacity={0.95}
          style={styles.tabView}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Image
            source={
              selectedTab === 0
                ? IMAGES.ButtonHighlight
                : IMAGES.ButtonUnhighlight
            }
            style={styles.image}
            resizeMode={'contain'}
          />
          <Text
            style={[
              FONTS.boldFont16,
              {
                color: selectedTab === 0 ? COLORS.white : COLORS.primary,
                marginTop: -SIZES.ten,
              },
            ]}>
            Sign In
          </Text>
        </MyTouchableOpacity>
        {/* Sign In Tab End */}

        {/* Sign Up Tab Start */}
        <MyTouchableOpacity
          activeOpacity={0.95}
          style={styles.tabView}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Image
            source={
              selectedTab === 1
                ? IMAGES.ButtonHighlight
                : IMAGES.ButtonUnhighlight
            }
            style={styles.image}
            resizeMode={'contain'}
          />
          <Text
            style={[
              FONTS.boldFont16,
              {
                color: selectedTab === 1 ? COLORS.white : COLORS.primary,
                marginTop: -SIZES.ten,
              },
            ]}>
            Sign Up
          </Text>
        </MyTouchableOpacity>
        {/* Sign Up Tab End */}
      </Row>
      {/* Row of Tabs End */}

      <View
        style={{
          backgroundColor: COLORS.white,
          borderRadius: SIZES.twenty,
          marginTop: -50,
        }}>
        {selectedTab === 0 ? (
          // Login View Start
          <View
            style={{
              padding: SIZES.fifteen,
            }}>
            <View style={{marginTop: SIZES.twenty}}>
              <EditText
                placeholder="Email"
                value={email}
                onChangeText={text => {
                  setEmail(text);
                }}
                hasIcon
                name="mail"
                type={FONTFAMILY.AntDesign}
              />
              <EditText
                placeholder="Password"
                password
                value={password}
                onChangeText={text => {
                  setPassword(text);
                }}
                hasIcon
                name="lock-open"
                type={FONTFAMILY.SimpleLineIcons}
                style={{marginTop: SIZES.fifteen}}
              />

              <MyTouchableOpacity
                style={{alignSelf: 'flex-end', marginTop: SIZES.ten}}
                onPress={() => navigation.navigate(SCREENS.ForgotPassword)}>
                <Text
                  style={[
                    FONTS.mediumFont12,
                    {
                      color: COLORS.turqoise,
                      paddingVertical: SIZES.ten,
                    },
                  ]}>
                  Forgot Password?
                </Text>
              </MyTouchableOpacity>

              <ButtonRadius10
                label={'Login'}
                style={{marginTop: SIZES.twenty}}
                onPress={() => {
                  loginUser();
                  // navigation.replace(SCREENS.DrawerNavigator)
                }}
              />

              <Row
                style={{
                  marginVertical: SIZES.twentyFive,
                  alignItems: 'center',
                }}>
                <View style={STYLES.horLine} />
                <Text
                  style={[
                    FONTS.lightFont12,
                    {color: COLORS.brownGrey, flex: 1, textAlign: 'center'},
                  ]}>
                  Or continue
                </Text>
                <View style={STYLES.horLine} />
              </Row>

              <Row
                style={{
                  alignItems: 'center',
                  justifyContent:
                    Platform.OS === 'android' ? 'flex-end' : 'space-between',
                }}>
                {/* <MyTouchableOpacity
                onPress
                  style={{
                    paddingHorizontal: SIZES.twentyFive * 1.2,
                    paddingVertical: SIZES.twenty,
                    backgroundColor: '#262a34',
                    borderRadius: SIZES.twentyFive * 1.5,
                  }}>
                  <Row style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                      source={IMAGES.IconApple}
                      resizeMode="contain"
                      style={{
                        height: SIZES.fifteen * 2,
                        width: SIZES.fifteen * 2,
                      }}
                    />
                    <Text
                      style={[
                        FONTS.mediumFont12,
                        {color: COLORS.white, marginStart: SIZES.five},
                      ]}>
                      Continue with
                    </Text>
                  </Row>
                </MyTouchableOpacity> */}

                {Platform.OS === 'ios' ? (
                  <View
                    style={[
                      styles.card,
                      {
                        borderRadius: SIZES.fifty,
                        backgroundColor: '#262a34',
                        marginStart: 10,
                        height: 60,
                        width: 60,
                        borderRadius: 60,
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    ]}>
                    <AppleButton
                      buttonStyle={AppleButton.Style.BLACK}
                      buttonType={AppleButton.Type.SIGN_IN}
                      cornerRadius={60}
                      style={[
                        styles.card,
                        {
                          backgroundColor: '#262a34',
                          // height: 70,
                          // width: 70,
                          height: SIZES.twentyFive * 2.6,
                          width: SIZES.twentyFive * 2.6,
                          borderRadius: 35,
                          overflow: 'hidden',
                        },
                      ]}
                      onPress={() => onAppleButtonPress()}
                    />
                  </View>
                ) : null}
                <MyTouchableOpacity
                  onPress={() => onFacebookButtonPress()}
                  style={{
                    marginRight: Platform.OS === 'android' ? SIZES.fifteen : 0,
                  }}>
                  <Image
                    source={IMAGES.ButtonFacebook}
                    resizeMode="contain"
                    style={{
                      height: SIZES.twentyFive * 2.6,
                      width: SIZES.twentyFive * 2.6,
                    }}
                  />
                </MyTouchableOpacity>
                <MyTouchableOpacity
                  onPress={() => {
                    onGoogleButtonPress();
                  }}>
                  <Image
                    source={IMAGES.ButtonGoogle}
                    resizeMode="contain"
                    style={{
                      height: SIZES.twentyFive * 2.6,
                      width: SIZES.twentyFive * 2.6,
                    }}
                  />
                </MyTouchableOpacity>
              </Row>
            </View>
          </View>
        ) : (
          // Login View End

          // Sign Up View
          <View
            style={{
              padding: SIZES.fifteen,
            }}>
            <KeyboardAwareScrollView
              enableOnAndroid
              extraScrollHeight={100}
              showsVerticalScrollIndicator={false}
              style={{marginTop: SIZES.twenty}}>
              <View>
                <EditText
                  placeholder="Full Name"
                  hasIcon
                  value={signUpFullName}
                  onChangeText={text => setSignUpFullName(text)}
                  name="people"
                  type={FONTFAMILY.SimpleLineIcons}
                />
                <EditText
                  placeholder="Email"
                  hasIcon
                  value={signUpEmail}
                  onChangeText={text => {
                    setSignUpEmail(text);
                  }}
                  name="mail"
                  type={FONTFAMILY.AntDesign}
                  style={{marginTop: SIZES.fifteen}}
                />
                <EditText
                  placeholder="Password"
                  password
                  hasIcon
                  value={signUpPassword}
                  onChangeText={text => setSignUpPassword(text)}
                  name="lock-open"
                  type={FONTFAMILY.SimpleLineIcons}
                  style={{marginTop: SIZES.fifteen}}
                />
                <EditText
                  placeholder="Confirm Password"
                  password
                  hasIcon
                  value={signUpConfirmPassword}
                  onChangeText={text => setSignUpConfirmPassword(text)}
                  name="lock-open"
                  type={FONTFAMILY.SimpleLineIcons}
                  style={{marginTop: SIZES.fifteen}}
                />
              </View>
            </KeyboardAwareScrollView>
            <ButtonRadius10
              label={'Sign Up'}
              style={{marginTop: SIZES.twentyFive}}
              onPress={() => {
                signUpUser();
              }}
            />
          </View>
          // Sign Up View End
        )}
      </View>

      {/* Loader */}
      <Loader showLoader={showLoader} />

      {/* Error */}
      <ErrorView
        visibility={errorVisibility}
        setVisibility={setErrorVisibility}
        setErrorMsg={setErrorMsg}
        msg={errorMsg}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabView: {
    height: SIZES.fiftyWidth * 2,
    width: SIZES.fiftyWidth * 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
});
