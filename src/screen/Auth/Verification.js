import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, View, StatusBar} from 'react-native';
import ButtonRadius10 from '../../components/ButtonRadius10';
import MyTouchableOpacity from '../../components/MyTouchableOpacity';
import BackArrow from '../../components/BackArrow';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  height,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
  width,
} from '../../constants';
import utils from '../../utils';
import {useDispatch} from 'react-redux';
import * as AuthActions from '../../Store/Action/Login';
import Loader from '../../components/Loader';
import ErrorView from '../../components/modals/ErrorView';
import Axios from '../../network';

export default function Verification(props) {
  const [code, setCode] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  console.log('verifyForSignUp ', props.route.params.email);
  // useEffect to show error modal which depends on errorMsg
  useEffect(() => {
    if (errorMsg !== '') {
      setErrorVisibility(true);
    }
  }, [errorMsg]);

  const dispatcher = useDispatch();

  // verify for sign up api call
  const verifyForSignUp = async () => {
    if (utils.isEmptyOrSpaces(code)) {
      setErrorMsg('Invalid Code');
      return;
    }

    setShowLoader(true);

    console.log('verifyForSignUp ', props.route.params.email, ' otp: ', code);

    // login api redux action
    await dispatcher(
      AuthActions.VerifyOtpAndLogin(
        props.route.params.email,
        code,
        response => {
          setShowLoader(false);

          if (response.success === 1) {
            props.navigation.navigate(SCREENS.DrawerNavigator);
          } else {
            setErrorMsg(JSON.stringify(response.error));
          }
        },
      ),
    );
  };

  const verifyForForgotPassword = async () => {
    if (utils.isEmptyOrSpaces(code)) {
      setErrorMsg('Invalid Codee');
      return;
    }

    setShowLoader(true);

    console.log(
      'verifyForgotPassword ',
      props.route.params.email,
      ' otp: ',
      code,
    );

    const onSuccess = ({data}) => {
      setShowLoader(false);
      console.log('Success!! ', data);
      props.navigation.navigate(SCREENS.ResetPassword, {
        email: data.data.email,
      });
    };

    const onFailure = error => {
      setShowLoader(false);
      let msg = utils.showResponseError(error);
      console.log('Verify otp responce === ===== ');
      setErrorMsg(JSON.stringify(msg));
    };

    var postData = null;
    postData = {
      email: props.route.params.email,
      otp: code,
      redirectToPassword: true,
    };

    setShowLoader(true);
    Axios.post(CONSTANTS.API_CALLS.VERIFY_OTP, postData)
      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <View style={STYLES.container}>
      {/* <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.secondary} /> */}

      <View
        style={{
          height: height,
          width: width,
          paddingHorizontal: SIZES.fifteen,
        }}>
        {/* ======================== HEADER HERE ======================== */}
        <View
          style={{
            zIndex: 1,
            justifyContent: 'center',
          }}>
          <BackArrow />
          <MyTouchableOpacity
            activeOpacity={0.95}
            style={styles.tabView}
            onPress={() => {}}>
            <Image
              source={IMAGES.ButtonHighlight}
              style={styles.image}
              resizeMode={'contain'}
            />
            <Text
              style={[
                FONTS.boldFont16,
                {
                  color: COLORS.white,
                  marginTop: -SIZES.ten,
                },
              ]}>
              Verify
            </Text>
          </MyTouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: SIZES.twenty,
            marginTop: -50,
            padding: SIZES.fifteen,
          }}>
          <Text
            style={[
              FONTS.mediumFont18,
              {color: COLORS.black, marginTop: SIZES.twenty},
            ]}>
            Verification
          </Text>
          <Text
            style={[
              FONTS.lightFont12,
              {color: COLORS.mushroom, marginTop: SIZES.ten},
            ]}>
            Enter your verification code that we sent you through you email
          </Text>
          {/* ======================== TEXTINPUTS HERE ======================== */}
          <View style={{}}>
            <View style={{marginTop: SIZES.twentyFive * 1.5}}>
              <OTPInputView
                style={{
                  width: '100%',
                  height: SIZES.twenty * 5,
                }}
                pinCount={4}
                code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                onCodeChanged={code => {
                  setCode(code);
                }}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={code => {
                  console.log(`Code is ${code}, you are good to go!`);
                }}
              />
            </View>
          </View>
          {/* ======================== BUTTONS HERE ======================== */}
          <View style={{marginTop: SIZES.fifteen * 3}}>
            <ButtonRadius10
              label={'Verify'}
              style={{marginTop: SIZES.fifteen}}
              onPress={() => {
                if (
                  props.route.params.from ===
                  CONSTANTS.DESINATIONS.FORGOT_PASSWORD
                )
                  verifyForForgotPassword();
                else verifyForSignUp();
              }}
            />
          </View>
        </View>
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
  underlineStyleBase: {
    width: SIZES.fifty * 1.25,
    height: SIZES.fifty * 1.25,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: COLORS.mushroom,
    fontSize: SIZES.twentyFive,
    color: COLORS.black,
    fontFamily: FONTFAMILY.Light,
  },
  underlineStyleHighLighted: {
    width: SIZES.fifty * 1.25,
    height: SIZES.fifty * 1.25,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: COLORS.turqoise,
    fontSize: SIZES.twentyFive,
    fontFamily: FONTFAMILY.Light,
  },
  tabView: {
    height: SIZES.fiftyWidth * 2,
    width: SIZES.fiftyWidth * 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
});
