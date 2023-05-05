import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';
import {Icon} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
import {
  COLORS,
  IMAGES,
  SIZES,
  STYLES,
  FONTS,
  SCREENS,
  CONSTANTS,
  FONTFAMILY,
  width,
} from '../../constants';
import MapTheme from './MapTheme';
import MyTouchableOpacity from '../../components/MyTouchableOpacity';
import ButtonRadius10 from '../../components/ButtonRadius10';
import LogoHeader from '../../components/LogoHeader';
import Row from '../../components/Row';
import * as GetFuelAction from '../../Store/Action/GetFuelAction';
import * as GetCardAction from '../../Store/Action/GetCard';
import ErrorView from './../../components/modals/ErrorView';

// Firebase import Here
import {requestUserPermission} from '../../Store/Firebase/NotificationServices';
import {Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import {locationPermission, getCurrentLocation} from '../../helper';

export default function Home({navigation}) {
  const dispatcher = useDispatch();
  const mapRef = useRef();

  const USERPROFILE = useSelector(state => state.Profile.UserProfile);
  const GETFUELS = useSelector(state => state.GetFuels.Data);
  const AUTHTOKEN = useSelector(state => state.Auth.AccessToken);
  const APPSTATE = useSelector(state => state.AppStateReducer.RideStatus);

  const [selectedTab, setSelectedTab] = useState(null);
  const [showLcoationPicker, setshowLcoationPicker] = useState(false);
  const [placeHolder, setplaceHolder] = useState('Search Here');
  const [selectedFuel, setSelectedFuel] = useState({});
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [OderCoordinats, setOderCoordinats] = useState(null);
  const [location, setlocation] = useState({
    longitude: 24.90492,
    longitude: 67.07615,
  });
  const [initRegion, setInitRegion] = useState({
    latitude: 24.831143724694066,
    longitude: 67.18298373928963,
    latitudeDelta: 0.2,
    longitudeDelta: 0.1,
  });

  useEffect(() => {
    getLiveLocation();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      RequestPermissionsForPushNotifications();
    }, 5000);

    getFuels();
    getCard();
  }, []);

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const Location = await getCurrentLocation();

      mapRef?.current.animateCamera({
        center: {
          latitude: Location.latitude,
          longitude: Location.longitude,
        },
        duration: 500,
      });

      setInitRegion({
        latitude: Number(Location.latitude),
        longitude: Number(Location.longitude),
        latitudeDelta: 0.2,
        longitudeDelta: 0.1,
      });
    }
  };

  const getFuels = async () => {
    await dispatcher(
      GetFuelAction.GetFuels(response => {
        if (response.success === 1) {
          setSelectedFuel(response.data[0]);
        }
      }),
    );
  };

  const getCard = async () => {
    await dispatcher(
      GetCardAction.getCreditCards(response => {
        if (response.error) {
          setErrorMsg(JSON.stringify(response.error));
        }
      }),
    );
  };

  const RequestPermissionsForPushNotifications = async () => {
    requestUserPermission(AUTHTOKEN, USERPROFILE?.id);
  };

  const OrderNow = () => {
    if (GETFUELS.length === 1) {
      navigation.navigate(SCREENS.SelectQuantity, {
        OrderType: CONSTANTS.DESINATIONS.ORDER_NOW,
        SelectedItem: selectedFuel,
        Coordinates: OderCoordinats,
      });
    } else if (selectedTab === null) {
      setErrorMsg('Please Select Fuel Type');
    } else {
      navigation.navigate(SCREENS.SelectQuantity, {
        OrderType: CONSTANTS.DESINATIONS.ORDER_NOW,
        SelectedItem: selectedFuel,
        Coordinates: OderCoordinats,
      });
    }
  };

  const scheduale = () => {
    if (GETFUELS.length === 1) {
      navigation.navigate(SCREENS.SelectQuantity, {
        OrderType: CONSTANTS.DESINATIONS.SCHEDULE,
        SelectedItem: selectedFuel,
        Coordinates: OderCoordinats,
      });
    } else if (selectedTab === null) {
      setErrorMsg('Please Select Fuel Type');
    } else {
      navigation.navigate(SCREENS.SelectQuantity, {
        OrderType: CONSTANTS.DESINATIONS.SCHEDULE,
        SelectedItem: selectedFuel,
        Coordinates: OderCoordinats,
      });
    }
  };

  const renderRow = (data, index) => {
    return (
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: COLORS.transparent,
        }}>
        {/* <Icon
          type={FONTFAMILY.Ionicons}
          name={'ios-pin-outline'}
          style={{color: COLORS.primary, fontSize: 28, fontWeigth: 'bold'}}
        /> */}
        <View style={{alignItems: 'baseline', marginLeft: SIZES.ten}}>
          <Text style={[FONTS.mediumFont12, {color: COLORS.white}]}>
            {data.description}
          </Text>
          <Text style={[FONTS.mediumFont10, {color: COLORS.white}]}>
            {data['structured_formatting']['secondary_text']}
          </Text>
        </View>
      </View>
    );
  };

  const GooglePlacesInput = props => {
    return (
      <GooglePlacesAutocomplete
        placeholder={placeHolder}
        onPress={(data, details = null) => {
          setOderCoordinats({
            placeName: details.formatted_address,
            latitude: details.geometry?.location.lat,
            longitude: details.geometry?.location.lng,
          });
          setlocation({
            latitude: details.geometry?.location.lat,
            longitude: details.geometry?.location.lng,
          });
          setplaceHolder(data.description);
          setTimeout(() => {
            setshowLcoationPicker(false);
          }, 350);
        }}
        query={{
          key: 'AIzaSyC-MPat5umkTuxfvfqe1FN1ZMSafBpPcpM',
          language: 'en',
        }}
        currentLocation={true}
        renderRow={renderRow}
        GooglePlacesSearchQuery={{rankby: 'distance'}}
        GooglePlacesDetailsQuery={{fields: ['formatted_address', 'geometry']}}
        renderDescription={row => row.description}
        currentLocationLabel="Current location"
        enablePoweredByContainer={false}
        keepResultsAfterBlur={true}
        nearbyPlacesAPI="GooglePlacesSearch"
        fetchDetails
        renderLeftButton={() => (
          <View
            style={{
              height: SIZES.ten,
              width: SIZES.ten,
              borderRadius: SIZES.ten,
              backgroundColor: COLORS.primary,
              alignSelf: 'center',
            }}
          />
        )}
        renderRightButton={() => (
          <Icon
            type={FONTFAMILY.Ionicons}
            name={'search'}
            style={{color: COLORS.primary, fontSize: SIZES.twenty + 5}}
          />
        )}
        styles={{
          container: {
            // backgroundColor: 'red',
            alignItems: 'center',
          },
          row: {
            backgroundColor: COLORS.transparent,
          },
          textInputContainer: {
            backgroundColor: 'white',
            alignItems: 'center',
            paddingHorizontal: SIZES.fifteen,
            borderColor: COLORS.darkBlueGrey,
            borderWidth: 0.5,
            borderRadius: SIZES.ten,
          },
          textInput: [
            {
              color: COLORS.primary,
              flex: 1,
              fontFamily: FONTFAMILY.Medium,
              fontSize: SIZES.h16,
              textTransform: 'capitalize',
              paddingTop: SIZES.fifteen - 5,
            },
          ],
          listView: {
            marginVertical: SIZES.twenty,
            backgroundColor: COLORS.transparent,
          },
          separator: {
            borderColor: COLORS.mushroom,
            borderBottomWidth: 0.5,
            backgroundColor: COLORS.transparent,
          },
          description: {
            backgroundColor: COLORS.transparent,
          },
        }}
      />
    );
  };

  const RendorFuelType = ({selectedTab}) => {
    return (
      <Row
        style={{
          marginHorizontal: SIZES.twentyFive * 1.5,
          justifyContent: 'space-between',
          marginTop: SIZES.twenty,
          alignItems: 'center',
          alignSelf: 'center',
          zIndex: 1,
        }}>
        {GETFUELS?.map((item, index) => {
          return (
            <MyTouchableOpacity
              key={index}
              activeOpacity={0.95}
              style={styles.tabView}
              onPress={() => {
                setSelectedTab(item.id);
                setSelectedFuel(item);
              }}>
              <Image
                source={
                  GETFUELS.length === 1
                    ? IMAGES.ButtonHighlight
                    : selectedTab === item.id
                    ? IMAGES.ButtonHighlight
                    : IMAGES.ButtonUnhighlight
                }
                style={styles.image}
                resizeMode={'contain'}
              />
              <Text
                style={[
                  FONTS.mediumFont12,
                  {
                    color:
                      GETFUELS.length === 1
                        ? COLORS.white
                        : selectedTab === item.id
                        ? COLORS.white
                        : COLORS.primary,
                    marginTop: -SIZES.ten * 1.5,
                  },
                ]}>
                {item.title}
              </Text>
            </MyTouchableOpacity>
          );
        })}
      </Row>
    );
  };

  return (
    <View style={[STYLES.container, {}]}>
      <MapView
        ref={mapRef}
        zoomEnabled={true}
        maxZoomLevel={20}
        minZoomLevel={2}
        zoomControlEnabled={true}
        // showsCompass={false}
        mapType="standard"
        showsUserLocation={true}
        initialRegion={initRegion}
        // onMapReady={() => onMapLoad(initRegion.latitude, initRegion.longitude)}
        customMapStyle={MapTheme}
        showsMyLocationButton={false}
        onPress={e => {
          // //console.log(e.nativeEvent);
        }}
        style={{
          ...StyleSheet.absoluteFill,
        }}></MapView>

      <View style={{paddingHorizontal: SIZES.fifteen}}>
        <LogoHeader
          onMenuePress={() => {
            navigation.toggleDrawer();
          }}
        />
        <RendorFuelType selectedTab={selectedTab} />
      </View>

      {/* address order now and schedule Button View start */}
      <View
        style={{
          paddingHorizontal: SIZES.fifteen,
          paddingBottom: SIZES.twentyFive,
          paddingTop: SIZES.ten,
          position: 'absolute',
          bottom: 0,
          backgroundColor: COLORS.secondary,
        }}>
        {/* <TextInput placeholder="Address" style={{backgroundColor: 'pink'}} /> */}
        <MyTouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          onPress={() => {
            setshowLcoationPicker(true);
          }}>
          <Text
            style={[
              FONTS.mediumFont16,
              {color: COLORS.primary, maxWidth: width * 0.85},
            ]}>
            Address:{' '}
            <Text
              style={[FONTS.lightFont12, {color: COLORS.black}]}
              numberOfLines={2}>
              {OderCoordinats === null
                ? 'Enter drop-off location here'
                : OderCoordinats?.placeName}
            </Text>
          </Text>
          <Icon
            type={FONTFAMILY.Ionicons}
            name={'search'}
            style={{
              color: COLORS.black,
              fontSize: SIZES.twenty * 1.35,
            }}
          />
        </MyTouchableOpacity>

        <ButtonRadius10
          label={'Order Now'}
          style={{marginTop: SIZES.ten}}
          onPress={() => {
            if (OderCoordinats === null) {
              setErrorMsg('Please enter location first');
              return;
            }
            OrderNow();
          }}
        />
        <ButtonRadius10
          label={'Schedule'}
          style={{marginTop: SIZES.twenty}}
          onPress={() => {
            if (OderCoordinats === null) {
              setErrorMsg('Please enter location first');
              return;
            }

            scheduale();
          }}
        />
      </View>
      {/* address order now and schedule Button View  end*/}

      {/* Error */}
      <ErrorView
        visibility={errorVisibility}
        setVisibility={setErrorVisibility}
        setErrorMsg={setErrorMsg}
        msg={errorMsg}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={showLcoationPicker}
        onRequestClose={() => {
          setshowLcoationPicker(true);
        }}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            alignItems: 'center',
            flex: 1,
            paddingHorizontal: SIZES.ten,
            paddingTop:
              Platform.OS === 'android'
                ? SIZES.twenty
                : getStatusBarHeight(true),
            backgroundColor: 'rgba(0,0,0,0.6)',
            // backgroundColor: COLORS.secondary,
          }}
          onPress={() => setshowLcoationPicker(false)}>
          {GooglePlacesInput()}
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    height: SIZES.fifty * 0.75,
    width: SIZES.fifty * 0.75,
    borderRadius: SIZES.ten,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    marginHorizontal: 0,
  },
  button2: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.twentyFive + SIZES.ten,
    paddingVertical: SIZES.fifteen,
    flex: 1,
    borderRadius: SIZES.ten,
  },
  bottomSheetBody: {
    backgroundColor: COLORS.white,
    padding: SIZES.fifteen,
    alignSelf: 'center',
    borderRadius: SIZES.ten,
    marginBottom: SIZES.twenty,
    width: '100%',
    position: 'absolute',
    bottom: SIZES.ten,
  },
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
});

// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View, Dimensions} from 'react-native';
// import MapView from 'react-native-maps';

// const mode = 'driving'; // 'walking';
// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// const SPACE = 0.01;
// const DEFAULT_PADDING = {top: 100, right: 100, bottom: 100, left: 100};
// const {width, height} = Dimensions.get('window');

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.mapRef = null;
//   }

//   state = {
//     MARKERS: null,
//     origin: '22.9962,72.5996',
//     destination: '23.0134,72.5624',
//     destMarker: '',
//     startMarker: '',
//     imageloaded: false,
//   };

//   componentWillMount() {
//     this.getRoutePoints(this.state.origin, this.state.destination);
//   }

//   /**
//    * This method will give you JSON response with all location points between 2 location
//    */
//   getRoutePoints(origin, destination) {
//     console.log('-----getRoutePoints-----');
//     const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=AIzaSyAvWnnwxysCLY3IitgCIPBHPU_g4HiBS04&mode=${mode}`;
//     console.log('URL -- >>' + url);

//     fetch(url)
//       .then(response => response.json())
//       .then(responseJson => {
//         if (responseJson.routes.length) {
//           var cortemp = this.decode(
//             responseJson.routes[0].overview_polyline.points,
//           ); // definition below;
//           var length = cortemp.length - 1;

//           var tempMARKERS = [];
//           tempMARKERS.push(cortemp[0]); //start origin
//           tempMARKERS.push(cortemp[length]); //only destination adding

//           console.log('tempMARKERS : ' + JSON.stringify(tempMARKERS));

//           this.setState({
//             coords: cortemp,
//             MARKERS: tempMARKERS,
//             destMarker: cortemp[length],
//             startMarker: cortemp[0],
//           });
//         }
//       })
//       .catch(e => {
//         console.warn(e);
//       });
//   }

//   /**
//    * This method will transforms something like this geocFltrhVvDsEtA}ApSsVrDaEvAcBSYOS_@... to an array of coordinates
//    */

//   decode(t, e) {
//     for (
//       var n,
//         o,
//         u = 0,
//         l = 0,
//         r = 0,
//         d = [],
//         h = 0,
//         i = 0,
//         a = null,
//         c = Math.pow(10, e || 5);
//       u < t.length;

//     ) {
//       (a = null), (h = 0), (i = 0);
//       do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
//       while (a >= 32);
//       (n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0);
//       do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
//       while (a >= 32);
//       (o = 1 & i ? ~(i >> 1) : i >> 1),
//         (l += n),
//         (r += o),
//         d.push([l / c, r / c]);
//     }
//     return (d = d.map(function (t) {
//       return {
//         latitude: t[0],
//         longitude: t[1],
//       };
//     }));
//   }

//   /**
//    * After loading custome image of marker it will render map and refresh map will image
//    */
//   forceUpdateMap() {
//     console.log('-----forceUpdateMap------');
//     this.setState({imageloaded: true});
//   }

//   /**
//    * This method will fit all markers point into single screen
//    */
//   fitAllMarkers() {
//     const temMark = this.state.MARKERS;
//     console.log('------fitAllMarkers------');
//     this.setState({loading: false});
//     if (this.mapRef == null) {
//       console.log('map is null');
//     } else {
//       //option:1
//       console.log('temMark : ' + JSON.stringify(temMark));
//       this.mapRef.fitToCoordinates(temMark, {
//         edgePadding: DEFAULT_PADDING,
//         animated: false,
//       });
//     }
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         {this.state.coords != null ? (
//           <MapView
//             ref={ref => {
//               this.mapRef = ref;
//             }}
//             style={styles.map}
//             onLayout={() => this.fitAllMarkers()}>
//             {/*used to drae line on rout point of locations*/}
//             <MapView.Polyline coordinates={this.state.coords} strokeWidth={2} />

//             {/*start point marker*/}
//             <MapView.Marker key={1} coordinate={this.state.startMarker} />

//             {/*end point marker*/}
//             <MapView.Marker
//               key={2}
//               coordinate={this.state.destMarker}></MapView.Marker>
//           </MapView>
//         ) : null}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });
