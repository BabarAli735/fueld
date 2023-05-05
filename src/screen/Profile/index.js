import React, {useEffect, useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Dimensions,
} from 'react-native';
import CircularImage from '../../components/CircularImage';
import ProfileHeader from '../../components/ProfileHeader';
import Row from '../../components/Row';
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  IMAGES,
  STYLES,
  SCREENS,
  CONSTANTS,
} from '../../constants';
import {Icon} from 'native-base';
import {SIZES} from './../../constants/theme';
import {
  TabView,
  SceneMap,
  TabBar,
  TabBarIndicator,
} from 'react-native-tab-view';
import Card from '../../components/Card';
import {FlatList} from 'react-native-gesture-handler';
import * as ProfileAction from '../../Store/Action/UserProfile';
import {useSelector, useDispatch} from 'react-redux';
import ErrorView from '../../components/modals/ErrorView';
import Loader from './../../components/Loader';
import * as OrderConfirm from '../../Store/Action/OrderConfirm';
import Moment from 'moment';

export default function Profile({navigation}) {
  const dispatcher = useDispatch();

  {
    /* index State to change index Screen in tabview */
  }
  const [index, setIndex] = React.useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const USERPROFILE = useSelector(state => state.Profile.UserProfile);

  // useEffect to show error modal which depends on errorMsg
  useEffect(() => {
    if (errorMsg !== '') {
      setErrorVisibility(true);
    }
  }, [errorMsg]);

  {
    /* useEffect to get User Profile Data */
  }
  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    await dispatcher(
      ProfileAction.GetProfile(responsee => {
        if (responsee.success === 0) {
          setErrorMsg(responsee.error);
        }
      }),
    );
  };

  // console.log('Booking order ==== ', USERPROFILE);

  {
    /* Componant to create Presonal Info Rows*/
  }
  const ViewPersonalInfo = props => (
    <Row
      style={{
        justifyContent: 'space-between',
        paddingVertical: SIZES.fifteen,
      }}>
      <Text style={[FONTS.mediumFont14, {color: COLORS.brownGrey}]}>
        {props.prop}
      </Text>
      <Text style={[FONTS.mediumFont14, {color: COLORS.primary}]}>
        {props.value}
      </Text>
    </Row>
  );

  {
    /* Tab View Booking Detail Screen*/
  }
  const rendrorBookingDetails = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={async () => {
          await dispatcher(OrderConfirm.OrderConfirmFromProps(item));
          navigation.navigate(SCREENS.OrderDetails, {
            orderData: item,
          });
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: SIZES.fifteen,
            marginTop: SIZES.twenty,
          }}

          // onPress={async () => {
          //   await dispatcher(OrderConfirm.OrderConfirmFromProps(item));

          //   navigation.navigate(SCREENS.OrderDetails, {
          //     orderData: item,
          //   });
          // }}
        >
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Image
              source={
                item.rider !== null
                  ? {uri: CONSTANTS.API_CALLS.IMAGE_URL + item.rider.image}
                  : {uri: 'ghghjghjhjg'}
              }
              style={{
                height: SIZES.twenty * 4,
                width: SIZES.twenty * 4,
                borderRadius: SIZES.fifteen,
              }}
              resizeMode={'contain'}
            />
            <View style={{marginStart: SIZES.twenty}}>
              <Text style={[FONTS.mediumFont16]}>
                {item.rider !== null ? item.rider.name : 'N/A'}
              </Text>
              {/* <Text style={[FONTS.mediumFont14, {color: COLORS.brownGrey}]}>
                {item.rider !== null ? item.rider.address : 'N/A'}
              </Text> */}
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: SIZES.fifteen,
            marginTop: SIZES.fifteen,
          }}>
          <View>
            <Text style={[FONTS.lightFont12]}>Date & Time</Text>
            <Text style={[FONTS.mediumFont14, {color: COLORS.turqoise}]}>
              {Moment(item.created_at).format('MMMM D, YYYY')} at{' '}
              {Moment(item.created_at).format('h:mm A')}
            </Text>
          </View>
          <View>
            <Text style={[FONTS.lightFont12]}>Booking Fee</Text>
            <Text style={[FONTS.mediumFont14, {color: COLORS.turqoise}]}>
              $ {item.grand_total}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: COLORS.darkBlueGrey,
            width: '100%',
            marginTop: SIZES.ten,
          }}
        />
      </TouchableOpacity>
    );
  };

  {
    /* Tab View Personal Info Screen */
  }
  const FirstRoute = () => (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          borderTopLeftRadius: SIZES.ten,
          borderTopRightRadius: SIZES.ten,
          padding: SIZES.fifteen,
        }}>
        <View style={{height: SIZES.twenty}} />
        <ViewPersonalInfo prop={'Full Name'} value={USERPROFILE?.name} />
        <ViewPersonalInfo prop={'Email'} value={USERPROFILE?.email} />
        <ViewPersonalInfo
          prop={'Phone No.'}
          value={USERPROFILE?.phone !== null ? USERPROFILE.phone : '9287699'}
        />
        <ViewPersonalInfo
          prop={'Address'}
          value={
            USERPROFILE.address !== null ? USERPROFILE.address : 'New York, USA'
          }
        />
      </View>
    </View>
  );

  {
    /* FlateList to Rendor Booking Detail Screen*/
  }
  const SecondRoute = () => (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <FlatList
        data={USERPROFILE?.orders}
        renderItem={rendrorBookingDetails}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  {
    /* Use to Rendor Tab view Screen*/
  }
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  {
    /* Use to set Route Tab view Screen*/
  }
  const [routes] = React.useState([
    {key: 'first', title: 'Personal Info'},
    {key: 'second', title: 'Booking Details'},
  ]);

  return (
    <View style={[STYLES.container, {backgroundColor: COLORS.secondary}]}>
      {/* <StatusBar backgroundColor={COLORS.secondary} barStyle={'dark-content'} /> */}
      <ProfileHeader
        title="Profile"
        isBright
        style={{backgroundColor: COLORS.secondary}}
        onEditPress={() => {
          navigation.navigate(SCREENS.EditProfile);
        }}
      />
      {/* Profile image View Start */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: COLORS.white,
          borderTopLeftRadius: SIZES.twenty,
          borderTopRightRadius: SIZES.twenty,
          marginTop: SIZES.twenty,
          padding: SIZES.fifteen,
        }}>
        <View>
          <CircularImage
            style={{
              height: SIZES.twenty * 4,
              width: SIZES.twenty * 4,
            }}
          />
        </View>
        <View style={{marginLeft: SIZES.ten}}>
          <Text style={[FONTS.mediumFont14, {color: COLORS.black}]}>
            {USERPROFILE?.name}
          </Text>
          <Text style={[FONTS.lightFont12, {color: COLORS.black}]}>
            {USERPROFILE.address !== null
              ? USERPROFILE.address
              : 'New York, USA'}
          </Text>
        </View>
      </View>
      {/* Profile image View Start */}

      {/* Tab View Start */}

      <TabView
        navigationState={{index, routes}}
        onIndexChange={index => {
          setIndex(index);
        }}
        renderScene={renderScene}
        initialLayout={{width: Dimensions.get('window').width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            activeColor={COLORS.primary}
            inactiveColor={COLORS.brownGrey}
            indicatorStyle={{
              backgroundColor: COLORS.primary,
              marginLeft: SIZES.twenty * 1.2,
              width: SIZES.twenty * 7.7,
              height: SIZES.five - 1,
            }}
            style={{
              backgroundColor: COLORS.white,
              shadowOffset: {height: 0, width: 0},
              shadowColor: 'transparent',
              shadowOpacity: 0,
              elevation: 0,
            }}
            indicatorContainerStyle={{
              width: Dimensions.get('screen').width,
            }}
            contentContainerStyle={
              {
                // justifyContent: 'center',
              }
            }
            renderLabel={({route, focused, color}) => (
              <Text style={[FONTS.mediumFont16, {color}]}>{route.title}</Text>
            )}
            tabStyle={{width: SIZES.twenty * 10}}
          />
        )}
      />
      {/* Tab View End */}

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
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Data = [
  {
    id: 1,
    title: 'Anko filling Station',
    address: 'Sythe Hay R280',
    date: 'June 02, 2021 at 10:00 PM',
    fee: '$150',
  },
  {
    id: 2,
    title: 'Anko filling Station',
    address: 'Sythe Hay R280',
    date: 'June 02, 2021 at 10:00 PM',
    fee: '$150',
  },
  {
    id: 3,
    title: 'Anko filling Station',
    address: 'Sythe Hay R280',
    date: 'June 02, 2021 at 10:00 PM',
    fee: '$150',
  },
];
