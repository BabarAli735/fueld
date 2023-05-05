import {Icon} from 'native-base';
import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Modal,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import {
  COLORS,
  FONTFAMILY,
  IMAGES,
  SIZES,
  STYLES,
  FONTS,
  SCREENS,
  CONSTANTS,
  width,
  height,
} from '../../constants';
import MapTheme from '../home/MapTheme';
import ButtonRadius10 from '../../components/ButtonRadius10';
import LogoHeader from '../../components/LogoHeader';
import MapView, {PROVIDER_GOOGLE, Circle, Marker} from 'react-native-maps';
import Card from '../../components/Card';
import CircularImage from '../../components/CircularImage';

// Redux import Here
import * as OrderConfirm from '../../Store/Action/OrderConfirm';
import {useDispatch, useSelector} from 'react-redux';
import Row from '../../components/Row';
import MyTouchableOpacity from '../../components/MyTouchableOpacity';
import Axios from '../../network';
import Loader from '../../components/Loader';
import utils from '../../utils';
import MapViewDirections from 'react-native-maps-directions';
import * as RiderCoordinationAction from '../../Store/Action/GetRiderCoordinats';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MarkerLoader from '../../components/MarkerLoader';
import DriverTrackingMarker from '../home/DriverTrackingMarker';

export default function index({route, navigation}) {
  const dispatcher = useDispatch();
  const markerRef = useRef();

  const screen = Dimensions.get('window');
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.04;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const animationHeight = useRef(new Animated.Value(0)).current;
  const [isRiderArrived, setisRiderArrived] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [showLoader, setshowLoader] = useState(false);
  const [showMarkerLoader, setShowMarkerLoader] = useState(false);
  const [invalidCoorDinates, setInvalidCoorDinates] = useState(false);
  const mapRef = useRef();

  const [collapsed, setCollapsed] = useState(true);

  const [showRoute, setshowRoute] = useState(false);

  const [DriverCoordinates, setDriverCoordinates] = useState({});

  const ORDERCONFIRM = useSelector(state => state.OrderConfirm.OrderConfirm);
  console.log('ORDERCONFIRM on Tracking ========== >>>>>>>>>');

  // console.log('order data', JSON.stringify(ORDERCONFIRM));
  const Auth = useSelector(state => state.Auth.AccessToken);

  useEffect(() => {
    if (collapsed) {
      collapseView();
    } else {
      expandView();
    }
  }, [collapsed]);

  useEffect(() => {
    handleRiderLocation();
  }, [ORDERCONFIRM]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleRiderLocation = () => {
    if (ORDERCONFIRM.status === 'accepted') {
      setShowMarkerLoader(true);
      setTimeout(() => {
        setshowRoute(true);
      }, 1000);

      // const interval = setInterval(() => {
      //   GetRiderLocation();
      // }, 20000);

      if (ORDERCONFIRM.status === 'arrived') {
        setshowRoute(false);
        // clearInterval(interval);
      }
    }
  };

  const GetRiderLocation = () => {
    let confiq = {
      headers: {
        Authorization: Auth,
      },
      params: {
        rider_id: ORDERCONFIRM.rider.id,
      },
    };
    const onSuccess = ({data}) => {
      console.log('GetRiderLocation ========== >>>>', data);
      setDriverCoordinates({
        latitude: Number(data?.data?.latitude),
        longitude: Number(data?.data.longitude),
      });
    };

    const onFailure = error => {
      let errorMsg = utils.showResponseError(error);
      console.log('Location error', errorMsg);
    };

    axios
      .get(
        `${CONSTANTS.API_CALLS.BASE_URL}${CONSTANTS.API_CALLS.Get_RiDE_Location}`,
        {
          headers: {
            Authorization: Auth,
          },
          params: {
            rider_id: ORDERCONFIRM.rider.id,
          },
        },
      )
      .then(onSuccess)
      .catch(onFailure);
  };

  const collapseView = () => {
    Animated.timing(animationHeight, {
      duration: 500,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const expandView = () => {
    Animated.timing(animationHeight, {
      duration: 500,
      toValue: 500,
      useNativeDriver: false,
    }).start();
  };

  const initRegion = {
    latitude: Number(ORDERCONFIRM?.latitude),
    longitude: Number(ORDERCONFIRM?.longitude),
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  // Concel Order
  const concelOrder = () => {
    let postData = {
      order_id: 1,
      status: 'cancelled',
    };
    let confiq = {
      headers: {
        Authorization: Auth,
      },
    };

    const onSuccess = ({data}) => {
      console.log('concel order response ', data);
      setModalVisible(false);
      setTimeout(() => {
        setshowLoader(false);
        navigation.replace(SCREENS.DrawerNavigator);
      }, 500);
      //   response({success: 1, error: null});
    };

    const onFailure = error => {
      setshowLoader(false);
      console.log('concel order error ======>', error);
      //   let errorMsg = utils.showResponseError(error);
      //   response({success: 0, error: errorMsg});
    };

    setshowLoader(true);
    Axios.post(CONSTANTS.API_CALLS.CONCEL_ORDER, postData, confiq)
      .then(onSuccess)
      .catch(onFailure);
  };

  const RendorOrderDetail = ({title, description}) => {
    return (
      <View style={{marginVertical: SIZES.five - 3}}>
        <Text style={[FONTS.mediumFont12]}>
          {title}
          <Text style={[FONTS.mediumFont12, {color: COLORS.brownGrey}]}>
            {description}
          </Text>
        </Text>
      </View>
    );
  };

  const RendorDateTimeRow = props => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={[FONTS.mediumFont12, {color: COLORS.black}]}>
          {props.title}:{' '}
          <Text style={{color: COLORS.brownGrey}}>{props.dec}</Text>
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: props.iconBg,
            padding: SIZES.ten,
            borderRadius: SIZES.ten,
          }}
          activeOpacity={0.7}
          onPress={props.onPress}>
          <Icon
            name={props.iconName}
            type={props.iconType}
            style={{
              color: props.iconColor,
              fontSize: SIZES.body16,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const RendorOrderDetailsModal = () => {
    return (
      <Card
        style={{
          left: 0,
          right: 0,
          position: 'absolute',
          backgroundColor: COLORS.white,
          bottom: 0,
          paddingHorizontal: SIZES.twenty,
          paddingVertical: SIZES.ten,
        }}>
        {/* Delivery man Name image view */}
        {ORDERCONFIRM.rider !== null ? (
          <>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CircularImage
                uri={`${CONSTANTS.API_CALLS.IMAGE_URL}${ORDERCONFIRM?.rider?.image}`}
              />
              <View style={{marginStart: SIZES.ten}}>
                <Text style={[FONTS.mediumFont16]}>
                  {ORDERCONFIRM?.rider?.name}
                </Text>
                <Text style={[FONTS.mediumFont12, {color: COLORS.brownGrey}]}>
                  Delivery Man
                </Text>
              </View>
            </View>

            <Row>
              {/* Date Time ROws */}
              <View style={{flex: 1}}>
                <RendorOrderDetail
                  title={'Date: '}
                  description={ORDERCONFIRM?.date}
                />
                <RendorOrderDetail
                  title={'Time: '}
                  description={ORDERCONFIRM?.time}
                />
                <RendorOrderDetail
                  title={`${ORDERCONFIRM.fuel.title} (${ORDERCONFIRM.fuel.unit}): `}
                  description={`${ORDERCONFIRM.quantity} ($${ORDERCONFIRM.fuel.price})`}
                />
              </View>
              {/* Chat and Call buttons */}
              <View style={{justifyContent: 'space-around'}}>
                <MyTouchableOpacity
                  style={{
                    backgroundColor: COLORS.darkBlueGrey,
                    padding: SIZES.ten,
                    borderRadius: SIZES.ten,
                  }}
                  onPress={() => {
                    navigation.navigate(SCREENS.Chat);
                  }}>
                  <Icon
                    name={'chatbubble-ellipses-outline'}
                    type={FONTFAMILY.Ionicons}
                    style={{
                      color: COLORS.primary,
                      fontSize: SIZES.body16,
                    }}
                  />
                </MyTouchableOpacity>
                <MyTouchableOpacity
                  style={{
                    backgroundColor: COLORS.primary,
                    padding: SIZES.ten,
                    borderRadius: SIZES.ten,
                  }}
                  onPress={() => {
                    if (ORDERCONFIRM.rider !== null) {
                      let phoneNumber = '';
                      if (Platform.OS === 'android') {
                        phoneNumber = `tel:${ORDERCONFIRM.rider.phone}`;
                      } else {
                        phoneNumber = `telprompt:${ORDERCONFIRM.rider.phone}`;
                      }
                      Linking.openURL(phoneNumber);
                    }
                  }}>
                  <Icon
                    name={'call-outline'}
                    type={FONTFAMILY.Ionicons}
                    style={{
                      color: COLORS.white,
                      fontSize: SIZES.body16,
                    }}
                  />
                </MyTouchableOpacity>
              </View>
            </Row>

            <View
              style={{
                height: 1,
                backgroundColor: COLORS.darkBlueGrey,
                marginVertical: SIZES.ten,
              }}
            />
          </>
        ) : (
          <>
            <View
              style={{
                paddingVertical: SIZES.five * 1.3,
              }}>
              <Text style={[FONTS.lightFont16, {textAlign: 'justify'}]}>
                You will be notified when rider accepts your order.
              </Text>
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.darkBlueGrey,
                  marginVertical: SIZES.ten,
                }}
              />
            </View>
          </>
        )}

        <RendorDateTimeRow
          title="Order Details"
          iconName={collapsed ? 'chevron-up' : 'chevron-down'}
          iconType={FONTFAMILY.Ionicons}
          iconBg={COLORS.darkBlueGrey}
          iconColor={COLORS.primary}
          onPress={toggleCollapsed}
        />

        {/* order detail View Using Collaps and expands Animation  */}
        <Animated.View style={{maxHeight: animationHeight}}>
          <RendorOrderDetail
            title="Fuel: "
            description={ORDERCONFIRM.fuel.title}
          />
          <RendorOrderDetail
            title="Amount: "
            description={`$${ORDERCONFIRM.grand_total}`}
          />
          <RendorOrderDetail
            title="Litre: "
            description={ORDERCONFIRM.quantity}
          />
          <RendorOrderDetail
            title="Status: "
            description={ORDERCONFIRM.rider_status}
          />
        </Animated.View>

        {/* {isRiderArrived !== "true" && ( */}
        <ButtonRadius10
          disabled={ORDERCONFIRM.status === 'arrived'}
          isBrightButton
          label="Cancel Order"
          onPress={() => setModalVisible(true)}
          style={{marginVertical: SIZES.ten}}
        />
        {/* )} */}
      </Card>
    );
  };

  const RendorInvalidCoodinates = () => {
    return (
      <View
        style={{
          paddingVertical: SIZES.fifteen,
          paddingHorizontal: SIZES.fifty,
          position: 'absolute',
          top: SIZES.fifty * 1.2,
          alignSelf: 'center',
          flexDirection: 'row',
          backgroundColor: `${COLORS.white}`,
          borderColor: COLORS.primary,
          borderWidth: 0.5,
          borderRadius: SIZES.five * 1.5,
          shadowColor: COLORS.brownGrey,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          alignItems: 'center',
          elevation: 7,
        }}>
        <ActivityIndicator size={'small'} color={COLORS.primary} />
        <Text
          style={[
            FONTS.mediumFont12,
            {color: COLORS.black, marginLeft: SIZES.twenty},
          ]}>
          We Are Finding The Best Route
        </Text>
      </View>
    );
  };

  const onCenter = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    mapRef.current.animateToRegion({
      ...newCoordinate,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  return (
    <View
      style={[STYLES.container, {flex: 1, paddingHorizontal: SIZES.fifteen}]}>
      <MapView
        zoomEnabled={true}
        maxZoomLevel={20}
        ref={mapRef}
        mapType="standard"
        showsUserLocation={false}
        customMapStyle={MapTheme}
        showsMyLocationButton
        showsCompass={false}
        onPress={e => {
          // //console.log(e.nativeEvent);
        }}
        style={{
          flex: 1,
          ...StyleSheet.absoluteFill,
        }}>
        {showRoute ? (
          <>
            <MapViewDirections
              origin={{
                latitude: Number(ORDERCONFIRM?.latitude),
                longitude: Number(ORDERCONFIRM?.longitude),
              }}
              destination={DriverCoordinates}
              strokeColor={COLORS.primary}
              strokeWidth={5}
              apikey={'AIzaSyAvWnnwxysCLY3IitgCIPBHPU_g4HiBS04'}
              onStart={params => {
                console.log(
                  `Started routing between ------ "${
                    params.origin
                  }" and "${JSON.stringify(params.destination)}"`,
                );
              }}
              resetOnChange={true}
              onReady={result => {
                // console.log("onReady====================>>>>>>>>>>>>>");

                mapRef?.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width / 10,
                    bottom: height / 3.5,
                    left: width / 15,
                    top: height / 35,
                  },
                });

                setShowMarkerLoader(false);
                setInvalidCoorDinates(false);
              }}
              onError={onError => {
                setShowMarkerLoader(false);
                console.log('MapViewDirections', onError);
                if (onError === 'Error on GMAPS route request: ZERO_RESULTS') {
                  setInvalidCoorDinates(true);
                }
              }}
            />

            <DriverTrackingMarker
              onChange={coords => {
                console.log('coords ======= >>>>>>>>>> ', coords);
                setDriverCoordinates({
                  latitude: Number(coords.latitude),
                  longitude: Number(coords.longitude),
                });
                setShowMarkerLoader(false);
              }}
            />

            <MapView.Marker
              pinColor={COLORS.primary}
              key={1}
              coordinate={{
                latitude: Number(ORDERCONFIRM?.latitude),
                longitude: Number(ORDERCONFIRM?.longitude),
              }}></MapView.Marker>

            {/* 
            <MapView.Marker
              key={1}
              coordinate={{
                latitude: Number(ORDERCONFIRM?.latitude),
                longitude: Number(ORDERCONFIRM?.longitude),
              }}></MapView.Marker>

            <MapView.Marker key={2} coordinate={DriverCoordinates}>
              <CircularImage
                uri={CONSTANTS.API_CALLS.IMAGE_URL + ORDERCONFIRM?.rider?.image}
              />
            </MapView.Marker> 
            */}
          </>
        ) : null}
      </MapView>
      <LogoHeader
        isBackArrow
        onPress={() => {
          navigation.replace(SCREENS.DrawerNavigator);
        }}
      />
      <RendorOrderDetailsModal />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Icon
              name={'exclamationcircleo'}
              type={FONTFAMILY.AntDesign}
              style={{
                color: COLORS.turqoise,
                fontSize: SIZES.twenty * 3,
              }}
            />
            <Text style={[FONTS.mediumFont16, {marginVertical: SIZES.ten}]}>
              Are You Sure!
            </Text>
            <Text style={[FONTS.mediumFont10, {color: COLORS.brownGrey}]}>
              You want to cancel this order?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: '80%',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: SIZES.twentyFive,
              }}>
              {/* Cancel Order Button  No  */}

              <TouchableOpacity
                style={[
                  {
                    paddingHorizontal: SIZES.twenty * 2,
                    backgroundColor: COLORS.darkBlueGrey,
                    paddingVertical: SIZES.fifteen,
                    borderRadius: SIZES.ten,
                  },
                ]}
                activeOpacity={0.7}
                onPress={() => setModalVisible(false)}>
                <Text style={[FONTS.mediumFont14, {color: COLORS.primary}]}>
                  No
                </Text>
              </TouchableOpacity>

              {/* Cancel Order Button  Yes */}

              <TouchableOpacity
                style={[
                  {
                    paddingHorizontal: SIZES.twenty * 2,
                    backgroundColor: COLORS.primary,
                    paddingVertical: SIZES.fifteen,
                    borderRadius: SIZES.ten,
                  },
                ]}
                activeOpacity={0.7}
                onPress={() => {
                  concelOrder();
                }}>
                <Text style={[FONTS.mediumFont14, {color: COLORS.white}]}>
                  Yes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* warning Modal End */}

      {/* Loader */}
      <Loader showLoader={showLoader} />
      {showMarkerLoader && <MarkerLoader />}

      {invalidCoorDinates && <RendorInvalidCoodinates />}
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    padding: SIZES.fifteen,
    borderRadius: SIZES.ten,
    marginBottom: SIZES.twenty * 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
