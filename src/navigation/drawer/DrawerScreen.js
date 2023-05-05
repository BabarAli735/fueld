import React, {useState} from 'react';
import {Icon} from 'native-base';
import {CommonActions} from '@react-navigation/native';
import {View, Text, Platform} from 'react-native';
import Modal from 'react-native-modal';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import CircularImage from '../../components/CircularImage';
import MyTouchableOpacity from '../../components/MyTouchableOpacity';
import Row from '../../components/Row';
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
import * as AuthActions from '../../Store/Action/Login';
import * as AppLoadingAction from '../../Store/Action/AppLoading';
import {useDispatch, useSelector} from 'react-redux';

import {removeFcmTokenFromFirebase} from '../../Store/Firebase/NotificationServices';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function DrawerScreen({navigation}) {
  const dispatcher = useDispatch();

  const UserProfile = useSelector(state => state.Profile.UserProfile);

  // console.log("UserProfile===========>", UserProfile.image);

  const Indicator = useSelector(
    state => state.Indicators.notificationIndicator,
  );

  const navigateToNextScreen = screenName => {
    navigation.toggleDrawer();
    navigation.navigate(screenName);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isLogoutModalVisible, setisLogoutModalVisible] = React.useState(false);

  const [notificationsView, setNotificationsView] = React.useState({
    textColor: COLORS.black,
    bgColor: COLORS.white,
  });
  const [walletView, setWalletView] = React.useState({
    textColor: COLORS.black,
    bgColor: COLORS.white,
  });
  const [profileView, setProfileView] = React.useState({
    textColor: COLORS.black,
    bgColor: COLORS.white,
  });
  const [tncView, setTncView] = React.useState({
    textColor: COLORS.black,
    bgColor: COLORS.white,
  });
  const [settingsView, setSettingsView] = React.useState({
    textColor: COLORS.black,
    bgColor: COLORS.white,
  });
  const [supportView, setSupportView] = React.useState({
    textColor: COLORS.black,
    bgColor: COLORS.white,
  });
  const [logOutView, setLogOutView] = React.useState({
    textColor: COLORS.black,
    bgColor: COLORS.white,
  });

  const logoutFunction = async () => {
    navigation.toggleDrawer();
    toggleModal();
    removeFcmTokenFromFirebase(UserProfile.id);
    await dispatcher(AppLoadingAction.setAppLoading(true));
    await dispatcher(AuthActions.Logout());
  };

  const logout = () => {
    toggleModal();
  };

  const toggleModal = () => {
    setisLogoutModalVisible(!isLogoutModalVisible);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        borderTopRightRadius: SIZES.twenty,
        borderBottomRightRadius: SIZES.twenty,
      }}>
      {/* Start of Top Container of User */}
      <MyTouchableOpacity
        activeOpacity={1}
        style={{
          backgroundColor: COLORS.white,
          paddingTop: Platform.OS === 'android' ? 0 : getStatusBarHeight(true),
          paddingVertical: SIZES.fifteen,
        }}
        onPress={() => {
          navigation.navigate(SCREENS.Profile);
        }}>
        <Row style={[STYLES.drawerItem]}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
            <CircularImage
              uri={CONSTANTS.API_CALLS.IMAGE_URL + UserProfile.image}
              style={{
                height: SIZES.fifty + 10,
                width: SIZES.fifty + 10,
                borderRadius: SIZES.fifty + 10,
                backgroundColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
          <View style={{marginHorizontal: SIZES.ten}}>
            <Text style={[FONTS.mediumFont16, {color: COLORS.black}]}>
              {UserProfile.name}
            </Text>
            <Text
              numberOfLines={1}
              style={[FONTS.mediumFont12, {color: COLORS.brownGrey}]}>
              {moment(new Date()).format('MM/D/YYYY')}
            </Text>
          </View>
        </Row>
      </MyTouchableOpacity>
      {/* End of Top Container of User */}
      <View
        style={{
          paddingHorizontal: SIZES.ten,
          paddingTop: SIZES.ten,
        }}>
        {/* Start of Notifications Container */}
        <MyTouchableOpacity
          activeOpacity={1}
          style={[
            STYLES.drawerItem,
            {backgroundColor: notificationsView.bgColor},
          ]}
          onPressIn={() =>
            setNotificationsView({
              textColor: COLORS.white,
              bgColor: COLORS.primary,
            })
          }
          onPressOut={() =>
            setNotificationsView({
              textColor: COLORS.black,
              bgColor: COLORS.white,
            })
          }
          onPress={() => {
            navigateToNextScreen(SCREENS.Notifications);
            //  navigation.toggleDrawer();
          }}>
          <Row style={{alignSelf: 'flex-start', alignItems: 'center'}}>
            {Indicator ? (
              <View
                style={{
                  height: SIZES.ten * 1.4,
                  width: SIZES.ten * 1.4,
                  borderRadius: SIZES.ten * 1.4,
                  position: 'absolute',
                  backgroundColor: 'red',
                  zIndex: 1,
                  left: 10,
                  top: 0,
                }}
              />
            ) : null}
            <Icon
              name={'bell'}
              type={FONTFAMILY.SimpleLineIcons}
              style={[STYLES.drawerIcon, {color: notificationsView.textColor}]}
            />
            <Text
              style={[STYLES.drawerText, {color: notificationsView.textColor}]}>
              Notifications
            </Text>
          </Row>
        </MyTouchableOpacity>
        {/* End of Notifications Container */}

        {/* Start of Profile Container */}
        <MyTouchableOpacity
          activeOpacity={1}
          style={[STYLES.drawerItem, {backgroundColor: profileView.bgColor}]}
          onPress={() => {
            navigateToNextScreen(SCREENS.Profile);
            //  navigation.toggleDrawer();
          }}
          onPressIn={() =>
            setProfileView({
              textColor: COLORS.white,
              bgColor: COLORS.primary,
            })
          }
          onPressOut={() =>
            setProfileView({
              textColor: COLORS.black,
              bgColor: COLORS.white,
            })
          }>
          <Row style={{alignSelf: 'flex-start', alignItems: 'center'}}>
            <Icon
              name={'user-o'}
              type={FONTFAMILY.FontAwesome}
              style={[STYLES.drawerIcon, {color: profileView.textColor}]}
            />
            <Text style={[STYLES.drawerText, {color: profileView.textColor}]}>
              My Profile
            </Text>
          </Row>
        </MyTouchableOpacity>
        {/* End of Profile Container */}

        {/* Start of Terms & Conditions Container */}
        <MyTouchableOpacity
          activeOpacity={1}
          style={[STYLES.drawerItem, {backgroundColor: tncView.bgColor}]}
          onPress={() => {
            navigateToNextScreen(SCREENS.TermsAndConditions);
          }}
          onPressIn={() =>
            setTncView({
              textColor: COLORS.white,
              bgColor: COLORS.primary,
            })
          }
          onPressOut={() =>
            setTncView({
              textColor: COLORS.black,
              bgColor: COLORS.white,
            })
          }>
          <Row style={{alignSelf: 'flex-start', alignItems: 'center'}}>
            <Icon
              name={'file'}
              type={FONTFAMILY.Octicons}
              style={[STYLES.drawerIcon, {color: tncView.textColor}]}
            />
            <Text style={[STYLES.drawerText, {color: tncView.textColor}]}>
              Terms & Conditions
            </Text>
          </Row>
        </MyTouchableOpacity>
        {/* End of Terms & Conditions Container */}

        {/* Start of Settings Container */}
        {/* <MyTouchableOpacity
          activeOpacity={1}
          style={[STYLES.drawerItem, {backgroundColor: settingsView.bgColor}]}
          onPress={() => {
            // navigateToNextScreen(SCREENS.Settings);
            //  navigation.toggleDrawer();
          }}
          onPressIn={() =>
            setSettingsView({
              textColor: COLORS.white,
              bgColor: COLORS.primary,
            })
          }
          onPressOut={() =>
            setSettingsView({
              textColor: COLORS.black,
              bgColor: COLORS.white,
            })
          }>
          <Row style={{alignSelf: 'flex-start', alignItems: 'center'}}>
            <Icon
              name={'settings'}
              type={FONTFAMILY.SimpleLineIcons}
              style={[STYLES.drawerIcon, {color: settingsView.textColor}]}
            />
            <Text style={[STYLES.drawerText, {color: settingsView.textColor}]}>
              Settings
            </Text>
          </Row>
        </MyTouchableOpacity> */}
        {/* End of Settings Container */}

        {/* Start of Support Container */}
        <MyTouchableOpacity
          activeOpacity={1}
          style={[STYLES.drawerItem, {backgroundColor: supportView.bgColor}]}
          onPress={() => {
            navigateToNextScreen(SCREENS.Support);
            //  navigation.toggleDrawer();
          }}
          onPressIn={() =>
            setSupportView({
              textColor: COLORS.white,
              bgColor: COLORS.primary,
            })
          }
          onPressOut={() =>
            setSupportView({
              textColor: COLORS.black,
              bgColor: COLORS.white,
            })
          }>
          <Row style={{alignSelf: 'flex-start', alignItems: 'center'}}>
            <Icon
              name={'md-help-circle-outline'}
              type={FONTFAMILY.Ionicons}
              style={[STYLES.drawerIcon, {color: supportView.textColor}]}
            />
            <Text style={[STYLES.drawerText, {color: supportView.textColor}]}>
              Support
            </Text>
          </Row>
        </MyTouchableOpacity>
        {/* End of SupportContainer */}
        {/* Start of Logout Container */}
        <MyTouchableOpacity
          activeOpacity={1}
          style={[
            STYLES.drawerItem,
            {
              backgroundColor: logOutView.bgColor,
              marginTop: SIZES.twenty * 12,
            },
          ]}
          onPress={() => {
            logout();
          }}
          onPressIn={() =>
            setLogOutView({textColor: COLORS.white, bgColor: COLORS.primary})
          }
          onPressOut={() =>
            setLogOutView({
              textColor: COLORS.black,
              bgColor: COLORS.white,
            })
          }>
          <Row
            style={{
              alignSelf: 'flex-start',
              alignItems: 'center',
            }}>
            <Icon
              name={'logout'}
              type={FONTFAMILY.SimpleLineIcons}
              style={[STYLES.drawerIcon, {color: logOutView.textColor}]}
            />
            <Text style={[STYLES.drawerText, {color: logOutView.textColor}]}>
              Log Out
            </Text>
          </Row>
        </MyTouchableOpacity>
        {/* End of Logout Container */}
      </View>

      {/* Start of Logout Modal */}
      <Modal
        isVisible={isLogoutModalVisible}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: SIZES.ten * 2,
            borderRadius: SIZES.ten,
            borderWidth: 1.5,
            borderColor: COLORS.primary,
          }}>
          <Text
            style={[
              STYLES.headingText,
              {
                color: COLORS.primary,
                marginTop: SIZES.five,
                textAlign: 'center',
              },
            ]}>
            Fuel'd
          </Text>
          <Text
            style={[
              STYLES.mediumText,
              {marginVertical: SIZES.twenty, textAlign: 'center'},
            ]}>
            Are you sure you want to logout?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <MyTouchableOpacity
              onPress={() => {
                logoutFunction();
                //  navigation.toggleDrawer();
              }}
              style={{
                padding: SIZES.ten,
                width: SIZES.fifty,
                alignItems: 'center',
                marginEnd: SIZES.five,
                backgroundColor: COLORS.primary,
                borderRadius: SIZES.ten,
              }}>
              <Text style={[STYLES.mediumText, {color: COLORS.white}]}>
                Yes
              </Text>
            </MyTouchableOpacity>
            <MyTouchableOpacity
              onPress={() => toggleModal()}
              style={{
                padding: SIZES.ten,
                width: SIZES.fifty,
                alignItems: 'center',
                marginStart: SIZES.five,
                backgroundColor: COLORS.primary,
                borderRadius: SIZES.ten,
              }}>
              <Text style={[STYLES.mediumText, {color: COLORS.white}]}>No</Text>
            </MyTouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* End of Logout Modal */}
    </View>
  );
}
