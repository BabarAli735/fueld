import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import NormalHeader from '../../components/NormalHeader';
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
import EditText from '../../components/EditText';
import CountryPicker from 'react-native-country-picker-modal';
import {Icon} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import CircularImage from './../../components/CircularImage';
import ButtonRadius10 from '../../components/ButtonRadius10';
import Card from '../../components/Card';
import UploadPhotoModal from '../../components/modals/UploadPhotoModal';
import Axios from '../../network';
import Loader from '../../components/Loader';
import utils from '../../utils';
import ErrorView from '../../components/modals/ErrorView';
import * as UserProfileAction from '../../Store/Action/UserProfile';

export default function EditProfile({navigation}) {
  const dispatcher = useDispatch();

  const UserProfile = useSelector(state => state.Profile.UserProfile);
  const Auth = useSelector(state => state.Auth.AccessToken);

  // useEffect to show error modal which depends on errorMsg
  useEffect(() => {
    if (errorMsg !== '') {
      setErrorVisibility(true);
    }
  }, [errorMsg]);

  const [isLoading, setisLoading] = useState(false);
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [isCountryCodePickerVisible, setisCountryCodePickerVisible] =
    useState(false);
  const [visibility, setVisibility] = useState(false);
  const [countryCode, setCountryCode] = useState('1');
  const [countryFlag, setcountryFlag] = useState('US');
  const [image, setImage] = useState(
    CONSTANTS.API_CALLS.IMAGE_URL + UserProfile.image,
  );
  const [borderColor, setBorderColor] = useState(COLORS.transparent);

  const [name, setname] = useState(UserProfile.name);
  const [phone, setphone] = useState(UserProfile.phone);
  const [email, setemail] = useState(UserProfile.email);
  const [address, setaddress] = useState(UserProfile.address);

  //************ Method to close Ratings Modal ********//
  const loadUserProfile = async () => {
    await dispatcher(
      UserProfileAction.GetProfile(response => {
        if (response.success === 1) {
          setisLoading(false);
          navigation.goBack();
        } else {
          setErrorMsg(JSON.stringify(response.error));
        }
      }),
    );
  };

  const toggleIsCountryCodePickerVisible = () => {
    setisCountryCodePickerVisible(!isCountryCodePickerVisible);
  };

  const onSelect = country => {
    setCountryCode(country.callingCode[0]);
    setcountryFlag(country.cca2);
  };

  // edit profile method api call
  const editProfile = () => {
    let mImage = image || UserProfile.image;

    console.log('mImage ============ >>>>>>>>>>> ', mImage);

    if (utils.isEmptyOrSpaces(name)) {
      setErrorMsg('Invalid Name');
      return;
    }

    if (!utils.validateEmail(email)) {
      setErrorMsg('Invalid Email');
      return;
    }

    if (utils.isEmptyOrSpaces(phone)) {
      setErrorMsg('Invalid Phone');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('image', {
      uri: mImage,
      type: 'image/jpg',
      name: 'image.jpg',
    });
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: Auth,
      },
    };

    setisLoading(true);

    console.log('formData edite Profile', formData._parts);

    const onSuccess = ({data}) => {
      console.log('edit profile sucesss', data);
      // setisLoading(false);
      loadUserProfile();
    };
    const onFailure = error => {
      setisLoading(false);
      let msg = utils.showResponseError(error);
      setErrorMsg(JSON.stringify(msg));
    };

    Axios.post(CONSTANTS.API_CALLS.UPDATE_PROFILE, formData, options)

      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <View style={[STYLES.container, {backgroundColor: COLORS.secondary}]}>
      {/* <StatusBar backgroundColor={COLORS.secondary} barStyle={'dark-content'} /> */}

      <NormalHeader title="Edit Profile" />

      <LinearGradient
        colors={[COLORS.secondary, COLORS.secondary]}
        style={{
          backgroundColor: COLORS.secondary,
          paddingHorizontal: SIZES.fifteen,
          justifyContent: 'center',
          paddingVertical: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: SIZES.twentyWidth * 4,
              borderRadius: SIZES.twentyWidth * 4,
            }}>
            <CircularImage
              uri={image}
              style={{
                height: SIZES.twentyWidth * 4,
                width: SIZES.twentyWidth * 4,
              }}
            />

            <Card
              style={{
                height: SIZES.twentyWidth * 1.75,
                width: SIZES.twentyWidth * 1.75,
                borderRadius: SIZES.twentyWidth * 1.75,
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}>
              <TouchableOpacity
                style={{
                  height: '100%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setVisibility(true);
                }}>
                <Icon
                  name={'camera'}
                  type={FONTFAMILY.EvilIcons}
                  style={{fontSize: SIZES.twentyFive, color: COLORS.primary}}
                />
              </TouchableOpacity>
            </Card>
          </View>
          <View style={{marginLeft: SIZES.ten}}>
            <Text style={[FONTS.mediumFont16, {color: COLORS.black}]}>
              {name}
            </Text>
            <Text style={[FONTS.lightFont12, {color: COLORS.mushroom}]}>
              {address}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          borderTopLeftRadius: SIZES.ten,
          borderTopRightRadius: SIZES.ten,
          paddingHorizontal: SIZES.twenty,
          marginTop: SIZES.ten,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={{marginTop: SIZES.ten}}>
          <EditText
            placeholder="Enter Name"
            hasIcon
            name="user"
            type={FONTFAMILY.AntDesign}
            value={name}
            onChangeText={setname}
          />

          <EditText
            placeholder="Enter Email"
            hasIcon
            name="mail"
            editable={false}
            type={FONTFAMILY.AntDesign}
            style={{marginTop: SIZES.fifteen}}
            value={email}
          />

          <View
            style={{
              marginTop: SIZES.fifteen,
            }}>
            <Text
              style={[
                FONTS.mediumFont14,
                {
                  color:
                    borderColor === COLORS.transparent
                      ? COLORS.mushroom
                      : borderColor,
                },
              ]}>
              Phone Number
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 60,
                borderRadius: SIZES.ten,
                borderWidth: 1,
                marginTop: SIZES.ten,
                backgroundColor: COLORS.iceBlue,
                borderColor: borderColor,
                justifyContent: 'space-between',
              }}
              activeOpacity={1}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => toggleIsCountryCodePickerVisible()}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: SIZES.five,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <CountryPicker
                    onSelect={onSelect}
                    countryCode={countryFlag}
                    visible={isCountryCodePickerVisible}
                    withCallingCode
                    theme={{
                      fontFamily: FONTFAMILY.Medium,
                      resizeMode: 'contain',
                      onBackgroundTextColor: COLORS.primary,
                      backgroundColor: COLORS.secondary,
                    }}
                  />
                  <Text style={[FONTS.mediumFont14, {color: COLORS.BLACK}]}>
                    +{countryCode}
                  </Text>
                  <Icon
                    type={FONTFAMILY.Ionicons}
                    name={'chevron-down'}
                    style={{
                      color: COLORS.primary,
                      fontSize: 20,
                      marginLeft: SIZES.five,
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TextInput
                selectionColor={COLORS.primary}
                placeholderTextColor={COLORS.mushroom}
                placeholder="Enter Phone Number"
                value={phone}
                onChangeText={setphone}
                style={[
                  FONTS.mediumFont14,
                  {
                    flex: 1,
                    color: COLORS.primary,
                  },
                ]}
                onFocus={() => {
                  setBorderColor(COLORS.primary);
                }}
                onBlur={() => {
                  setBorderColor(COLORS.transparent);
                }}
              />
            </View>
          </View>

          <EditText
            placeholder="Enter Address"
            hasIcon
            name="location-pin"
            type={FONTFAMILY.SimpleLineIcons}
            style={{marginTop: SIZES.fifteen}}
            value={address}
            onChangeText={setaddress}
          />

          <ButtonRadius10
            label={'Save & Continue'}
            style={{marginVertical: SIZES.twenty * 3}}
            onPress={() => {
              // props.navigation.goBack();
              editProfile();
            }}
          />
        </View>
      </ScrollView>

      <UploadPhotoModal
        visibility={visibility}
        setVisibility={setVisibility}
        isCircle
        onImageSelected={img => {
          setImage(img);
        }}
      />
      {/* Loader */}
      {isLoading ? <Loader /> : null}

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
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
});
