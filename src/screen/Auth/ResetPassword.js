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

export default function ResetPassword(props) {
  const [password, setPassword] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // useEffect to show error modal which depends on errorMsg
  useEffect(() => {
    if (errorMsg !== '') {
      setErrorVisibility(true);
    }
  }, [errorMsg]);

  // reset password method api call
  const resetPassword = () => {
    if (password.length < 6) {
      setErrorMsg('Password should not be less than 6 digits');
      return;
    }

    const onSuccess = ({data}) => {
      console.log('data dikha samjhaaaaa', data);
      setShowLoader(false);
      props.navigation.replace(SCREENS.Login);
    };

    const onFailure = error => {
      setShowLoader(false);
      let msg = utils.showResponseError(error);
      setErrorMsg(JSON.stringify(msg));
      console.log('error dikhaaaa', error);
      console.log('reset password api error=====>>>', msg);
    };

    let postData = {
      email: props.route.params.email,
      password: password,
      password_confirmation: password,
    };
    console.log('post dataaaaaa=====>', postData);
    setShowLoader(true);
    Axios.post(CONSTANTS.API_CALLS.RESET_PASSWORD, postData)
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
              Reset
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
            Reset Your Password
          </Text>
          <Text
            style={[
              FONTS.lightFont12,
              {color: COLORS.mushroom, marginTop: SIZES.ten},
            ]}>
            Enter your desired password to continue
          </Text>
          {/* ======================== TEXTINPUTS HERE ======================== */}
          <View style={{}}>
            <View style={{marginTop: SIZES.twentyFive * 1.5}}>
              <EditText
                placeholder="Password"
                password
                hasIcon
                name="lock-open"
                type={FONTFAMILY.SimpleLineIcons}
                onChangeText={text => {
                  setPassword(text);
                }}
              />
            </View>
          </View>

          {/* ======================== BUTTONS HERE ======================== */}
          <View style={{marginTop: SIZES.fifteen * 3}}>
            <ButtonRadius10
              label={'Continue'}
              style={{marginTop: SIZES.fifteen}}
              onPress={() => {
                resetPassword();
                // props.navigation.navigate(SCREENS.Login);
              }}
            />
          </View>
        </View>
      </View>
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
