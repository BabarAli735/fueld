import React, {useState, useRef, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import ButtonRadius10 from '../../components/ButtonRadius10';
import EditText from '../../components/EditText';
import MyTouchableOpacity from '../../components/MyTouchableOpacity';
import Row from '../../components/Row';
import BackArrow from '../../components/BackArrow';
import Axios from '../../network/index';
import utils from '../../utils';
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
import ErrorView from '../../components/modals/ErrorView';
import Loader from '../../components/Loader';

export default function ForgotPassword({navigation}) {
  const [email, setEmail] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  // useEffect to show error modal which depends on errorMsg
  useEffect(() => {
    if (errorMsg !== '') {
      setErrorVisibility(true);
    }
  }, [errorMsg]);

  // forget password send otp method api call
  const forgotPassword = () => {
    if (!utils.validateEmail(email)) {
      setErrorMsg('Invalid Email');
      return;
    }

    const onSuccess = ({data}) => {
      console.log('data dikhaaaa', data);
      setShowLoader(false);
      navigation.navigate(SCREENS.Verification, {
        email: email,
        from: CONSTANTS.DESINATIONS.FORGOT_PASSWORD,
      });
    };

    const onFailure = error => {
      setShowLoader(false);
      let msg = utils.showResponseError(error);
      setErrorMsg(JSON.stringify(msg));
      console.log('error dikhaaaa', error);
      console.log('forgot password api error=====>>>', msg);
    };

    var postData = null;
    postData = {
      email: email,
    };

    setShowLoader(true);
    Axios.get(CONSTANTS.API_CALLS.FORGOT_PASSWORD, {params: postData})
      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <View style={STYLES.container}>
      {/* <StatusBar
        hidden={false}
        barStyle={'dark-content'}
        backgroundColor={COLORS.white}
      /> */}
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
              Forgot
            </Text>
          </MyTouchableOpacity>
        </View>
        {/* ======================== TEXTINPUTS HERE ======================== */}
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
            Forgot Your Password?
          </Text>
          <Text
            style={[
              FONTS.lightFont12,
              {color: COLORS.mushroom, marginTop: SIZES.ten},
            ]}>
            Enter your email & we will send you verification code
          </Text>
          <View style={{marginTop: SIZES.twentyFive * 1.5}}>
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
          </View>
          {/* ======================== BUTTONS HERE ======================== */}
          <View style={{marginTop: SIZES.fifteen * 3}}>
            <ButtonRadius10
              label={'Continue'}
              style={{marginTop: SIZES.fifteen}}
              onPress={() => {
                forgotPassword();
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
