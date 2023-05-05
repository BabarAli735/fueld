import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Modal,
  TouchableOpacity,
} from 'react-native';
import RNListSlider from 'react-native-list-slider';
import MapView, {Marker} from 'react-native-maps';
import DatePicker from 'react-native-date-picker';
import {Icon} from 'native-base';
import {useSelector} from 'react-redux';
import moment from 'moment';

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
import MapTheme from '../home/MapTheme';
import LogoHeader from '../../components/LogoHeader';
import ButtonRadius10 from '../../components/ButtonRadius10';
import Loader from '../../components/Loader';
import Axios from '../../network';
import ErrorView from '../../components/modals/ErrorView';
import utils from '../../utils';

export default function index({route, navigation}) {
  const {OrderType, SelectedItem, Coordinates} = route.params;

  const Auth = useSelector(state => state.Auth.AccessToken);
  const [value, setValue] = useState(0);

  const [date, setDate] = useState(new Date());
  const [showPaymentModal, setshowPaymentModal] = useState(false);
  const [SeletedPayment, setSeletedPayment] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  console.log('route.params.Coordinates=======', Coordinates);
  // console.log('route ====>', props.route.params.SelectedFuel);

  // useEffect to show error modal which depends on errorMsg
  useEffect(() => {
    if (errorMsg !== '') {
      setErrorVisibility(true);
    }
  }, [errorMsg]);

  const onValueChanged = value => {
    if (value < 31) {
      setValue(value);
    }
  };

  const initRegion = {
    latitude: Coordinates.latitude,
    longitude: Coordinates.longitude,
    latitudeDelta: 0.004,
    longitudeDelta: 0.006 * (width / height),
  };
  return (
    <View style={[STYLES.container, {}]}>
      <MapView
        zoomEnabled={false}
        showsUserLocation={false}
        scrollEnabled={false}
        maxZoomLevel={18}
        mapType="standard"
        region={initRegion}
        customMapStyle={MapTheme}
        onPress={e => {}}
        style={{
          flex: 1,
          ...StyleSheet.absoluteFill,
        }}>
        <Marker
          coordinate={{
            latitude: Coordinates.latitude,
            longitude: Coordinates.longitude,
          }}>
          <Image
            source={IMAGES.LocationMarkerPin}
            style={{
              height: SIZES.twentyFive * 1.3,
              width: SIZES.twentyFive * 1.8,
            }}
          />
        </Marker>
      </MapView>
      <View style={{paddingHorizontal: SIZES.fifteen}}>
        <LogoHeader isBackArrow />

        <Text style={[FONTS.mediumFont16, {marginTop: SIZES.ten}]}>
          {SelectedItem?.title}
        </Text>
      </View>
      {/* quantity show text View start */}
      <View
        style={[
          styles.tabView,
          {
            alignSelf: 'center',
            position: 'absolute',
            marginTop:
              Platform.OS === 'ios'
                ? SIZES.twentyFive * 2.7
                : SIZES.twenty * 1.7,
          },
        ]}>
        <Image
          source={IMAGES.ButtonUnhighlight}
          style={styles.image}
          resizeMode={'contain'}
        />
        <Text
          style={[
            FONTS.mediumFont14,
            {
              color: COLORS.primary,
              marginTop: -SIZES.ten,
            },
          ]}>
          {value} {SelectedItem?.unit}
        </Text>
      </View>
      {/* quantity show text View start */}

      <RNListSlider
        value={value}
        onValueChange={onValueChanged}
        tenthItemStyle={{height: SIZES.twenty * 2}}
        itemStyle={{height: SIZES.twentyFive * 2}}
        // decimalPlaces={0}
        multiplicity={1}
        mainContainerStyle={{
          height: SIZES.twenty * 3.8,
          marginTop: SIZES.twenty * 1.2,
        }}
      />

      {/* Date Time Pcker Start */}
      {OrderType === CONSTANTS.DESINATIONS.SCHEDULE ? (
        <DatePicker
          //   minimumDate={new Date()}
          fadeToColor="none"
          androidVariant="nativeAndroid" // “iosClone” & “nativeAndroid”
          mode="datetime"
          date={date}
          textColor={COLORS.turqoise}
          onDateChange={text => {
            setDate(text);
          }}
          textColor={COLORS.turqoise}
          style={{
            alignSelf: 'center',
            width: width,
            backgroundColor: COLORS.white,
          }}
        />
      ) : null}

      {/* Date Time Pcker End */}

      {/* pay Now Schedule View start */}
      <View
        style={{
          position: 'absolute',
          bottom: SIZES.twenty * 3,
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: SIZES.twenty * 2,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.darkBlueGrey,
            borderRadius: SIZES.ten,
            padding: SIZES.fifteen,
          }}
          activeOpacity={0.7}
          onPress={() => {
            setValue(0);
            navigation.goBack();
          }}>
          <Icon
            name={'chevron-back'}
            type={FONTFAMILY.Ionicons}
            style={{
              color: COLORS.black,
              fontSize: 24,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.primary,
            paddingHorizontal: SIZES.twenty * 3,
            borderRadius: SIZES.ten,
            marginStart: SIZES.twenty,
            paddingVertical: SIZES.fifteen,
          }}
          activeOpacity={0.7}
          onPress={() => {
            if (value <= 0) {
              setErrorMsg("Quantity can't be 0");
              return;
            }

            navigation.navigate(SCREENS.AddCard, {
              data: route.params,
              quantity: SelectedItem?.price * value,
              date: date,
            });
          }}>
          <Text style={[FONTS.mediumFont14, {color: COLORS.white}]}>
            Pay Now (${SelectedItem?.price * value})
          </Text>
        </TouchableOpacity>
      </View>
      {/* pay Now Schedule View end*/}

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
  tabView: {
    height: SIZES.fiftyWidth * 2,
    width: SIZES.fiftyWidth * 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '80%',
    width: '80%',
    position: 'absolute',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    height: '45%',
    borderTopLeftRadius: SIZES.ten,
    borderTopRightRadius: SIZES.ten,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  CustomButton: {
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: SIZES.ten,
    width: '100%',
    height: height * 0.07,
    // marginTop: SIZES.twenty,
  },
});
